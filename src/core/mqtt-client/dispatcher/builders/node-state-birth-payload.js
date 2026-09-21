function nodeStateBirthPayloadBuilder({ message, nodeId }) {
    const {
        nodeStateCode,
        timestamp,
        firmwareVersion,
        location,
        sequenceNumber,
        status,
        reason,
    } = message;


    return {
        nodeStateCode,
        metadata: {
            nodeId,
            timestamp,
            firmwareVersion,
            location,
        },
        sequenceNumber,
        connection: {
            status,
            reason,
        },
    };
}

export { nodeStateBirthPayloadBuilder };
