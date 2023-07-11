# Introduction

### insert to queue
http POST localhost:8000/api/v1/queue/{queueName} data="setteled down jitu"

### read from queue
http localhost:8000/api/v1/queue/{queueName}/latest

### read based on index
http localhost:8000/api/v1/queue/{queueName}/8
