const MQTT_TOPIC_NODE_OPERATION = (plant, line, nodeId) => (
    import.meta.env.VITE_TOPIC_NODE_OPERATION
        .replace('{plant}', plant)
        .replace('{line}', line)
        .replace('{id}', nodeId)
);

const MQTT_TOPIC_NODE_OPERATION_ALL = import.meta.env.VITE_TOPIC_NODE_OPERATION_ALL;


export {
    MQTT_TOPIC_NODE_OPERATION,
    MQTT_TOPIC_NODE_OPERATION_ALL,
};
