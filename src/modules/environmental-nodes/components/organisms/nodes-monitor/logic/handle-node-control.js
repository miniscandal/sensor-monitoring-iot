/**
 * targetElement is <li data-control>. Use .closest([data-node-id]) to locate its parent node,
 * ensuring the control is correctly associated with the corresponding node. 
 */

import { DATA_ATTR_NODE_ID_SELECTOR } from '@modules/environmental-nodes/constants/selectors';


function handleNodeControl(targetElement, prevSelectedNodeId) {
    const nodeElement = targetElement.closest(DATA_ATTR_NODE_ID_SELECTOR);
    const nodeId = nodeElement.dataset.nodeId;

    if (nodeId !== prevSelectedNodeId) {

        return nodeId;
    }

    const nodeControl = targetElement.dataset.control;

    console.log('control', nodeControl);

    return prevSelectedNodeId;
};

export { handleNodeControl };
