# MQTT Messages

## Birth Message

### On startup or reconnect

**Topic:** `acme/ind/norte/l1/env-node/a001/state/birth`

```json
{
    "nsc": 201,
    "ts": 1711749061,
    "seq": 1,
    "v": "1.3.0",
    "status": "online",
    "reason": "boot",
    "loc": "L3-WELD-01"
}
```

## Death Message

### On voluntary shutdown

**Topic:** `acme/ind/norte/l1/env-node/a001/state/death`

```json
{
    "ts": 1711755000,
    "seq": 1,
    "status": "offline",
    "reason": "shutdown"
}
```

## LWT (Last Will and Testament)

### On unexpected disconnection

**Topic:** `acme/ind/norte/l1/env-node/a001/state/death`  

Published automatically by the broker on unexpected disconnect.

```json
{
    "status": "offline",
    "reason": "lost_conn"
}
```

## Sensors Readings Message

### Periodically

**Topics:**

- `acme/ind/norte/l1/env-node/a001/data/sensor/all`
- `acme/ind/norte/l1/env-node/a001/data/sensor/humidity`
- `acme/ind/norte/l1/env-node/a001/data/sensor/temp`
- `acme/ind/norte/l1/env-node/a001/data/sensor/co2`

```json
{
    "nsc": 307,
    "ts": 1711749061,
    "seq": 1,
    "srds": {
        "hum": 25.4,
        "temp": 56.2
    }
}
```
