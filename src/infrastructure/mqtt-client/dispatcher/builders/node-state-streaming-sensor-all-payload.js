function nodeStateStreamingSensorAllPayloadBuilder({ message, nodeId }) {
    const {
        nodeStateCode,
        timestamp,
        sequenceNumber,
        sensorsReadings: {
            humidity,
            temperature,
        },
    } = message;


    return {
        nodeStateCode,
        metadata: {
            nodeId,
            timestamp,
        },
        sequenceNumber,
        data: {
            sensorsReadings: {
                humidity,
                temperature,
            },
        },
    };
}

export { nodeStateStreamingSensorAllPayloadBuilder };
