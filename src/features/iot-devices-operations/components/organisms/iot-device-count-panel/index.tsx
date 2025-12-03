/**
 * Module responsibility
 *
 */

import { useIoTDevicesConnected } from '@shared-hooks/iot-devices/lifecycle/use-connected';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function IoTDeviceCountPanel() {
    const connectedDeviceIds = useIoTDevicesConnected();


    return (
        <section class="iot-device-count-panel">
            <IconStat label="Devices:" value={connectedDeviceIds.length} svgIconName="iotDevice" />
        </section>
    );
}

export { IoTDeviceCountPanel };
