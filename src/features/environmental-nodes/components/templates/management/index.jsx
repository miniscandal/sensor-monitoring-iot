import { ConnectedNodesCount } from '../../organisms/connected-nodes-count';
import { NodesMonitor } from '../../organisms/nodes-monitor';

import './style.css';


function NodesManagement() {

    return (
        <article class="nodes-management">
            <ConnectedNodesCount />
            <NodesMonitor />
        </article>
    );
}

export { NodesManagement };
