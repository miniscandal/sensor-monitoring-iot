/**
 * Module responsibility
 *
 */

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function ConnectedNodesCount({ count }) {

    return (
        <section class="connected-nodes-count">
            <IconStat label="Nodes:" value={count} svgIconName="node" />
        </section>
    );
}

export { ConnectedNodesCount };
