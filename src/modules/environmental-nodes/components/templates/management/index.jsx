import { EnvNodesPresenceCount } from '../../organisms/nodes-presence-count';
import { EnvNodesPresenceMonitor } from '../../organisms/nodes-presence-monitor';

import './style.css';


function EnvNodesManagement() {

    return (
        <article class="env-nodes-management">
            <EnvNodesPresenceCount />
            <EnvNodesPresenceMonitor />
        </article>
    );
}

export { EnvNodesManagement };
