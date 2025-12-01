/**
 * Module responsibility
 *
 */

import { useConnectedIoTDeviceCount } from '@shared-custom-hooks/iot-device/device-lifecycle/use-connected-iot-device-count';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function IoTDeviceCountPanel() {
    const count = useConnectedIoTDeviceCount();


    return (
        <section class="iot-device-count-panel">
            <IconStat label="Devices:" value={count.length} svgIconName="iotDevice" />
        </section>
    );
}

export { IoTDeviceCountPanel };
