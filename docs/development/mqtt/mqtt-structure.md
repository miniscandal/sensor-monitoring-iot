# MQTT Payload Structure

Every payload includes a top-level `status_code` that describes the primary result
or operational state of the message. This field is evaluated first, before parsing
the topic-specific body, and allows consumers to route, filter, or discard messages
without deserializing their full content.

Topic-specific bodies carry only the domain data for that message type; they do not
repeat state information already expressed by `status_code`.

---

## Common fields

Present in every message, at the root level.

| Field         | Type   | Description                                                  |
|---------------|--------|--------------------------------------------------------------|
| `status_code` | number | Primary result or operational state of this message          |
| `metadata`    | object | Node identity and context — see [Metadata](#metadata) below  |

### status_code ranges by topic

| Topic          | Expected ranges         | Notes                                    |
|----------------|-------------------------|------------------------------------------|
| `/connection`  | `100–199`               | Connectivity state                       |
| `/data`        | `200–299`, `400–499`    | Operation result or sensor failure       |
| `/diagnostics` | `200–299`, `300–399`    | Health state or non-critical warning     |
| `/alerts`      | `300–399`, `400–499`    | Alert condition or critical failure      |

> Codes are defined in `nodeStatusCodes.js`.

---

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

> `firmware_version` and `location` are only required in `/connection`.
> All other topics include only `node_id` and `timestamp`.

---

## Topics

---

### `/connection`

Published when the node connects or disconnects. Describes the connection state
of the node itself.

**status_code**: one of `NODE_STATUS_CONNECTED (101)`, `NODE_STATUS_DISCONNECTED (102)`,
or `NODE_STATUS_HEARTBEAT (103)`.

```json
{
    "status_code": 101,
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

#### status_code mapping

| `status_code`                    | `connection.state` | `connection.reason`                                    |
|----------------------------------|--------------------|--------------------------------------------------------|
| `NODE_STATUS_CONNECTED (101)`    | `online`           | `boot` `restart` `recovery`                            |
| `NODE_STATUS_DISCONNECTED (102)` | `offline`          | `shutdown` `connection_lost` `power_off`               |
| `NODE_STATUS_HEARTBEAT (103)`    | `degraded`         | `maintenance` `low_battery` `high_temp` `weak_signal`  |

> `state: offline` with `reason: connection_lost` is published automatically by the
> broker via LWT if the node disconnects unexpectedly.

---

### `/data`

Published on every sensor reading. Reports the outcome of the acquisition cycle.

**status_code**: `200–299` on success; `400–499` if the cycle failed at any stage.

```json
{
    "status_code": 251,
    "metadata": {
        "node_id": "a001",
        "timestamp": "2026-03-29T21:51:01Z"
    },
    "data": {
        "sensor_readings": {
            "humidity": 25,
            "temperature": 22
        }
    }
}
```

#### status_code values for /data

| `status_code`                             | Meaning                                              |
|-------------------------------------------|------------------------------------------------------|
| `NODE_STATUS_SENSOR_MEASURING (250)`      | Acquisition in progress (intermediate state)         |
| `NODE_STATUS_SENSOR_DATA_SENT_OK (251)`   | Reading acquired and transmitted successfully        |
| `NODE_STATUS_STREAMING_SENSOR_DATA (252)` | Continuous streaming cycle active                    |
| `NODE_STATUS_SENSOR_FAILURE (403)`        | One or more sensors failed                           |
| `NODE_STATUS_MEASUREMENT_ERROR (404)`     | Acquisition or processing failed                     |
| `NODE_STATUS_SENSOR_TIMEOUT (405)`        | Sensor did not respond within the time limit         |
| `NODE_STATUS_SENSOR_OUT_OF_RANGE (406)`   | Reading outside the valid physical range             |
| `NODE_STATUS_SENSOR_DATA_CORRUPTED (407)` | Sensor data is corrupted or illegible                |
| `NODE_STATUS_SENSOR_DATA_TX_FAILED (409)` | Transmission failure                                 |

> When `status_code` is in the `400–499` range, `data.sensor_readings` may be
> absent or contain partial values. Consumers must check `status_code` before
> using sensor values.

#### data fields

| Field                              | Type   | Description                       |
|------------------------------------|--------|-----------------------------------|
| `data.sensor_readings.humidity`    | number | Relative humidity (%)             |
| `data.sensor_readings.temperature` | number | Temperature (°C)                  |

---

### `/diagnostics`

Published periodically, at a lower frequency than `/data`. Describes the health
of the node hardware.

**status_code**: `200–299` when the node is healthy; `300–399` when a non-critical
condition is present.

```json
{
    "status_code": 202,
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

#### status_code values for /diagnostics

| `status_code`                            | Meaning                                         |
|------------------------------------------|-------------------------------------------------|
| `NODE_STATUS_ACTIVATED (201)`            | Node is fully operational                       |
| `NODE_STATUS_IDLE (202)`                 | Operational but not currently measuring         |
| `NODE_STATUS_UPDATING (212)`             | Applying a firmware or configuration update     |
| `NODE_STATUS_MAINTENANCE (213)`          | Within a scheduled maintenance window           |
| `NODE_STATUS_BATTERY_LOW (302)`          | Battery below the warning threshold             |
| `NODE_STATUS_MAINTENANCE_REQUIRED (303)` | Manual inspection required                      |

#### diagnostics fields

| Field                         | Type   | Description                                 |
|-------------------------------|--------|---------------------------------------------|
| `diagnostics.battery_level`   | number | Battery charge (%)                          |
| `diagnostics.signal_strength` | number | RSSI in dBm — more negative = weaker signal |
| `diagnostics.memory_usage`    | number | Memory usage (%)                            |

---

### `/alerts`

Published only when an alert condition changes. Do not publish if the state has
not changed. Only include the alerts that changed — not the full alert state.

**status_code**: `300–399` for non-critical alerts; `400–499` for critical failures
requiring immediate action.

```json
{
    "status_code": 302,
    "metadata": {
        "node_id": "a001",
        "timestamp": "2026-03-29T21:51:01Z"
    },
    "alerts": ["overheating", "low_battery"]
}
```

#### status_code values for /alerts

| `status_code`                            | Meaning                                          |
|------------------------------------------|--------------------------------------------------|
| `NODE_STATUS_ALERT (301)`                | General non-critical alert condition             |
| `NODE_STATUS_BATTERY_LOW (302)`          | Battery below the minimum operational threshold  |
| `NODE_STATUS_MAINTENANCE_REQUIRED (303)` | Manual inspection required                       |
| `NODE_STATUS_ERROR (401)`                | Unclassified operational failure                 |
| `NODE_STATUS_URGENT (402)`               | Critical condition requiring immediate action    |
| `NODE_STATUS_POWER_FAILURE (411)`        | Power interruption or unexpected reboot          |
| `NODE_STATUS_MEMORY_OVERFLOW (412)`      | Internal memory overflow or exhaustion           |

> When multiple alerts change simultaneously, use the highest-severity `status_code`
> among them. Alert details such as severity, thresholds, and descriptions are
> resolved from the database by alert type.

#### alert values

| Value         | Description                                       |
|---------------|---------------------------------------------------|
| `overheating` | Node temperature exceeded safe threshold          |
| `low_battery` | Battery level below minimum operational threshold |

---

## Topic structure

```PowerShell
{org}/{site}/{area}/{line}/{node}/{id}/{type}

acme/ind/planta-norte/linea-1/node/a001/connection
acme/ind/planta-norte/linea-1/node/a001/data
acme/ind/planta-norte/linea-1/node/a001/diagnostics
acme/ind/planta-norte/linea-1/node/a001/alerts
```

## Useful wildcard subscriptions

```PowerShell
# Everything from one node
acme/ind/planta-norte/linea-1/node/a001/#

# Alerts from all nodes on a line
acme/ind/planta-norte/linea-1/node/+/alerts

# Data from all nodes across all lines
acme/ind/planta-norte/+/node/+/data
```
