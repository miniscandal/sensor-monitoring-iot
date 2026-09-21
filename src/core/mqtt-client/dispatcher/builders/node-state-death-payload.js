function nodeStateDeathPayloadBuilder({ message, nodeId }) {
    const {
        nodeStateCode,
        timestamp,
        sequenceNumber,
        status,
        reason,
    } = message;


    return {
        nodeStateCode,
        metadata: {
            nodeId,
            timestamp,
        },
        sequenceNumber,
        connection: {
            status,
            reason,
        },
    };
}

export { nodeStateDeathPayloadBuilder };
