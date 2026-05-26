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


function EnvNodesPresenceMonitor() {
    const { nodes } = useContext(EnvironmentalNodesContext);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const ref = useClickOutside(() => setSelectedNodeId(null));

    const handleClick = (event) => handleNodesMonitorInteraction(event, setSelectedNodeId);

    const nodeCards = Array.from(nodes).map(([key, node]) => {
        const { metadata: { nodeId } } = node;


        return (
            <EnvironmentalNodeProvider
                key={`${nodeId}-${key}`}
                isSelected={selectedNodeId === nodeId}
                nodeProperties={node}
            >
                <NodeCard />
            </EnvironmentalNodeProvider>
        );
    });


    return (
        <ul ref={ref} class="env-nodes-presence-monitor" onClick={handleClick}>
            {nodeCards}
        </ul>
    );
}

export { EnvNodesPresenceMonitor };
