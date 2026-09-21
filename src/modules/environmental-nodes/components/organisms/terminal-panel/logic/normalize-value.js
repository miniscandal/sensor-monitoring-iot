function normalizeValue(value) {
    if (value === undefined) {

        return true;
    };

    if (value.length && !isNaN(Number(value))) {

        return Number(value);
    }


    return value;
}

export { normalizeValue };
