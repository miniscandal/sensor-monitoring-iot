import { NodesPresenceCount } from '../../organisms/nodes-presence-count';
import { NodesMonitor } from '../../organisms/nodes-monitor';

import './style.css';


function NodesManagement() {

    return (
        <article class="nodes-management">
            <NodesPresenceCount />
            <NodesMonitor />
        </article>
    );
}

export { NodesManagement };
