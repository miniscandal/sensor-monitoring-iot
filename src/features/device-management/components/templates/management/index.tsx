import { IoTDeviceCountPanel } from '../../organisms/iot-device-count-panel';
import { IoTDeviceListPanel } from '../../organisms/iot-device-list-panel';

import { IoTDevicesProvider } from '@shared-contexts/iot-devices-provider';

import './style.css';


function DeviceManagement() {

    return (
        <article class="device-management">
            <IoTDevicesProvider>
                <IoTDeviceCountPanel />
                <IoTDeviceListPanel />
            </IoTDevicesProvider>
        </article>
    );
}

export { DeviceManagement };
