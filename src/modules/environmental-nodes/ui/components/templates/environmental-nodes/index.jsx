import { EnvNodesPresenceCount } from '../../organisms/nodes-presence-count';
import { EnvNodesPresenceMonitor } from '../../organisms/nodes-presence-monitor';

import './style.css';


function EnvironmentalNodesTemplate() {

    return (
        <article class="env-nodes-management">
            <EnvNodesPresenceCount />
            <EnvNodesPresenceMonitor />
        </article>
    );
}

export { EnvironmentalNodesTemplate };
