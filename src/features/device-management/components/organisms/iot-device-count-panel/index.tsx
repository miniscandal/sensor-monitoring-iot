/**
 * Module responsibility
 *
 */

import { useConnectedDeviceCount } from '@shared-custom-hooks/iot-device/device-lifecycle/use-connected-device-count';
import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function IoTDeviceCountPanel() {
    const count = useConnectedDeviceCount();


    return (
        <section class="iot-device-count-panel">
            <IconStat label="Devices:" value={count} svgIconName="iotDevice" />
        </section>
    );
}

export { IoTDeviceCountPanel };
