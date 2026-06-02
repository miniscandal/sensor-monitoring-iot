# Troubleshooting

## mosquitto_sub (LWT)

```bash
mosquitto_sub.exe -h localhost -p 1883 -u "a001" -P "jwt_token" -i "a001" `
-t "acme/ind/norte/l1/env-node/a001/command" `
--will-topic "acme/ind/norte/l1/env-node/a001/state/death" `
--will-qos 1 `
--will-retain `
--will-payload '
{
    "nsc": 202,
    "ts": 1711749061,
    "seq": 1,
    "status": "offline",
    "reason": "shutdown",
}
'
```

## mosquitto_pub

```bash
mosquitto_pub.exe -h localhost -p 1883 -u "a001" -P "jwt_token" -i "a001" -q 1 `
-t "acme/ind/norte/l1/env-node/a001/state/birth" `
-m '
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

```bash
mosquitto_pub.exe -h localhost -p 1883 -u "a001" -P "jwt_token" -i "a001" -q 1 `
-t "acme/ind/norte/l1/env-node/a001/state/death" `
-m '
{
    "nsc": 202,
    "ts": 1711749061,
    "seq": 1,
    "status": "offline",
    "reason": "shutdown"
}
'
```

```bash
mosquitto_pub.exe -h localhost -p 1883 -u "a001" -P "jwt_token" -i "a001" -q 1 `
-t "acme/ind/norte/l1/env-node/a001/data/sensor/all" `
-m '
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
```

## sequence messages

```bash
mosquitto_pub.exe -h localhost -p 1883 -u "a001" -P "jwt_token" -i "a001" -q 1 `
-t "acme/ind/norte/l1/env-node/a001/state/birth" `
-m '
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

mosquitto_pub.exe -h localhost -p 1883 -u "a001" -P "jwt_token" -i "a001" -q 1 `
-t "acme/ind/norte/l1/env-node/a001/data/sensor/all" `
-m '
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

mosquitto_pub.exe -h localhost -p 1883 -u "a001" -P "jwt_token" -i "a001" -q 1 `
-t "acme/ind/norte/l1/env-node/a001/state/death" `
-m '
{
    "nsc": 202,
    "ts": 1711749061,
    "seq": 1,
    "status": "offline",
    "reason": "shutdown"
}
'
```

## JavaScript Sample LWT Configuration

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
