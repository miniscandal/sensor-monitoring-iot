/**
 * Module responsibility
 *
 */

import { useIoTDeviceSessionCount } from '@shared-hooks/iot-devices/lifecycle/use-session-count';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function IoTDeviceCountPanel() {
    const sessionCount = useIoTDeviceSessionCount();


    return (
        <section class="iot-device-count-panel">
            <IconStat label="Devices:" value={sessionCount} svgIconName="iotDevice" />
        </section>
    );
}

export { IoTDeviceCountPanel };
