function handleNodeSelection(targetElement, selectedNodeId, setSelectedNodeId) {
    const isSameNode = targetElement.dataset.nodeId === selectedNodeId;

    setSelectedNodeId(isSameNode ? null : targetElement.dataset.nodeId);
};

export { handleNodeSelection };
