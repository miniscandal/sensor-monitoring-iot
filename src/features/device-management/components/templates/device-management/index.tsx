import { IoTDeviceCountPanel } from '../../organisms/iot-device-count-panel';
import { IoTDeviceListPanel } from '../../organisms/iot-device-list-panel';

import { IoTDeviceProvider } from '@shared-contexts/iot-device';

import './style.css';


function DeviceManagement() {

    return (
        <article class="device-management">
            <IoTDeviceProvider>
                <IoTDeviceCountPanel />
                <IoTDeviceListPanel />
            </IoTDeviceProvider>
        </article>
    );
}

export { DeviceManagement };
