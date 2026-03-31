# Troubleshooting

## Commands PowerShell

### `/connection`

```powershell
# Device comes online after boot
mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/connection" -m '{
    "metadata": {
        "device_id": "a001",
        "timestamp": "2026-03-29T21:51:01Z",
        "firmware_version": "1.3.0",
        "location": { "lat": 20.5244, "lng": -99.8956, "zone": "assembly", "line": "3", "station": "welding robot" }
    },
    "connection": { "state": "online", "reason": "boot" }
}'

# Device goes offline gracefully
mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/connection" -m '{
    "metadata": { "device_id": "a001", "timestamp": "2026-03-29T21:51:01Z" },
    "connection": { "state": "offline", "reason": "shutdown" }
}'

# Device enters degraded state for maintenance
mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/connection" -m '{
    "metadata": { "device_id": "a001", "timestamp": "2026-03-29T21:51:01Z" },
    "connection": { "state": "degraded", "reason": "maintenance" }
}'
```

### `/data`

```powershell
# Minimal data payload
mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/data" -m '{
    "metadata": { "device_id": "a001", "timestamp": "2026-03-29T21:51:01Z" },
    "data": { "status_code": 205 }
}'

# Full sensor reading
mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/data" -m '{
    "metadata": { "device_id": "a001", "timestamp": "2026-03-29T21:51:01Z" },
    "data": { "status_code": 205, "sensor_readings": { "humidity": 25, "temperature": 22 } }
}'

# Publish from file
mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/data" -f payload.json

# Simulate sequential status code updates
mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/data" -m '{ "metadata": { "device_id": "a001", "timestamp": "2026-03-29T21:51:01Z" }, "data": { "status_code": 205 } }'
mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/data" -m '{ "metadata": { "device_id": "a001", "timestamp": "2026-03-29T21:51:01Z" }, "data": { "status_code": 206 } }'
```

### `/diagnostics`

```powershell
# Device hardware health snapshot
mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/diagnostics" -m '{
    "metadata": { "device_id": "a001", "timestamp": "2026-03-29T21:51:01Z" },
    "diagnostics": { "battery_level": 87, "signal_strength": -72, "memory_usage": 43 }
}'
```

### `/alerts`

```powershell
# Single alert
mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/alerts" -m '{
    "metadata": { "device_id": "a001", "timestamp": "2026-03-29T21:51:01Z" },
    "alerts": ["overheating"]
}'

# Multiple alerts
mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/alerts" -m '{
    "metadata": { "device_id": "a001", "timestamp": "2026-03-29T21:51:01Z" },
    "alerts": ["overheating", "low_battery"]
}'
```

### Subscribe

```powershell
# All messages from one device
mosquitto_sub.exe -t "acme/ind/planta-norte/linea-1/hub/a001/#"

# Alerts from all devices on a line
mosquitto_sub.exe -t "acme/ind/planta-norte/linea-1/hub/+/alerts"

# Data from all devices across all lines
mosquitto_sub.exe -t "acme/ind/planta-norte/+/hub/+/data"
```

---

## LWT Example

```javascript
this.client = mqtt.connect(import.meta.env.VITE_MQTT_BROKER, {
    clientId: 'a001',
    will: {
        topic: 'acme/ind/planta-norte/linea-1/hub/a001/connection',
        payload: JSON.stringify({
            "metadata": { "device_id": "a001", "timestamp": "2026-03-29T21:51:01Z" },
            "connection": { "state": "offline", "reason": "connection_lost" }
        }),
        qos: 1,
        retain: true,
    },
});
```

> The broker publishes this payload automatically if the device disconnects unexpectedly, without the device having to send it.

---

## Scripts

```powershell
./tests/iot-device/ps1/emulate-iot-devices.ps1 -deviceId a001 -status_code 205
```

```bash
bash ./tests/iot-device/bash/simulate-iot-devices-connected-v1.sh
```
