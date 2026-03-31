function flatStringify(obj, prefix = '', separator = ' - ') {

    return Object.entries(obj).map(([key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (Array.isArray(value)) {

            return `${fullKey}: ${value.join(', ')}`;
        }

        if (typeof value === 'object' && value !== null) {

            return flatStringify(value, fullKey);
        }


        return `${fullKey}: ${value}`;
    }).join(separator);
}

export { flatStringify };
