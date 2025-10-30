// Connection and presentation states (100–199)
const IOT_DEVICE_STATUS_CONNECTED = 101;             // Device is connected
const IOT_DEVICE_STATUS_DISCONNECTED = 102;          // Device disconnected
const IOT_DEVICE_STATUS_HEARTBEAT = 103;             // Heartbeat signal

// Measurement and data sending states (200–299)
const IOT_DEVICE_STATUS_MEASURING = 201;              // Sending sensor data
const IOT_DEVICE_STATUS_MEASUREMENT_ERROR = 202;      // Error sending measurement

// Alerts and special events (300–399)
const IOT_DEVICE_STATUS_BATTERY_LOW = 301;            // Low battery
const IOT_DEVICE_STATUS_SENSOR_FAILURE = 302;         // Sensor malfunction
const IOT_DEVICE_STATUS_MAINTENANCE_REQUIRED = 303;   // Maintenance required

export {
    IOT_DEVICE_STATUS_CONNECTED,
    IOT_DEVICE_STATUS_DISCONNECTED,
    IOT_DEVICE_STATUS_HEARTBEAT,
    IOT_DEVICE_STATUS_MEASURING,
    IOT_DEVICE_STATUS_MEASUREMENT_ERROR,
    IOT_DEVICE_STATUS_BATTERY_LOW,
    IOT_DEVICE_STATUS_SENSOR_FAILURE,
    IOT_DEVICE_STATUS_MAINTENANCE_REQUIRED,
};
