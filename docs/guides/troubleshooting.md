# Troubleshooting

## LWT Configuration

The broker publishes this payload automatically if the node disconnects
unexpectedly, without the node having to send it.

```javascript
this.client = mqtt.connect(import.meta.env.VITE_MQTT_BROKER, {
  clientId: 'a001',
  will: {
    topic: 'acme/ind/planta-norte/linea-1/node/a001/connection',
    payload: JSON.stringify({
      metadata: { node_id: 'a001', timestamp: '2026-03-29T21:51:01Z' },
      connection: { state: 'offline', reason: 'connection_lost' },
    }),
    qos: 1,
    retain: true,
  },
});
```

## mosquitto_pub Examples

**Birth (with LWT configured):**

```bash
mosquitto_pub -h localhost -p 1883 \
  -u "a001" -P "jwt_token" \
  -t "acme/ind/norte/l1/env-node/a001/state/birth" \
  -m '{"ts":1711749061,"ver":"1.3.0","st":"online","loc":"L3-WELD-01"}' \
  -r \
  -q 1 \
  --will-topic "acme/ind/norte/l1/env-node/a001/state/death" \
  --will-payload '{"st":"offline","res":"lost_conn"}' \
  --will-qos 1 \
  --will-retain
```

```bash
mosquitto_pub.exe -h localhost -p 1883 -u "a001" -P "jwt_token" -q 1 -t "acme/ind/norte/l1/env-node/a001/state/birth" -m '
{
    "nsc": 201,
    "ts": 1711749061,
    "seq": 1,
    "v": "1.3.0",
    "status": "online",
    "reason": "boot",
    "loc": "L3-WELD-01"
}
'
```

**Death (graceful shutdown):**

```bash
mosquitto_pub -h localhost -p 1883 \
  -u "a001" -P "jwt_token" \
  -t "acme/ind/norte/l1/env-node/a001/state/death" \
  -m '{"ts":1711755000,"st":"offline","res":"shutdown"}' \
  -q 1 -r
```

```bash
mosquitto_pub.exe -h localhost -p 1883 -u "a001" -P "jwt_token" -q 1 -t "acme/ind/norte/l1/env-node/a001/data/sensor/all" -m '
{
    "nsc": 401,
    "ts": 1711749061,
    "seq": 1,
    "status": "offline",
    "reason": "shutdown"
}
'
```bash

**Sensor data:**

```bash
mosquitto_pub.exe -h localhost -p 1883 -u "a001" -P "jwt_token" -q 1 -t "acme/ind/norte/l1/env-node/a001/data/sensor/all" -m '
{
    "nsc": 307,
    "ts": 1711749061,
    "seq": 1,
    "srds": {
        "hum": 25.4,
        "temp": 56.2
    }
}
'
```bash
