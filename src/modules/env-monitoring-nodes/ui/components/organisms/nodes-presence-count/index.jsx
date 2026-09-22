/**
 * Module responsibility
 *
 */

import { useContext } from 'preact/hooks';

import { EnvMonitoringNodesContext } from '@modules/env-monitoring-nodes/ui/contexts/env-monitoring-nodes-provider';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function EnvNodesPresenceCount() {
    const { nodesCount } = useContext(EnvMonitoringNodesContext);


    return (
        <section class="env-nodes-presence-count">
            <IconStat label="Nodes:" value={nodesCount} svgIconName="node" />
        </section>
    );
}

export { EnvNodesPresenceCount };
