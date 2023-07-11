# Introduction

### insert to queue
```json
http https://msqueue.deno.dev/api/v1/queue/transaction data="initial testing of Deno KV🔥"

{
    "consumedAt": null,
    "createdAt": "2023-07-11T10:32:19.734Z",
    "data": "initial testing of Deno KV🔥",
    "isConsumed": false,
    "sequenceNumber": 3
}

```

### read latest message from queue
```json
http https://msqueue.deno.dev/api/v1/queue/transaction/latest

{
    "consumedAt": "2023-07-11T10:38:06.920Z",
    "data": "test",
    "isConsumed": true,
    "sequenceNumber": 1,
    "timeStamp": "2023-07-11T10:31:33.033Z",
    "topic": "test"
}

```
### read based on index
```json
http https://msqueue.deno.dev/api/v1/queue/transaction/{index}

{
    "consumedAt": null,
    "createdAt": "2023-07-11T10:32:19.734Z",
    "data": "initial testing of Deno KV🔥",
    "isConsumed": false,
    "sequenceNumber": 3
}

```

### read stats of the queue
```json
http https://msqueue.deno.dev/api/v1/queue/transaction/0

{
    "latestSequence": 3,
    "sequenceNumber": 1
}
```