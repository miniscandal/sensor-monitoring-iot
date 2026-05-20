const MQTT_TOPIC_ENV_NODE_COMMAND = (params) => {
    const template = import.meta.env.VITE_TOPIC_ENV_NODE_COMMAND;

    if (!params || !params.plant || !params.line || !params.nodeId) {
        return template;
    }

    const { plant, line, nodeId } = params;

    return template
        .replace('{plant}', plant)
        .replace('{line}', line)
        .replace('{id}', nodeId);
};

const MQTT_TOPIC_ALL_ENV_NODE_COMMAND = import.meta.env.VITE_TOPIC_ALL_ENV_NODE_COMMAND;


export {
    MQTT_TOPIC_ENV_NODE_COMMAND,
    MQTT_TOPIC_ALL_ENV_NODE_COMMAND,
};
