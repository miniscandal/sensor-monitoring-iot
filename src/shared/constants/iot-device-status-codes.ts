// Connection and presentation states (100–199)
const IOT_DEVICE_STATUS_CONNECTED = 101;             // Device is connected to the network
const IOT_DEVICE_STATUS_DISCONNECTED = 102;          // Device is disconnected from the network
const IOT_DEVICE_STATUS_HEARTBEAT = 103;             // Periodic heartbeat signal to confirm connectivity

// Measurement and data transmission states (200–299)
const IOT_DEVICE_STATUS_MEASURING = 201;             // Device is actively measuring sensor data
const IOT_DEVICE_STATUS_SENSOR_DATA_SENT = 202;      // Sensor data has been successfully transmitted

// Alerts and special events (300–399)
const IOT_DEVICE_STATUS_BATTERY_LOW = 301;           // Battery level is below threshold
const IOT_DEVICE_STATUS_SENSOR_FAILURE = 302;        // One or more sensors have malfunctioned
const IOT_DEVICE_STATUS_MAINTENANCE_REQUIRED = 303;  // Device requires maintenance or manual inspection

// Errors (300–399)
const IOT_DEVICE_STATUS_MEASUREMENT_ERROR = 304;         // Failed to complete or transmit measurement
const IOT_DEVICE_STATUS_SENSOR_TIMEOUT = 305;            // Sensor did not respond in time
const IOT_DEVICE_STATUS_SENSOR_OUT_OF_RANGE = 306;       // Sensor reading is outside valid range
const IOT_DEVICE_STATUS_SENSOR_DATA_CORRUPTED = 307;     // Sensor data is corrupted or unreadable
const IOT_DEVICE_STATUS_MQTT_DISCONNECTED = 308;         // Lost connection to MQTT broker
const IOT_DEVICE_STATUS_DATA_TRANSMISSION_FAILED = 309;  // Failed to transmit data to server
const IOT_DEVICE_STATUS_PAYLOAD_FORMAT_INVALID = 310;    // Payload format is invalid or unrecognized
const IOT_DEVICE_STATUS_POWER_FAILURE = 311;             // Power interruption or unexpected reboot
const IOT_DEVICE_STATUS_MEMORY_OVERFLOW = 312;           // Internal memory overflow or exhaustion
const IOT_DEVICE_STATUS_INVALID_CONFIGURATION = 313;     // Device configuration is invalid or missing

export {
    IOT_DEVICE_STATUS_CONNECTED,
    IOT_DEVICE_STATUS_DISCONNECTED,
    IOT_DEVICE_STATUS_HEARTBEAT,
    IOT_DEVICE_STATUS_MEASURING,
    IOT_DEVICE_STATUS_SENSOR_DATA_SENT,
    IOT_DEVICE_STATUS_BATTERY_LOW,
    IOT_DEVICE_STATUS_SENSOR_FAILURE,
    IOT_DEVICE_STATUS_MAINTENANCE_REQUIRED,
    IOT_DEVICE_STATUS_MEASUREMENT_ERROR,
    IOT_DEVICE_STATUS_SENSOR_TIMEOUT,
    IOT_DEVICE_STATUS_SENSOR_OUT_OF_RANGE,
    IOT_DEVICE_STATUS_SENSOR_DATA_CORRUPTED,
    IOT_DEVICE_STATUS_MQTT_DISCONNECTED,
    IOT_DEVICE_STATUS_DATA_TRANSMISSION_FAILED,
    IOT_DEVICE_STATUS_PAYLOAD_FORMAT_INVALID,
    IOT_DEVICE_STATUS_POWER_FAILURE,
    IOT_DEVICE_STATUS_MEMORY_OVERFLOW,
    IOT_DEVICE_STATUS_INVALID_CONFIGURATION,
};
