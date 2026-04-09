/**
 * Module responsibility
 *
 */

import { useContext } from 'preact/hooks';

import { EnvironmentalNodesContext } from '@shared-contexts/environmental-nodes-provider';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function ConnectedNodesCount() {
    const { connectedNodesCount } = useContext(EnvironmentalNodesContext);

    return (
        <section class="connected-nodes-count">
            <IconStat label="Nodes:" value={connectedNodesCount} svgIconName="node" />
        </section>
    );
}

export { ConnectedNodesCount };
