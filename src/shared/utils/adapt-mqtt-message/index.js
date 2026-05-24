const IOT_TO_FRONTEND_MAP = Object.freeze({
    nsc: 'nodeStateCode',
    nor: 'nodeOpResCode',
    ts: 'timestamp',
    v: 'firmwareVersion',
    status: 'status',
    reason: 'reason',
    loc: 'location',
});


function adaptMqttMessage(message) {
    if (message === null || typeof message !== 'object') {
        return message;
    }

    if (Array.isArray(message)) {
        return message.map(item => adaptMqttMessage(item));
    }

    const adapted = {};

    for (const [key, value] of Object.entries(message)) {
        const newKey = IOT_TO_FRONTEND_MAP[key] || key;

        if (key === 'ts' && typeof value === 'number') {
            adapted[newKey] = value * 1000;
        } else {
            adapted[newKey] = adaptMqttMessage(value);
        }
    }

    return adapted;
}

export { adaptMqttMessage };
