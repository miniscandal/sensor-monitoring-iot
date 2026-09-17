import {
    DATA_ATTR_NODE_CONTROL_SELECTOR,
    DATA_ATTR_NODE_ID_SELECTOR,
} from '@modules/environmental-nodes/constants/selectors';


function handleNodesMonitorInteraction({
    event,
    selectedNodeId,
    setSelectedNodeId,
    setActiveControl,
}) {
    const nodeCardElement = event.target.closest(DATA_ATTR_NODE_ID_SELECTOR);

    if (!nodeCardElement) {

        return;
    }

    const nodeId = nodeCardElement.dataset.nodeId;

    if (selectedNodeId !== nodeId) {
        setSelectedNodeId(nodeId);

        return;
    }

    const nodeControlElement = event.target.closest(DATA_ATTR_NODE_CONTROL_SELECTOR);

    if (!nodeControlElement) {

        return;
    }

    const control = nodeControlElement.dataset.control;

    setActiveControl(control);
}

export { handleNodesMonitorInteraction };
