import { IoTDeviceCountPanel } from './components/organisms/iot-device-count-panel';
import { IoTDeviceListPanel } from './components/organisms/iot-device-list-panel';

import { IoTDeviceProvider } from '@shared-contexts/iot-device';


function FeatConnectedDeviceMonitoring() {

    return (
        <IoTDeviceProvider>
            <IoTDeviceCountPanel />
            <IoTDeviceListPanel />
        </IoTDeviceProvider>
    );
}

export { FeatConnectedDeviceMonitoring };
