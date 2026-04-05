# MQTT Payload Structure

Each topic publishes an independent payload with its own frequency and purpose. All payloads share a common `metadata` block.

## Metadata

Present in every message. Contains node identity and context.

| Field               | Type   | Description                             |
|---------------------|--------|-----------------------------------------|
| `node_id`           | string | Unique node identifier                  |
| `timestamp`         | string | ISO 8601 with timezone                  |
| `firmware_version`  | string | Semantic version of the node firmware   |
| `location.lat`      | number | Latitude                                |
| `location.lng`      | number | Longitude                               |
| `location.zone`     | string | Zone within the facility                |
| `location.line`     | string | Production line                         |
| `location.station`  | string | Station within the line                 |

> `firmware_version` and `location` are only required in `/connection`. Other topics include only `node_id` and `timestamp`.

---

## Topics

### `/connection`

Published when the node connects or disconnects. Describes the connection state of the node itself.

```json
{
    "metadata": {
        "node_id": "a001",
        "timestamp": "2026-03-29T21:51:01Z",
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
```

| `connection.state`  | `connection.reason`                                   |
|---------------------|-------------------------------------------------------|
| `online`            | `boot` `restart` `recovery`                           |
| `offline`           | `shutdown` `connection_lost` `power_off`              |
| `degraded`          | `maintenance` `low_battery` `high_temp` `weak_signal` |

> `state: offline` with `reason: connection_lost` is published automatically by the broker via LWT if the node disconnects unexpectedly.

---

### `/data`

Published on every sensor reading.

```json
{
    "metadata": {
        "node_id": "a001",
        "timestamp": "2026-03-29T21:51:01Z"
    },
    "data": {
        "status_code": 205,
        "sensor_readings": {
            "humidity": 25,
            "temperature": 22
        }
    }
}
```

| Field                              | Type   | Description                                                    |
|------------------------------------|--------|----------------------------------------------------------------|
| `data.status_code`                 | number | Result code of the operation — not the node connection state   |
| `data.sensor_readings.humidity`    | number | Relative humidity (%)                                          |
| `data.sensor_readings.temperature` | number | Temperature (°C)                                               |

---

### `/diagnostics`

Published periodically, at a lower frequency than `/data`. Describes the health of the node hardware.

```json
{
    "metadata": {
        "node_id": "a001",
        "timestamp": "2026-03-29T21:51:01Z"
    },
    "diagnostics": {
        "battery_level": 87,
        "signal_strength": -72,
        "memory_usage": 43
    }
}
```

| Field                         | Type   | Description                                 |
|-------------------------------|--------|---------------------------------------------|
| `diagnostics.battery_level`   | number | Battery charge (%)                          |
| `diagnostics.signal_strength` | number | RSSI in dBm — more negative = weaker signal |
| `diagnostics.memory_usage`    | number | Memory usage (%)                            |

---

### `/alerts`

Published only when an alert condition changes. Do not publish if the state has not changed. Only include the alerts that changed — not the full alert state.

```json
{
    "metadata": {
        "node_id": "a001",
        "timestamp": "2026-03-29T21:51:01Z"
    },
    "alerts": ["overheating", "low_battery"]
}
```

| Value         | Description                                       |
|---------------|---------------------------------------------------|
| `overheating` | Node temperature exceeded safe threshold          |
| `low_battery` | Battery level below minimum operational threshold |

> Alert details such as severity, thresholds, and descriptions are resolved from the database by alert type.

---

## Topic structure

```powershell
{org}/{site}/{area}/{line}/{node}/{id}/{type}

acme/ind/planta-norte/linea-1/node/a001/connection
acme/ind/planta-norte/linea-1/node/a001/data
acme/ind/planta-norte/linea-1/node/a001/diagnostics
acme/ind/planta-norte/linea-1/node/a001/alerts
```

## Useful wildcard subscriptions

```powershell
# Everything from one node
acme/ind/planta-norte/linea-1/node/a001/#

# Alerts from all nodes on a line
acme/ind/planta-norte/linea-1/node/+/alerts

# Data from all nodes across all lines
acme/ind/planta-norte/+/node/+/data
```
