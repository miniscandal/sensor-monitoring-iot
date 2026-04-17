function parseMessage(message, index, { extractStatus, flatStringify }) {
    const { metadata, ...restMessage } = message;
    const { timestamp, nodeId, ...restMetadata } = metadata;


    return {
        key: `${timestamp}-${index}`,
        cells: [
            timestamp,
            nodeId,
            extractStatus(message),
            flatStringify({
                ...(Object.keys(restMetadata).length ? { metadata: restMetadata } : {}),
                ...restMessage,
            }),
        ],
    };
}

export { parseMessage };
