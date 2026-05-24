# Messages

message birth

acme/ind/norte/l1/env-node/a001/state/birth

nsc: node state code
nor: node operation result
ts: timestamp
v: version
loc: location

{
  "nsc": 201,
  "nor": null,
  "ts": 1711749061,
  "v": "1.3.0",
  "status": "online",
  "reason": "boot",
  "loc": "L3-WELD-01"
}

message death

acme/ind/norte/l1/env-node/a001/state/death

{
    "ts": 1711755000,
    "st": "offline",
    "res": "shutdown"
}

message LW

acme/ind/norte/l1/env-node/a001/state/death

{
    "st":"offline",
    "res":"lost_conn"
}

message data sensor all

acme/ind/norte/l1/env-node/a001/data/sensor/all
acme/ind/norte/l1/env-node/a001/data/sensor/temp
acme/ind/norte/l1/env-node/a001/data/sensor/humidity
acme/ind/norte/l1/env-node/a001/data/sensor/co2

{
    "ts": 1711749061,
    "seq": 1,
    "val": {
        "temp": 56.2,
        "hum": 25.4
    }
}
