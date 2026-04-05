/**
 * Module responsibility
 *
 */

import { useState, useContext } from 'preact/hooks';

import { NodeCard } from '../node-card';

import { useNodePresence } from '@features/environmental-nodes/hooks/use-node-presence';
import { useNodeSensorsStream } from '@shared-hooks/environmental-nodes/use-node-sensors-stream';

import { EnvironmentalNodesContext } from '@shared-contexts/environmental-nodes-provider';

import {
    DATA_ATTR_ACTION_SELECTOR,
    DATA_ATTR_NODE_ID_SELECTOR,
} from '@features/environmental-nodes/constants/selectors';

import './style.css';


function NodesMonitor() {
    const { nodes } = useContext(EnvironmentalNodesContext);
    const [selectedNode, setSelectedNode] = useState(null);

    useNodePresence();
    useNodeSensorsStream();

    const nodeCards = Array.from(nodes.entries()).map(([key, node]) => {
        const { metadata, data } = node;

        return (
            <NodeCard
                key={`${metadata.nodeId}-${key}`}
                nodeId={metadata.nodeId}
                sensorReadings={metadata.sensorReadings}
                selectionStatus={selectedNode === metadata.nodeId}
                statusCode={data?.statusCode}
            />
        );
    });

    const handleClick = (event) => {
        const selectors = `${DATA_ATTR_ACTION_SELECTOR}, ${DATA_ATTR_NODE_ID_SELECTOR}`;
        const targetElement = event.target.closest(selectors);

        if (!targetElement) {

            return;
        }

        if (targetElement.matches(DATA_ATTR_NODE_ID_SELECTOR)) {
            const isSameNode = targetElement.dataset.nodeId === selectedNode;

            setSelectedNode(isSameNode ? null : targetElement.dataset.nodeId);

            return;
        }

        /*
    
        At this point we know that targetElement corresponds to a <li data-action>
        therefore we look up its parent [data-node-id] to associate the action with the node.
    
        */

        const nodeElement = targetElement.closest(DATA_ATTR_NODE_ID_SELECTOR);

        if (nodeElement.dataset.nodeId !== selectedNode) {
            setSelectedNode(nodeElement.dataset.nodeId);


            return;
        }

        const action = targetElement.dataset.action;

        console.log('action', action);
    };


    return (
        <ul class="nodes-monitor" onClick={handleClick}>
            {nodeCards}
        </ul>
    );
}

export { NodesMonitor };
