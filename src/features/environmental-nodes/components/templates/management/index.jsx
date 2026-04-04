import { ConnectedNodesCount } from '../../organisms/connected-nodes-count';
import { NodesMonitor } from '../../organisms/nodes-monitor';

import './style.css';


function NodesManagement({ count }) {

    return (
        <article class="nodes-management">
            <ConnectedNodesCount count={count} />
            <NodesMonitor />
        </article>
    );
}

export { NodesManagement };
