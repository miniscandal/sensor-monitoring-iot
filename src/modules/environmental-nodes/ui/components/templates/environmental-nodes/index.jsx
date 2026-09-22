import { EnvNodesPresenceCount } from '../../organisms/nodes-presence-count';
import { EnvNodesPresenceMonitor } from '../../organisms/nodes-presence-monitor';

import './style.css';


function EnvironmentalNodesTemplate() {

    return (
        <article class="environmental-nodes-template">
            <EnvNodesPresenceCount />
            <EnvNodesPresenceMonitor />
        </article>
    );
}

export { EnvironmentalNodesTemplate };
