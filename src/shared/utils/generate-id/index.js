function generateId() {

    return crypto.randomUUID?.() ?? performance.now().toString(36);
}

export { generateId };
