/**
 * Module responsibility
 *
 */

import { useIoTDeviceConnectionCount } from '@shared-hooks/iot-device/lifecycle/use-connection-count';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function IoTDeviceCountPanel() {
    const count = useIoTDeviceConnectionCount();


    return (
        <section class="iot-device-count-panel">
            <IconStat label="Devices:" value={count.length} svgIconName="iotDevice" />
        </section>
    );
}

export { IoTDeviceCountPanel };
