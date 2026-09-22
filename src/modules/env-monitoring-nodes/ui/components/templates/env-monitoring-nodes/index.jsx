import { EnvNodesPresenceCount } from '../../organisms/nodes-presence-count';
import { EnvNodesPresenceMonitor } from '../../organisms/nodes-presence-monitor';

import './style.css';


function EnvMonitoringNodesTemplate() {

    return (
        <article class="env-monitoring-nodes">
            <EnvNodesPresenceCount />
            <EnvNodesPresenceMonitor />
        </article>
    );
}

export { EnvMonitoringNodesTemplate };
