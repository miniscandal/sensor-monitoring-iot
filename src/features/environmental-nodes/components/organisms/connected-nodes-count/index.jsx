/**
 * Module responsibility
 *
 */

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function ConnectedNodesCount({ count }) {

    return (
        <section class="connected-nodes-count">
            <IconStat label="Devices:" value={count} svgIconName="iotDevice" />
        </section>
    );
}

export { ConnectedNodesCount };
