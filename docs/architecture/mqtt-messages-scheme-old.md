# MQTT Messages Scheme

This document illustrates an older JSON structure used for environmental node messages in the IoT system,  
originally represented before the current payload format was adopted.

```bash
{
    "node_state_code": 201,
    "operation_result": null,
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
    "data": {
        "sensor_readings": {
            "humidity": 32,
            "temperature": 43
        }
    },
    "connection": {
        "state": "online",
        "reason": "boot"
    },
    "diagnostics": {
        "battery_level": 87,
        "signal_strength": -72,
        "memory_usage": 43
    },
    "alerts": ["overheating", "low_battery"]
}
