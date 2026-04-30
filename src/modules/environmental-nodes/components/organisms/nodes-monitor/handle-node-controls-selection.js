/**
 * targetElement is <li data-control>. Use .closest([data-node-id]) to locate its parent node,
 * ensuring the control is correctly associated with the corresponding node. 
 */

import { DATA_ATTR_NODE_ID_SELECTOR } from '@modules/environmental-nodes/constants/selectors';



function handleNodeControlsSelection(targetElement, selectedNodeId, setSelectedNodeId) {

    const nodeElement = targetElement.closest(DATA_ATTR_NODE_ID_SELECTOR);

    if (nodeElement.dataset.nodeId !== selectedNodeId) {
        setSelectedNodeId(nodeElement.dataset.nodeId);


        return;
    }

    const nodeControl = targetElement.dataset.control;

    console.log('control', nodeControl);
};

export { handleNodeControlsSelection };
