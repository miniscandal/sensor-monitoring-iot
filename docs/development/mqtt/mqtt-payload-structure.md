# MQTT Payload Structure

Every payload includes two top-level status fields that describe independent
dimensions of the message:

| Field        | Answers                                           | Ranges                          |
|--------------|---------------------------------------------------|---------------------------------|
| `node_state` | What is the node right now? (persistent state)    | `100–199`, `200–213`, `500–599` |
| `op_result`  | What happened with this operation? (event result) | `204–260`, `300–399`, `400–499` |

This separation allows consumers to evaluate the node's health and the operation
outcome independently, without coupling routing logic to topic-specific body schemas.

> `op_result` is `null` for topics where no operation outcome applies (e.g. `/connection`).

---

## Common fields

Present in every message, at the root level.

| Field        | Type         | Description                                                  |
|--------------|--------------|--------------------------------------------------------------|
| `node_state` | number       | Current persistent state of the node                         |
| `op_result`  | number\|null | Outcome of the operation that triggered this message         |
| `metadata`   | object       | Node identity and context — see [Metadata](#metadata) below  |

---

## Metadata

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
of the node itself. There is no operation outcome to report, so `op_result` is `null`.

```json
{
    "node_state": 101,
    "op_result": null,
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

#### node_state values for /connection

| `node_state`                    | `connection.state` | `connection.reason`                                    |
|---------------------------------|--------------------|--------------------------------------------------------|
| `NODE_STATE_CONNECTED (101)`    | `online`           | `boot` `restart` `recovery`                            |
| `NODE_STATE_DISCONNECTED (102)` | `offline`          | `shutdown` `connection_lost` `power_off`               |
| `NODE_STATE_HEARTBEAT (103)`    | `degraded`         | `maintenance` `low_battery` `high_temp` `weak_signal`  |

> `state: offline` with `reason: connection_lost` is published automatically by the
> broker via LWT if the node disconnects unexpectedly.

---

### `/data`

Published on every sensor reading. Reports the outcome of the acquisition cycle.

- `node_state` reflects whether the node is operational at the time of the reading.
- `op_result` reflects whether the acquisition and transmission succeeded or failed.

```json
{
    "node_state": 202,
    "op_result": 251,
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

**Failure example** — node is still active, but the sensor timed out:

```json
{
    "node_state": 201,
    "op_result": 405,
    "metadata": {
        "node_id": "a001",
        "timestamp": "2026-03-29T21:51:01Z"
    },
    "data": {}
}
```

#### node_state values for /data

| `node_state`                 | Meaning                                    |
|------------------------------|--------------------------------------------|
| `NODE_STATE_ACTIVATED (201)` | Node fully operational                     |
| `NODE_STATE_IDLE (202)`      | Operational, not currently in a work cycle |
| `NODE_STATE_UPDATING (212)`  | Applying a firmware/config update          |

#### op_result values for /data

| `op_result`                                | Meaning                                           |
|--------------------------------------------|---------------------------------------------------|
| `OP_RESULT_SENSOR_MEASURING (250)`         | Acquisition in progress (intermediate state)      |
| `OP_RESULT_SENSOR_DATA_SENT_OK (251)`      | Reading acquired and transmitted successfully     |
| `OP_RESULT_STREAMING_SENSOR_DATA (252)`    | Continuous streaming cycle active                 |
| `OP_RESULT_SENSOR_FAILURE (403)`           | One or more sensors failed                        |
| `OP_RESULT_MEASUREMENT_ERROR (404)`        | Acquisition or processing failed                  |
| `OP_RESULT_SENSOR_TIMEOUT (405)`           | Sensor did not respond within the time limit      |
| `OP_RESULT_SENSOR_OUT_OF_RANGE (406)`      | Reading outside the valid physical range          |
| `OP_RESULT_SENSOR_DATA_CORRUPTED (407)`    | Sensor data is corrupted or illegible             |
| `OP_RESULT_SENSOR_DATA_TX_FAILED (409)`    | Transmission failure                              |

> When `op_result` is in the `400–499` range, `data.sensor_readings` may be absent
> or contain partial values. Always check `op_result` before using sensor values.

#### data fields

| Field                              | Type   | Description               |
|------------------------------------|--------|---------------------------|
| `data.sensor_readings.humidity`    | number | Relative humidity (%)     |
| `data.sensor_readings.temperature` | number | Temperature (°C)          |

---

### `/diagnostics`

Published periodically at a lower frequency than `/data`. Describes the hardware
health of the node.

- `node_state` reflects the current operational state.
- `op_result` is set when a warning condition is present; `null` when the node
  is fully healthy.

```json
{
    "node_state": 201,
    "op_result": null,
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

**Warning example** — node is active, but battery is low:

```json
{
    "node_state": 201,
    "op_result": 302,
    ...
}
```

#### op_result values for /diagnostics

| `op_result`                             | Meaning                                |
|-----------------------------------------|----------------------------------------|
| `null`                                  | No warning condition present           |
| `OP_RESULT_BATTERY_LOW (302)`           | Battery below the warning threshold    |
| `OP_RESULT_MAINTENANCE_REQUIRED (303)`  | Manual inspection required             |

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

- `node_state` reflects the current operational state of the node.
- `op_result` uses the highest-severity code among the changed alerts.

```json
{
    "node_state": 201,
    "op_result": 302,
    "metadata": {
        "node_id": "a001",
        "timestamp": "2026-03-29T21:51:01Z"
    },
    "alerts": ["overheating", "low_battery"]
}
```

#### op_result values for /alerts

| `op_result`                            | Meaning                                          |
|----------------------------------------|--------------------------------------------------|
| `OP_RESULT_ALERT (301)`                | General non-critical alert                       |
| `OP_RESULT_BATTERY_LOW (302)`          | Battery below the minimum operational threshold  |
| `OP_RESULT_MAINTENANCE_REQUIRED (303)` | Manual inspection required                       |
| `OP_RESULT_ERROR (401)`                | Unclassified operational failure                 |
| `OP_RESULT_URGENT (402)`               | Critical condition requiring immediate action    |
| `OP_RESULT_POWER_FAILURE (411)`        | Power interruption or unexpected reboot          |
| `OP_RESULT_MEMORY_OVERFLOW (412)`      | Internal memory overflow or exhaustion           |

> When multiple alerts change simultaneously, set `op_result` to the
> highest-severity code among them.

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
