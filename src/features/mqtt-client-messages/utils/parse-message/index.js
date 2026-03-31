function parseMessage(message, index, { extractStatus, flatStringify }) {
    const { metadata, ...restMessage } = message;
    const { timestamp, device_id: deviceId, ...restMetadata } = metadata;


    return {
        key: `${timestamp}-${index}`,
        cells: [
            timestamp,
            deviceId,
            extractStatus(message),
            flatStringify({
                ...(Object.keys(restMetadata).length ? { metadata: restMetadata } : {}),
                ...restMessage,
            }),
        ],
    };
}

export { parseMessage };
