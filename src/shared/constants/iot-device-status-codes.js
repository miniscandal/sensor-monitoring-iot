// ====================================================================
// GROUP 100-199: Connectivity and Availability (Network/Online Status)
// These statuses reflect the device's physical capacity to access the network.
// ====================================================================
/** The device has established a network connection (Wi-Fi, cellular, etc.). */
const IOT_DEVICE_STATUS_CONNECTED = 101;
/** The device has lost its network connection (Offline). */
const IOT_DEVICE_STATUS_DISCONNECTED = 102;
/** Periodic signal transmission to confirm connectivity and availability. */
const IOT_DEVICE_STATUS_HEARTBEAT = 103;
/** The status could not be determined or is not recognized. */
const IOT_DEVICE_STATUS_UNKNOWN = 104;
/** The device is physically powered off or without a power source. */
const IOT_DEVICE_STATUS_OFF = 105;


// ====================================================================
// GROUP 200-299: Operation, Session, and Activity (Normal / OK Functional Status)
// These statuses indicate the device's capacity to perform its tasks and the state of its logical session.
// ====================================================================
/** The device is fully operational and ready to start its work cycle. */
const IOT_DEVICE_STATUS_ACTIVATED = 201;
/** The device is connected and authenticated, but currently not performing any functional activity (waiting). */
const IOT_DEVICE_STATUS_IDLE = 202;
/** The device is connected but has been intentionally stopped by the application logic (scheduled standby). */
const IOT_DEVICE_STATUS_INACTIVE = 203;

/** The device is attempting to establish a logical or application session (Login). */
const IOT_DEVICE_STATUS_LOGIN_ATTEMPT = 204;
/** Logical session successfully established; the device can start sending/receiving commands. */
const IOT_DEVICE_STATUS_LOGGED_IN = 205;
/** The session has been intentionally terminated (Logout), although the network connection may persist (101). */
const IOT_DEVICE_STATUS_LOGGED_OUT = 206;

/** The device is in a transitional or waiting state (e.g., restarting components). */
const IOT_DEVICE_STATUS_PENDING = 210;
/** The device has been deactivated by an administrator and cannot operate. */
const IOT_DEVICE_STATUS_DISABLED = 211;
/** Applying a firmware or configuration update. */
const IOT_DEVICE_STATUS_UPDATING = 212;
/** Temporarily unavailable due to a scheduled maintenance window. */
const IOT_DEVICE_STATUS_MAINTENANCE = 213;

/** The device is actively acquiring data from its sensors. */
const IOT_DEVICE_STATUS_SENSOR_MEASURING = 250;
/** The sensor reading (functional payload) has been successfully transmitted to the server. */
const IOT_DEVICE_STATUS_SENSOR_DATA_SENT_OK = 251;
/** The device is in an active and continuous cycle of acquiring and transmitting (streaming) sensor data. */
const IOT_DEVICE_STATUS_STREAMING_SENSOR_DATA = 252;
/** Metadata, logs, or auxiliary information have been successfully transmitted. */
const IOT_DEVICE_STATUS_METADATA_SENT_OK = 260;


// ====================================================================
// GROUP 300-399: Alerts and Warnings (Non-Critical Conditions)
// These codes indicate conditions that require attention but do not interrupt operation.
// ====================================================================
/** General warning or non-critical condition. */
const IOT_DEVICE_STATUS_ALERT = 301;
/** The battery level has fallen below the warning threshold. */
const IOT_DEVICE_STATUS_BATTERY_LOW = 302;
/** The device has detected a condition that requires manual inspection or maintenance. */
const IOT_DEVICE_STATUS_MAINTENANCE_REQUIRED = 303;


// ====================================================================
// GROUP 400-499: Critical Errors and Failures
// These codes indicate operational failures that require intervention or resolution.
// ====================================================================
/** An unclassified operational failure has occurred. */
const IOT_DEVICE_STATUS_ERROR = 401;
/** A critical condition requiring immediate action. */
const IOT_DEVICE_STATUS_URGENT = 402;
/** One or more sensors have failed and cannot provide data. */
const IOT_DEVICE_STATUS_SENSOR_FAILURE = 403;
/** Failure to complete the acquisition or processing of the measurement. */
const IOT_DEVICE_STATUS_MEASUREMENT_ERROR = 404;
/** The sensor did not respond within the expected time limit. */
const IOT_DEVICE_STATUS_SENSOR_TIMEOUT = 405;
/** The sensor reading is outside the physical/valid range of values. */
const IOT_DEVICE_STATUS_SENSOR_OUT_OF_RANGE = 406;
/** The sensor data is corrupted or illegible. */
const IOT_DEVICE_STATUS_SENSOR_DATA_CORRUPTED = 407;
/** The device lost connection with the MQTT broker (or messaging service). */
const IOT_DEVICE_STATUS_MQTT_DISCONNECTED = 408;
/** Failure to transmit the main sensor data. */
const IOT_DEVICE_STATUS_SENSOR_DATA_TX_FAILED = 409;
/** The data packet format (payload) is incorrect or unrecognized by the server. */
const IOT_DEVICE_STATUS_PAYLOAD_FORMAT_INVALID = 410;
/** Power interruption or unexpected reboot. */
const IOT_DEVICE_STATUS_POWER_FAILURE = 411;
/** Internal memory overflow or exhaustion. */
const IOT_DEVICE_STATUS_MEMORY_OVERFLOW = 412;
/** The device's internal configuration is invalid or incomplete. */
const IOT_DEVICE_STATUS_INVALID_CONFIGURATION = 413;
/** Failure to transmit metadata or log data (auxiliary failure). */
const IOT_DEVICE_STATUS_METADATA_TX_FAILED = 414;
/** Error attempting to log in (incorrect, expired, or revoked credentials). */
const IOT_DEVICE_STATUS_AUTH_FAILED = 415;


