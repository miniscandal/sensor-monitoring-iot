# MQTT Messages Keys

| Keys        | Description           | JavaScript          |
|-------------|-----------------------|---------------------|
| `nsc`       | node state code       | nodeStateCode       |
| `norc`      | node operation result | nodeOperationResult |
| `ts`        | timestamp (unix)      | timestamp           |
| `seq`       | sequence number       | sequenceNumber      |
| `srds`      | sensors readings      | sensorsReadings     |
| `v`         | firmware version      | firmwareVersion     |
| `status`    | status                | status              |
| `reason`    | reason                | reason              |
| `loc`       | location identifier   | locationIdentifier  |

## Sensors Readings (srds)

| Keys     | Description      | JavaScript  |
|----------|------------------|-------------|
| `hum`    | humidity (%)     | humidity    |
| `temp`   | temperature (°C) | temperature |
