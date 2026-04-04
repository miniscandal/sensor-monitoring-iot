import { ConnectedNodesCount } from '../../organisms/connected-nodes-count';
import { NodesMonitor } from '../../organisms/nodes-monitor';

import { EnvironmentalNodesProvider } from '@shared-contexts/environmental-nodes-provider';

import './style.css';


function NodesManagement() {

    return (
        <article class="nodes-management">
            <EnvironmentalNodesProvider>
                <ConnectedNodesCount />
                <NodesMonitor />
            </EnvironmentalNodesProvider>
        </article>
    );
}

export { NodesManagement };
