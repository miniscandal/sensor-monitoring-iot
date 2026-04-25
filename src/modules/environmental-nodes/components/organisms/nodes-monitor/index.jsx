/**
 * NodesMonitor Component
 *
 * Displays a list of environmental nodes and handles user interactions:
 * - Node selection (toggle on/off)
 * - Action toolbar handling (associate actions with the correct node)
 */

import { useState, useContext } from 'preact/hooks';

import { NodeCard } from '../node-card';

import { EnvironmentalNodesContext } from '@modules/environmental-nodes/contexts/environmental-nodes-provider';

import { handleNodeSelection } from './handle-node-selection';
import { handleNodeActionSelection } from './handle-node-action-selection';

import {
    DATA_ATTR_ACTION_SELECTOR,
    DATA_ATTR_NODE_ID_SELECTOR,
} from '@modules/environmental-nodes/constants/selectors';

import './style.css';


function NodesMonitor() {
    const { nodes } = useContext(EnvironmentalNodesContext);
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    const nodeCards = Array.from(nodes.entries()).map(([key, node]) => {
        const { nodeStateCode, metadata, data } = node;


        return (
            <NodeCard
                key={`${metadata.nodeId}-${key}`}
                isSelected={selectedNodeId === metadata.nodeId}
                nodeStateCode={nodeStateCode}
                metadata={metadata}
                data={data}
            />
        );
    });

    const handleClick = (event) => {
        const selectors = `${DATA_ATTR_ACTION_SELECTOR}, ${DATA_ATTR_NODE_ID_SELECTOR}`;
        const targetElement = event.target.closest(selectors);

        if (!targetElement) {

            return;
        }

        if (targetElement.matches(DATA_ATTR_ACTION_SELECTOR)) {
            handleNodeActionSelection(targetElement, selectedNodeId, setSelectedNodeId);
        } else {
            handleNodeSelection(targetElement, selectedNodeId, setSelectedNodeId);
        }
    };


    return (
        <ul class="nodes-monitor" onClick={handleClick}>
            {nodeCards}
        </ul>
    );
}

export { NodesMonitor };
