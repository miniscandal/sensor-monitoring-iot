import { NodesPresenceCount } from '../../organisms/nodes-presence-count';
import { NodesPresenceMonitor } from '../../organisms/nodes-presence-monitor';

import './style.css';


function NodesManagement() {

    return (
        <article class="nodes-management">
            <NodesPresenceCount />
            <NodesPresenceMonitor />
        </article>
    );
}

export { NodesManagement };
