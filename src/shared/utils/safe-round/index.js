function safeRound(value) {

    return Number.isFinite(value) ? Math.round(value) : undefined;
}

export { safeRound };
