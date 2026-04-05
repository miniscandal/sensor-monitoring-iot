// ====================================================================
// GROUP 100-199: Connectivity and Availability (Network/Online Status)
// These statuses reflect the node's physical capacity to access the network.
// ====================================================================
/** The node has established a network connection (Wi-Fi, cellular, etc.). */
const NODE_STATUS_CONNECTED = 101;
/** The node has lost its network connection (Offline). */
const NODE_STATUS_DISCONNECTED = 102;
/** Periodic signal transmission to confirm connectivity and availability. */
const NODE_STATUS_HEARTBEAT = 103;
/** The status could not be determined or is not recognized. */
const NODE_STATUS_UNKNOWN = 104;
/** The node is physically powered off or without a power source. */
const NODE_STATUS_OFF = 105;


// ====================================================================
// GROUP 200-299: Operation, Session, and Activity (Normal / OK Functional Status)
// These statuses indicate the node's capacity to perform its tasks and the state of its logical session.
// ====================================================================
/** The node is fully operational and ready to start its work cycle. */
const NODE_STATUS_ACTIVATED = 201;
/** The node is connected and authenticated, but currently not performing any functional activity (waiting). */
const NODE_STATUS_IDLE = 202;
/** The node is connected but has been intentionally stopped by the application logic (scheduled standby). */
const NODE_STATUS_INACTIVE = 203;

/** The node is attempting to establish a logical or application session (Login). */
const NODE_STATUS_LOGIN_ATTEMPT = 204;
/** Logical session successfully established; the node can start sending/receiving commands. */
const NODE_STATUS_LOGGED_IN = 205;
/** The session has been intentionally terminated (Logout), although the network connection may persist (101). */
const NODE_STATUS_LOGGED_OUT = 206;

/** The node is in a transitional or waiting state (e.g., restarting components). */
const NODE_STATUS_PENDING = 210;
/** The node has been deactivated by an administrator and cannot operate. */
const NODE_STATUS_DISABLED = 211;
/** Applying a firmware or configuration update. */
const NODE_STATUS_UPDATING = 212;
/** Temporarily unavailable due to a scheduled maintenance window. */
const NODE_STATUS_MAINTENANCE = 213;

/** The node is actively acquiring data from its sensors. */
const NODE_STATUS_SENSOR_MEASURING = 250;
/** The sensor reading (functional payload) has been successfully transmitted to the server. */
const NODE_STATUS_SENSOR_DATA_SENT_OK = 251;
/** The node is in an active and continuous cycle of acquiring and transmitting (streaming) sensor data. */
const NODE_STATUS_STREAMING_SENSOR_DATA = 252;
/** Metadata, logs, or auxiliary information have been successfully transmitted. */
const NODE_STATUS_METADATA_SENT_OK = 260;


// ====================================================================
// GROUP 300-399: Alerts and Warnings (Non-Critical Conditions)
// These codes indicate conditions that require attention but do not interrupt operation.
// ====================================================================
/** General warning or non-critical condition. */
const NODE_STATUS_ALERT = 301;
/** The battery level has fallen below the warning threshold. */
const NODE_STATUS_BATTERY_LOW = 302;
/** The node has detected a condition that requires manual inspection or maintenance. */
const NODE_STATUS_MAINTENANCE_REQUIRED = 303;


