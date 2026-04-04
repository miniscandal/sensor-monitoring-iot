/**
 * Module responsibility
 *
 */

import { useIoTDeviceSessionCount } from '@features/environmental-nodes/hooks/use-session-count';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function ConnectedNodesCount() {
    const sessionCount = useIoTDeviceSessionCount();


    return (
        <section class="connected-nodes-count">
            <IconStat label="Devices:" value={sessionCount} svgIconName="iotDevice" />
        </section>
    );
}

export { ConnectedNodesCount };
