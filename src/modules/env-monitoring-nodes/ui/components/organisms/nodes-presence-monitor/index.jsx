import { useContext, useState } from 'preact/hooks';

import { useClickOutside } from '@modules/env-monitoring-nodes/ui/hooks/use-click-outside';

import { EnvMonitoringNodeProvider } from '@modules/env-monitoring-nodes/ui/contexts/env-monitoring-node-provider';
import { EnvMonitoringNodesContext } from '@modules/env-monitoring-nodes/ui/contexts/env-monitoring-nodes-provider';

import { NodeCard } from '../node-card';
import { TerminalPanel } from '../terminal-panel';

import {
    DATA_ATTR_NODE_CONTROL_SELECTOR,
    DATA_ATTR_NODE_ID_SELECTOR,
} from '@modules/env-monitoring-nodes/constants/selectors';

import { DATA_ATTR_NODE_CONTROL_TERMINAL } from '@modules/env-monitoring-nodes/constants/node-controls';

import './style.css';


function EnvNodesPresenceMonitor() {
    const { nodes } = useContext(EnvMonitoringNodesContext);

    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [activeControl, setActiveControl] = useState(null);

    const monitorRef = useClickOutside(() => setSelectedNodeId(null));

    const handleClick = (event) => {
        const nodeCardElement = event.target.closest(DATA_ATTR_NODE_ID_SELECTOR);

        if (!nodeCardElement) {

            return;
        }

        const { nodeId } = nodeCardElement.dataset;

        if (selectedNodeId !== nodeId) {
            setSelectedNodeId(nodeId);
            setActiveControl(null);


            return;
        }

        const nodeControlElement = event.target.closest(DATA_ATTR_NODE_CONTROL_SELECTOR);

        if (!nodeControlElement) {

            return;
        }

        setActiveControl(nodeControlElement.dataset.control);
    };

    const nodeCards = Array.from(nodes.values()).map((node) => {
        const { metadata: { nodeId } } = node;


        return (
            <EnvMonitoringNodeProvider
                key={nodeId}
                isSelected={selectedNodeId === nodeId}
                nodeProperties={node}
            >
                <NodeCard />
            </EnvMonitoringNodeProvider>
        );
    });


    return (
        <div ref={monitorRef} class="env-nodes-presence-monitor">
            <ul onClick={handleClick}>
                {nodeCards}
            </ul>
            {
                activeControl === DATA_ATTR_NODE_CONTROL_TERMINAL
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
