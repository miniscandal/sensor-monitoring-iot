# MQTT Payload Structure

Each topic publishes an independent payload with its own frequency and purpose. All payloads share a common `metadata` block.

## Metadata

Present in every message. Contains device identity and context.

| Field               | Type   | Description                             |
|---------------------|--------|-----------------------------------------|
| `device_id`         | string | Unique device identifier                |
| `timestamp`         | string | ISO 8601 with timezone                  |
| `firmware_version`  | string | Semantic version of the device firmware |
| `location.lat`      | number | Latitude                                |
| `location.lng`      | number | Longitude                               |
| `location.zone`     | string | Zone within the facility                |
| `location.line`     | string | Production line                         |
| `location.station`  | string | Station within the line                 |

> `firmware_version` and `location` are only required in `/connection`. Other topics include only `device_id` and `timestamp`.

---

## Topics

### `/connection`

Published when the device connects or disconnects. Describes the connection state of the device itself.

```json
{
    "metadata": {
        "device_id": "a001",
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

> `state: offline` with `reason: connection_lost` is published automatically by the broker via LWT if the device disconnects unexpectedly.

---

### `/data`

Published on every sensor reading.

```json
{
    "metadata": {
        "device_id": "a001",
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
| `data.status_code`                 | number | Result code of the operation — not the device connection state |
| `data.sensor_readings.humidity`    | number | Relative humidity (%)                                          |
| `data.sensor_readings.temperature` | number | Temperature (°C)                                               |

---

### `/diagnostics`

Published periodically, at a lower frequency than `/data`. Describes the health of the device hardware.

```json
{
    "metadata": {
        "device_id": "a001",
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
        "device_id": "a001",
        "timestamp": "2026-03-29T21:51:01Z"
    },
    "alerts": ["overheating", "low_battery"]
}
```

| Value         | Description                                       |
|---------------|---------------------------------------------------|
| `overheating` | Device temperature exceeded safe threshold        |
| `low_battery` | Battery level below minimum operational threshold |

> Alert details such as severity, thresholds, and descriptions are resolved from the database by alert type.

---

## Topic structure

```powershell
{org}/{site}/{area}/{line}/{device}/{id}/{type}

acme/ind/planta-norte/linea-1/hub/a001/connection
acme/ind/planta-norte/linea-1/hub/a001/data
acme/ind/planta-norte/linea-1/hub/a001/diagnostics
acme/ind/planta-norte/linea-1/hub/a001/alerts
```

## Useful wildcard subscriptions

```powershell
# Everything from one device
acme/ind/planta-norte/linea-1/hub/a001/#

# Alerts from all devices on a line
acme/ind/planta-norte/linea-1/hub/+/alerts

# Data from all devices across all lines
acme/ind/planta-norte/+/hub/+/data
```
