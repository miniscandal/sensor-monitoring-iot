import {
    DATA_ATTR_NODE_CONTROL_SELECTOR,
    DATA_ATTR_NODE_ID_SELECTOR,
} from '@modules/environmental-nodes/constants/selectors';

import { computeNextSelectedNode } from '../logic/compute-next-selected-node';
import { handleNodeControl } from '../logic/handle-node-control';


function handleNodesMonitorInteraction(event, setSelectedNodeId) {
    const selectors = `${DATA_ATTR_NODE_ID_SELECTOR}, ${DATA_ATTR_NODE_CONTROL_SELECTOR}`;
    const targetElement = event.target.closest(selectors);

    if (!targetElement) {

        return;
    }

    if (targetElement.matches(DATA_ATTR_NODE_ID_SELECTOR)) {
        setSelectedNodeId(prevState => computeNextSelectedNode(targetElement.dataset.nodeId, prevState));


        return;
    }

    setSelectedNodeId(prevState => handleNodeControl(targetElement, prevState));
};

export { handleNodesMonitorInteraction };
