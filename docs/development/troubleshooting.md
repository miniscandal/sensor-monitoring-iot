# Troubleshooting

## LWT Example

```javascript
this.client = mqtt.connect(import.meta.env.VITE_MQTT_BROKER, {
    clientId: 'a001',
    will: {
        topic: 'acme/ind/planta-norte/linea-1/hub/a001/connection',
        payload: JSON.stringify({
            "metadata": { "node_id": "a001", "timestamp": "2026-03-29T21:51:01Z" },
            "connection": { "state": "offline", "reason": "connection_lost" }
        }),
        qos: 1,
        retain: true,
    },
});
```

> The broker publishes this payload automatically if the node disconnects unexpectedly, without the node having to send it.
