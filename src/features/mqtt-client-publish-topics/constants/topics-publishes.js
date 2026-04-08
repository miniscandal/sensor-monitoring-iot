const MQTT_TOPIC_NODE_OPERATION = (params) => {
    const template = import.meta.env.VITE_TOPIC_NODE_OPERATION;

    if (!params || !params.plant || !params.line || !params.nodeId) {
        return template;
    }

    const { plant, line, nodeId } = params;

    return template
        .replace('{plant}', plant)
        .replace('{line}', line)
        .replace('{id}', nodeId);
};

const MQTT_TOPIC_NODE_OPERATION_ALL = import.meta.env.VITE_TOPIC_NODE_OPERATION_ALL;


export {
    MQTT_TOPIC_NODE_OPERATION,
    MQTT_TOPIC_NODE_OPERATION_ALL,
};
