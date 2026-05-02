/**
 * NodesMonitor Component
 *
 * Displays a list of environmental nodes and handles user interactions:
 * - Node selection (toggle on/off)
 * - Control toolbar handling (associate controls with the correct node)
 */

import { useState, useContext } from 'preact/hooks';

import { useClickOutside } from '@modules/environmental-nodes/hooks/use-click-outside';

import { EnvironmentalNodeProvider } from '@modules/environmental-nodes/contexts/environmental-node-provider';

import { EnvironmentalNodesContext } from '@modules/environmental-nodes/contexts/environmental-nodes-provider';

import { NodeCard } from '../node-card';

import { handleNodesMonitorInteraction } from './handlers/nodes-monitor-interaction';

import './style.css';


function NodesMonitor() {
    const { nodes } = useContext(EnvironmentalNodesContext);

    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const ref = useClickOutside(() => setSelectedNodeId(null));

    const handleClick = (event) => handleNodesMonitorInteraction(event, setSelectedNodeId);

    const nodeCards = Array.from(nodes).map(([key, node]) => {
        const { metadata } = node;


        return (
            <EnvironmentalNodeProvider
                key={`${metadata.nodeId}-${key}`}
                isSelected={selectedNodeId === metadata.nodeId}
                nodeStateCode={node.nodeStateCode}
                metadata={metadata}
                data={node.data}
            >
                <NodeCard />
            </EnvironmentalNodeProvider>
        );
    });


    return (
        <ul ref={ref} class="nodes-monitor" onClick={handleClick}>
            {nodeCards}
        </ul>
    );
}

export { NodesMonitor };
