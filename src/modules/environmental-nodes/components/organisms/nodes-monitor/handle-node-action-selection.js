/**
 * targetElement is <li data-action>. Use .closest([data-node-id]) to locate its parent node,
 * ensuring the action is correctly associated with the corresponding node. 
 */

import { DATA_ATTR_NODE_ID_SELECTOR } from '@modules/environmental-nodes/constants/selectors';


function handleNodeActionSelection(targetElement, selectedNodeId, setSelectedNodeId) {

    const nodeElement = targetElement.closest(DATA_ATTR_NODE_ID_SELECTOR);

    if (nodeElement.dataset.nodeId !== selectedNodeId) {
        setSelectedNodeId(nodeElement.dataset.nodeId);


        return;
    }

    const action = targetElement.dataset.action;

    console.log('action', action);
};

export { handleNodeActionSelection };
