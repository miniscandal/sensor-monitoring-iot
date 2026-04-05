const toCamel = (str) => str.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());

function deepCamel(obj) {
    if (Array.isArray(obj)) {

        return obj.map(deepCamel);
    };

    if (obj !== null && typeof obj === 'object') {

        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [toCamel(k), deepCamel(v)])
        );
    }

    return obj;
}

export { deepCamel };
