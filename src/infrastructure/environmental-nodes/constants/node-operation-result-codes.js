/* ====================================================================
   NODE OPERATION RESULT CODES
   Only outcomes of explicit commands sent by the system to the node.
   ==================================================================== */

/* Data Transmission Results (200–299) */
const NODE_OP_RESULT_SENSOR_MEASURING = 200;
const NODE_OP_RESULT_SENSOR_DATA_SENT_OK = 201;
const NODE_OP_RESULT_METADATA_SENT_OK = 202;

export {
    NODE_OP_RESULT_SENSOR_MEASURING,
    NODE_OP_RESULT_SENSOR_DATA_SENT_OK,
    NODE_OP_RESULT_METADATA_SENT_OK,
};
