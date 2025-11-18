import { IoTDeviceCountPanel } from '../../organisms/iot-device-count-panel';
import { IoTDeviceListPanel } from '../../organisms/iot-device-list-panel';

import { IoTDeviceProvider } from '@shared-contexts/iot-device';


function DeviceManagement() {

    return (
        <IoTDeviceProvider>
            <IoTDeviceCountPanel />
            <IoTDeviceListPanel />
        </IoTDeviceProvider>
    );
}

export { DeviceManagement };