// ====================================================================
// GROUP 500-599: Provisioning and Lifecycle (Onboarding and Registration)
// These codes reflect the device's identity and permanent configuration status.
// ====================================================================
/** Device recognized by the system but pending identity configuration. */
const IOT_DEVICE_STATUS_NEWLY_REGISTERED = 501;
/** The device is receiving and applying its initial provisioning configuration. */
const IOT_DEVICE_STATUS_CONFIGURING = 502;
/** The device has validated and stored its permanent credentials (keys, certificates). */
const IOT_DEVICE_STATUS_AUTHENTICATED_PERM = 503;
/** Provisioning successfully completed; ready to move to connection and operation. */
const IOT_DEVICE_STATUS_READY_TO_ACTIVATE = 504;
/** The device has been permanently retired from the system and its credentials revoked. */
const IOT_DEVICE_STATUS_DECOMMISSIONED = 505;


// ====================================================================
// Export
// ====================================================================
export {
    // 100s
    IOT_DEVICE_STATUS_CONNECTED,
    IOT_DEVICE_STATUS_DISCONNECTED,
    IOT_DEVICE_STATUS_HEARTBEAT,
    IOT_DEVICE_STATUS_UNKNOWN,
    IOT_DEVICE_STATUS_OFF,

    // 200s
    IOT_DEVICE_STATUS_ACTIVATED,
    IOT_DEVICE_STATUS_IDLE,
    IOT_DEVICE_STATUS_INACTIVE,
    IOT_DEVICE_STATUS_LOGIN_ATTEMPT,
    IOT_DEVICE_STATUS_LOGGED_IN,
    IOT_DEVICE_STATUS_LOGGED_OUT,
    IOT_DEVICE_STATUS_PENDING,
    IOT_DEVICE_STATUS_DISABLED,
    IOT_DEVICE_STATUS_UPDATING,
    IOT_DEVICE_STATUS_MAINTENANCE,
    IOT_DEVICE_STATUS_SENSOR_MEASURING,
    IOT_DEVICE_STATUS_SENSOR_DATA_SENT_OK,
    IOT_DEVICE_STATUS_STREAMING_SENSOR_DATA,
    IOT_DEVICE_STATUS_METADATA_SENT_OK,

    // 300s
    IOT_DEVICE_STATUS_ALERT,
    IOT_DEVICE_STATUS_BATTERY_LOW,
    IOT_DEVICE_STATUS_MAINTENANCE_REQUIRED,

    // 400s
    IOT_DEVICE_STATUS_ERROR,
    IOT_DEVICE_STATUS_URGENT,
    IOT_DEVICE_STATUS_SENSOR_FAILURE,
    IOT_DEVICE_STATUS_MEASUREMENT_ERROR,
    IOT_DEVICE_STATUS_SENSOR_TIMEOUT,
    IOT_DEVICE_STATUS_SENSOR_OUT_OF_RANGE,
    IOT_DEVICE_STATUS_SENSOR_DATA_CORRUPTED,
    IOT_DEVICE_STATUS_MQTT_DISCONNECTED,
    IOT_DEVICE_STATUS_SENSOR_DATA_TX_FAILED,
    IOT_DEVICE_STATUS_PAYLOAD_FORMAT_INVALID,
    IOT_DEVICE_STATUS_POWER_FAILURE,
    IOT_DEVICE_STATUS_MEMORY_OVERFLOW,
    IOT_DEVICE_STATUS_INVALID_CONFIGURATION,
    IOT_DEVICE_STATUS_METADATA_TX_FAILED,
    IOT_DEVICE_STATUS_AUTH_FAILED,

    // 500s
    IOT_DEVICE_STATUS_NEWLY_REGISTERED,
    IOT_DEVICE_STATUS_CONFIGURING,
    IOT_DEVICE_STATUS_AUTHENTICATED_PERM,
    IOT_DEVICE_STATUS_READY_TO_ACTIVATE,
    IOT_DEVICE_STATUS_DECOMMISSIONED,
};
