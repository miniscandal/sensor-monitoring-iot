/**
 * Module responsibility
 *
 */

import { useContext } from 'preact/hooks';

import { EnvironmentalNodesContext } from '@modules/environmental-nodes/contexts/environmental-nodes-provider';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function EnvNodesPresenceCount() {
    const { nodesCount } = useContext(EnvironmentalNodesContext);


    return (
        <section class="env-nodes-presence-count">
            <IconStat label="Nodes:" value={nodesCount} svgIconName="node" />
        </section>
    );
}

export { EnvNodesPresenceCount };
