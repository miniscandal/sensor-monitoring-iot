function computeNextSelectedNode(nodeId, prevSelectedNodeId) {

    return nodeId === prevSelectedNodeId ? null : nodeId;
}

export { computeNextSelectedNode };