// ====================================================================
// GROUP 400-499: Critical Errors and Failures
// These codes indicate operational failures that require intervention or resolution.
// ====================================================================
/** An unclassified operational failure has occurred. */
const NODE_STATUS_ERROR = 401;
/** A critical condition requiring immediate action. */
const NODE_STATUS_URGENT = 402;
/** One or more sensors have failed and cannot provide data. */
const NODE_STATUS_SENSOR_FAILURE = 403;
/** Failure to complete the acquisition or processing of the measurement. */
const NODE_STATUS_MEASUREMENT_ERROR = 404;
/** The sensor did not respond within the expected time limit. */
const NODE_STATUS_SENSOR_TIMEOUT = 405;
/** The sensor reading is outside the physical/valid range of values. */
const NODE_STATUS_SENSOR_OUT_OF_RANGE = 406;
/** The sensor data is corrupted or illegible. */
const NODE_STATUS_SENSOR_DATA_CORRUPTED = 407;
/** The node lost connection with the MQTT broker (or messaging service). */
const NODE_STATUS_MQTT_DISCONNECTED = 408;
/** Failure to transmit the main sensor data. */
const NODE_STATUS_SENSOR_DATA_TX_FAILED = 409;
/** The data packet format (payload) is incorrect or unrecognized by the server. */
const NODE_STATUS_PAYLOAD_FORMAT_INVALID = 410;
/** Power interruption or unexpected reboot. */
const NODE_STATUS_POWER_FAILURE = 411;
/** Internal memory overflow or exhaustion. */
const NODE_STATUS_MEMORY_OVERFLOW = 412;
/** The node's internal configuration is invalid or incomplete. */
const NODE_STATUS_INVALID_CONFIGURATION = 413;
/** Failure to transmit metadata or log data (auxiliary failure). */
const NODE_STATUS_METADATA_TX_FAILED = 414;
/** Error attempting to log in (incorrect, expired, or revoked credentials). */
const NODE_STATUS_AUTH_FAILED = 415;


// ====================================================================
// GROUP 500-599: Provisioning and Lifecycle (Onboarding and Registration)
// These codes reflect the node's identity and permanent configuration status.
// ====================================================================
/** Node recognized by the system but pending identity configuration. */
const NODE_STATUS_NEWLY_REGISTERED = 501;
/** The node is receiving and applying its initial provisioning configuration. */
const NODE_STATUS_CONFIGURING = 502;
/** The node has validated and stored its permanent credentials (keys, certificates). */
const NODE_STATUS_AUTHENTICATED_PERM = 503;
/** Provisioning successfully completed; ready to move to connection and operation. */
const NODE_STATUS_READY_TO_ACTIVATE = 504;
/** The node has been permanently retired from the system and its credentials revoked. */
const NODE_STATUS_DECOMMISSIONED = 505;


// ====================================================================
// Export
// ====================================================================
export {
    // 100s
    NODE_STATUS_CONNECTED,
    NODE_STATUS_DISCONNECTED,
    NODE_STATUS_HEARTBEAT,
    NODE_STATUS_UNKNOWN,
    NODE_STATUS_OFF,

    // 200s
    NODE_STATUS_ACTIVATED,
    NODE_STATUS_IDLE,
    NODE_STATUS_INACTIVE,
    NODE_STATUS_LOGIN_ATTEMPT,
    NODE_STATUS_LOGGED_IN,
    NODE_STATUS_LOGGED_OUT,
    NODE_STATUS_PENDING,
    NODE_STATUS_DISABLED,
    NODE_STATUS_UPDATING,
    NODE_STATUS_MAINTENANCE,
    NODE_STATUS_SENSOR_MEASURING,
    NODE_STATUS_SENSOR_DATA_SENT_OK,
    NODE_STATUS_STREAMING_SENSOR_DATA,
    NODE_STATUS_METADATA_SENT_OK,

    // 300s
    NODE_STATUS_ALERT,
    NODE_STATUS_BATTERY_LOW,
    NODE_STATUS_MAINTENANCE_REQUIRED,

    // 400s
    NODE_STATUS_ERROR,
    NODE_STATUS_URGENT,
    NODE_STATUS_SENSOR_FAILURE,
    NODE_STATUS_MEASUREMENT_ERROR,
    NODE_STATUS_SENSOR_TIMEOUT,
    NODE_STATUS_SENSOR_OUT_OF_RANGE,
    NODE_STATUS_SENSOR_DATA_CORRUPTED,
    NODE_STATUS_MQTT_DISCONNECTED,
    NODE_STATUS_SENSOR_DATA_TX_FAILED,
    NODE_STATUS_PAYLOAD_FORMAT_INVALID,
    NODE_STATUS_POWER_FAILURE,
    NODE_STATUS_MEMORY_OVERFLOW,
    NODE_STATUS_INVALID_CONFIGURATION,
    NODE_STATUS_METADATA_TX_FAILED,
    NODE_STATUS_AUTH_FAILED,

    // 500s
    NODE_STATUS_NEWLY_REGISTERED,
    NODE_STATUS_CONFIGURING,
    NODE_STATUS_AUTHENTICATED_PERM,
    NODE_STATUS_READY_TO_ACTIVATE,
    NODE_STATUS_DECOMMISSIONED,
};
