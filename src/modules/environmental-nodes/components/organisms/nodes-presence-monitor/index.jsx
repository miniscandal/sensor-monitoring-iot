/**
 * EnvNodesPresenceMonitor
 *
 * Displays environmental nodes and handles:
 * - Node selection
 * - Node control interactions
 * - Closing the selected node when clicking outside the monitor
 */

import { useContext, useState } from 'preact/hooks';

import { useClickOutside } from '@modules/environmental-nodes/hooks/use-click-outside';

import { EnvironmentalNodeProvider } from '@modules/environmental-nodes/contexts/environmental-node-provider';
import { EnvironmentalNodesContext } from '@modules/environmental-nodes/contexts/environmental-nodes-provider';

import { NodeCard } from '../node-card';
import { TerminalPanel } from '../terminal-panel';

import { handleNodesMonitorInteraction } from './handlers/nodes-monitor-interaction';

import './style.css';


function EnvNodesPresenceMonitor() {
    const { nodes } = useContext(EnvironmentalNodesContext);

    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [activeControl, setActiveControl] = useState(null);

    const monitorRef = useClickOutside(() => setSelectedNodeId(null));

    const handleMonitorClick = (event) => handleNodesMonitorInteraction({
        event,
        selectedNodeId,
        setSelectedNodeId,
        setActiveControl,
    });

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
        <div ref={monitorRef} class="env-nodes-presence-monitor">
            <ul onClick={handleMonitorClick}>
                {nodeCards}
            </ul>
            {
                activeControl === 'terminal'
                &&
                <TerminalPanel
                    nodeId={selectedNodeId}
                    setActiveControl={setActiveControl}
                />
            }
        </div>
    );
}

export { EnvNodesPresenceMonitor };
