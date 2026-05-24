function extractNodeId(path) {
    const match = path.match(/env-node\/([^/]+)/);


    return match ? match[1] : null;
}

export { extractNodeId };
