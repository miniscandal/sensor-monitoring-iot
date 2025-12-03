// Connection and presentation states (100–199)
const IOT_DEVICE_STATUS_CONNECTED = 101; //Device is connected to the network. Base connectivity state: the device is linked but activity is not guaranteed.
const IOT_DEVICE_STATUS_ACTIVATED = 102; //The device is active: transmitting data or ready to receive commands.
const IOT_DEVICE_STATUS_INACTIVE = 103; //Connected but not performing any functional activity (standby, disabled, not transmitting).
const IOT_DEVICE_STATUS_DISCONNECTED = 104; //Lost network connection, cannot send or receive data.
const IOT_DEVICE_STATUS_REGISTERED = 105; //Recognized by the system but not yet operational.
const IOT_DEVICE_STATUS_HEARTBEAT = 106; //Periodic signal to confirm connectivity; does not imply useful data transmission.
const IOT_DEVICE_STATUS_IDLE = 107; //Connected and available, but not currently active. Can receive commands or wake up at any time.
const IOT_DEVICE_STATUS_ALERT = 108; //Reports a warning condition (non‑critical).
const IOT_DEVICE_STATUS_URGENT = 109; //Reports a critical condition requiring immediate action.
const IOT_DEVICE_STATUS_PENDING = 110; //In setup or configuration process (transitional state).
const IOT_DEVICE_STATUS_ERROR = 111; //Encountered an operational failure.
const IOT_DEVICE_STATUS_DISABLED = 112; //Intentionally deactivated by the system or administrator.
const IOT_DEVICE_STATUS_UPDATING = 113; //Applying firmware or configuration update.
const IOT_DEVICE_STATUS_MAINTENANCE = 114; //In maintenance mode, temporarily unavailable.
const IOT_DEVICE_STATUS_UNKNOWN = 115; //State not recognized or indeterminate; used as fallback.
const IOT_DEVICE_STATUS_OFF = 116; //Physically powered down (no energy).


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
    IOT_DEVICE_STATUS_ACTIVATED,
    IOT_DEVICE_STATUS_INACTIVE,
    IOT_DEVICE_STATUS_DISCONNECTED,
    IOT_DEVICE_STATUS_HEARTBEAT,
    IOT_DEVICE_STATUS_IDLE,
    IOT_DEVICE_STATUS_ALERT,
    IOT_DEVICE_STATUS_URGENT,
    IOT_DEVICE_STATUS_REGISTERED,
    IOT_DEVICE_STATUS_PENDING,
    IOT_DEVICE_STATUS_ERROR,
    IOT_DEVICE_STATUS_DISABLED,
    IOT_DEVICE_STATUS_UPDATING,
    IOT_DEVICE_STATUS_MAINTENANCE,
    IOT_DEVICE_STATUS_UNKNOWN,
    IOT_DEVICE_STATUS_OFF,
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
