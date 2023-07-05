export interface IQueue {
  data: string;
  createdAt: string;
  consumedAt: string | null;
  sequenceNumber: number;
  topic: string;
  isConsumed: boolean;
}

export interface IQueueV0Record {
  sequenceNumber: number;
  latestSequence: number;
}
