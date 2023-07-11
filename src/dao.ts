import { IQueue, IQueueV0Record } from "./types.ts";

// deno-lint-ignore-file no-explicit-any no-explicit-any no-explicit-any
const kv = await Deno.openKv();
console.log("DB Connected ⬆️ ⬇️ 🥂");

export const ingestMockData = async (queueName: string) => {
  await kv.set([queueName, 0], { sequenceNumber: 1, latestSequence: 2 });
  await kv.set([queueName, 1], {
    data: "test",
    timeStamp: new Date().toISOString(),
    sequenceNumber: 1,
    topic: "test",
  });

  await kv.set([queueName, 2], {
    data: "test 2",
    timeStamp: new Date().toISOString(),
    sequenceNumber: 2,
    topic: "test",
  });
};

async function getV0Record(
  queueName: string,
): Promise<IQueueV0Record> {
  const v0Record = await kv.get([queueName, 0]) as Deno.KvEntryMaybe<
    IQueueV0Record
  >;

  if (!v0Record.value?.latestSequence && !v0Record.value?.sequenceNumber) {
    throw new Error("No queue found");
  }
  return v0Record.value;
}

export const addToQueue = async (queueName: string, data: IQueue) => {
  const { sequenceNumber, latestSequence } = await getV0Record(queueName);

  await kv.set(
    [queueName, latestSequence + 1],
    {
      ...data,
      isConsumed: false,
      consumedAt: null,
      createdAt: new Date().toISOString(),
      sequenceNumber: latestSequence + 1,
    } satisfies IQueue,
  );

  await kv.set(
    [queueName, 0],
    {
      sequenceNumber: sequenceNumber === 0
        ? latestSequence + 1
        : sequenceNumber,
      latestSequence: latestSequence + 1,
    } satisfies IQueueV0Record,
  );

  return (await kv.get([queueName, latestSequence + 1])).value as IQueue;
};

export const getLatestFromQueue = async (queueName: string) => {
  const { sequenceNumber, latestSequence } = await getV0Record(queueName);

  if (sequenceNumber === 0) {
    return "no more items in queue";
  }
  const queue = (await kv.get([queueName, sequenceNumber])).value as IQueue;
  const updateQueue = {
    ...queue,
    isConsumed: true,
    consumedAt: new Date().toISOString(),
  };
  await kv.set([queueName, sequenceNumber], {
    updateQueue,
  });
  await kv.set(
    [queueName, 0],
    {
      latestSequence,
      sequenceNumber: latestSequence === sequenceNumber
        ? 0
        : sequenceNumber + 1,
    },
  );
  return updateQueue;
};

export const getQueueItemAt = async (
  queueName: string,
  id: string,
): Promise<IQueue> => {
  return (await kv.get([queueName, parseInt(id)])).value as IQueue;
};
