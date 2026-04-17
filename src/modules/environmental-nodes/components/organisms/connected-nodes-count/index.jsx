/**
 * Module responsibility
 *
 */

import { useContext } from 'preact/hooks';

import { EnvironmentalNodesContext } from '@modules/environmental-nodes/contexts/environmental-nodes-provider';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function ConnectedNodesCount() {
    const { connectedCount } = useContext(EnvironmentalNodesContext);


    return (
        <section class="connected-nodes-count">
            <IconStat label="Nodes:" value={connectedCount} svgIconName="node" />
        </section>
    );
}

export { ConnectedNodesCount };
