// ====================================================================
// NODE STATUS CODES
//
// Codes are divided into two semantic groups used as separate fields
// in every MQTT payload:
//
//   node_state  ΓÇö what the node IS right now (persistent state).
//                 Answers: is it connected? operational? in maintenance?
//                 Ranges: 100ΓÇô199 (connectivity), 200ΓÇô213 (operational),
//                         500ΓÇô599 (provisioning lifecycle)
//
//   op_result   ΓÇö what HAPPENED with the operation that generated this
//                 message (event outcome).
//                 Answers: did the sensor read succeed? was the data sent?
//                          is there a warning or failure?
//                 Ranges: 204ΓÇô260 (session/activity results),
//                         300ΓÇô399 (warnings), 400ΓÇô499 (critical errors)
//
// Usage by topic:
//   /connection   ΓåÆ  node_state: 100ΓÇô199   |  op_result: null
//   /data         ΓåÆ  node_state: 200ΓÇô213   |  op_result: 250ΓÇô260, 400ΓÇô499
//   /diagnostics  ΓåÆ  node_state: 200ΓÇô213   |  op_result: 300ΓÇô399 or null
//   /alerts       ΓåÆ  node_state: 200ΓÇô213   |  op_result: 300ΓÇô399, 400ΓÇô499
//
// ====================================================================


// ====================================================================
// node_state ΓÇö GROUP 100-199: Connectivity and Availability
// Reflects the node's physical capacity to access the network.
// ====================================================================

/** The node has established a network connection (Wi-Fi, cellular, etc.). */
export const NODE_STATE_CONNECTED = 101;

/** The node has lost its network connection. */
export const NODE_STATE_DISCONNECTED = 102;

/** Periodic signal confirming connectivity and availability (heartbeat). */
export const NODE_STATE_HEARTBEAT = 103;

/** The connectivity state could not be determined or is not recognized. */
export const NODE_STATE_UNKNOWN = 104;

/** The node is physically powered off or without a power source. */
export const NODE_STATE_OFF = 105;


// ====================================================================
// node_state ΓÇö GROUP 200-213: Operational State
// Reflects the node's capacity to perform its tasks and the state
// of its logical session.
// ====================================================================

/** The node is fully operational and ready to start its work cycle. */
export const NODE_STATE_ACTIVATED = 201;

/** The node is operational but not currently performing any activity. */
export const NODE_STATE_IDLE = 202;

/** The node has been intentionally stopped by application logic (scheduled standby). */
export const NODE_STATE_INACTIVE = 203;

/** The node is in a transitional or waiting state (e.g., restarting components). */
export const NODE_STATE_PENDING = 210;

/** The node has been deactivated by an administrator and cannot operate. */
export const NODE_STATE_DISABLED = 211;

/** The node is applying a firmware or configuration update. */
export const NODE_STATE_UPDATING = 212;

/** The node is temporarily unavailable due to a scheduled maintenance window. */
export const NODE_STATE_MAINTENANCE = 213;


// ====================================================================
// node_state ΓÇö GROUP 500-599: Provisioning and Lifecycle
// Reflects the node's identity and permanent configuration status
// during onboarding.
// ====================================================================

/** Node recognized by the system but pending identity configuration. */
export const NODE_STATE_NEWLY_REGISTERED = 501;

/** The node is receiving and applying its initial provisioning configuration. */
export const NODE_STATE_CONFIGURING = 502;

/** The node has validated and stored its permanent credentials (keys, certificates). */
export const NODE_STATE_AUTHENTICATED_PERM = 503;

/** Provisioning complete; ready to move to connection and operation. */
export const NODE_STATE_READY_TO_ACTIVATE = 504;

/** The node has been permanently retired and its credentials revoked. */
export const NODE_STATE_DECOMMISSIONED = 505;


// ====================================================================
// op_result ΓÇö GROUP 204-260: Session and Activity Results
// Outcome of the session or data acquisition operation that generated
// the message.
// ====================================================================

/** The node is attempting to establish a logical or application session. */
export const OP_RESULT_LOGIN_ATTEMPT = 204;

/** Logical session successfully established. */
export const OP_RESULT_LOGGED_IN = 205;

/** The session has been intentionally terminated. */
export const OP_RESULT_LOGGED_OUT = 206;

/** The node is actively acquiring data from its sensors. */
export const OP_RESULT_SENSOR_MEASURING = 250;

/** The sensor reading has been successfully transmitted to the server. */
export const OP_RESULT_SENSOR_DATA_SENT_OK = 251;

/** The node is in an active and continuous cycle of acquiring and transmitting sensor data. */
export const OP_RESULT_STREAMING_SENSOR_DATA = 252;

/** Metadata, logs, or auxiliary information have been successfully transmitted. */
export const OP_RESULT_METADATA_SENT_OK = 260;


// ====================================================================
// op_result ΓÇö GROUP 300-399: Alerts and Warnings
// Non-critical conditions that require attention but do not interrupt
// operation.
// ====================================================================

/** General warning or non-critical condition. */
export const OP_RESULT_ALERT = 301;

/** The battery level has fallen below the warning threshold. */
export const OP_RESULT_BATTERY_LOW = 302;

/** The node has detected a condition that requires manual inspection. */
export const OP_RESULT_MAINTENANCE_REQUIRED = 303;


// ====================================================================
// op_result ΓÇö GROUP 400-499: Critical Errors and Failures
// Operational failures that require intervention or resolution.
// ====================================================================

/** An unclassified operational failure has occurred. */
export const OP_RESULT_ERROR = 401;

/** A critical condition requiring immediate action. */
export const OP_RESULT_URGENT = 402;

/** One or more sensors have failed and cannot provide data. */
export const OP_RESULT_SENSOR_FAILURE = 403;

/** Failure to complete the acquisition or processing of the measurement. */
export const OP_RESULT_MEASUREMENT_ERROR = 404;

/** The sensor did not respond within the expected time limit. */
export const OP_RESULT_SENSOR_TIMEOUT = 405;

/** The sensor reading is outside the physical/valid range of values. */
export const OP_RESULT_SENSOR_OUT_OF_RANGE = 406;

/** The sensor data is corrupted or illegible. */
export const OP_RESULT_SENSOR_DATA_CORRUPTED = 407;

/** The node lost connection with the MQTT broker (or messaging service). */
export const OP_RESULT_MQTT_DISCONNECTED = 408;

/** Failure to transmit the main sensor data. */
export const OP_RESULT_SENSOR_DATA_TX_FAILED = 409;

/** The data packet format (payload) is incorrect or unrecognized by the server. */
export const OP_RESULT_PAYLOAD_FORMAT_INVALID = 410;

/** Power interruption or unexpected reboot. */
export const OP_RESULT_POWER_FAILURE = 411;

/** Internal memory overflow or exhaustion. */
export const OP_RESULT_MEMORY_OVERFLOW = 412;

/** The node's internal configuration is invalid or incomplete. */
export const OP_RESULT_INVALID_CONFIGURATION = 413;

/** Failure to transmit metadata or log data. */
export const OP_RESULT_METADATA_TX_FAILED = 414;

/** Error attempting to log in (incorrect, expired, or revoked credentials). */
export const OP_RESULT_AUTH_FAILED = 415;
