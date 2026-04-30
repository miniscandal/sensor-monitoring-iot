# Environmental Node

## Ciclo de vida mínimo de un nodo

### 1. Conexión inicial (`/connection`)

```json
{
  "node_state": 102,
  "op_result": null,
  "metadata": {
    "node_id": "a001",
    "timestamp": "2026-04-20T04:20:00Z",
    "firmware_version": "1.3.0",
    "location": {
      "lat": 20.5244,
      "lng": -99.8956,
      "zone": "assembly",
      "line": "3",
      "station": "welding robot"
    }
  },
  "connection": {
    "state": "online",
    "reason": "boot"
  }
}

### 2. Basic operation
```json
{
  "node_state": 202,
  "op_result": 251,
  "metadata": {
    "node_id": "a001",
    "timestamp": "2026-04-20T04:21:00Z"
  },
  "data": {
    "sensor_readings": {
      "humidity": 25,
      "temperature": 22
    }
  }
}

### 3. Alert
```json
{
  "node_state": 201,
  "op_result": 302,
  "metadata": {
    "node_id": "a001",
    "timestamp": "2026-04-20T04:22:00Z"
  },
  "alerts": ["low_battery"]
}
