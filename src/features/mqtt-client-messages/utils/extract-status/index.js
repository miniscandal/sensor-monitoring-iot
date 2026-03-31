const STATUS_EXTRACTORS = [
    (msg) => msg.connection?.state,
    (msg) => msg.data?.status_code,
    (msg) => msg.alerts?.join(', '),
    (msg) => {
        const keys = Object.keys(msg.alerts ?? {});

        return keys.length ? keys.join(', ') : undefined;
    },
];


function extractStatus(message) {
    for (const extract of STATUS_EXTRACTORS) {
        const value = extract(message);

        if (value != null) {

            return value;
        };
    }


    return '—';
}

export { extractStatus };
