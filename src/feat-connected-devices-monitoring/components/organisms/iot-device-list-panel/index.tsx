/**
 * Module responsibility
 *
 */

import { useContext } from 'preact/hooks';

import { IoTDeviceCard } from '../iot-device-card';

import { useDeviceRegistry } from '@shared-custom-hooks/iot-device/device-onboarding/use-device-registry';
import { useDeviceSensorReadings } from '@shared-custom-hooks/iot-device/device-lifecycle/use-device-sensor-readings';

import { IoTDevicesContext } from '@shared-contexts/iot-device';

import './style.css';


function IoTDeviceListPanel() {
    const { iotDevices } = useContext(IoTDevicesContext);

    useDeviceRegistry();
    useDeviceSensorReadings();

    const deviceElements = Array.from(iotDevices.entries()).map(([key, iotDevice]) => (
        <IoTDeviceCard key={key} deviceId={key} {...iotDevice.sensorReadings} />
    ));


    return (
        <section class="connected_device_view">
            {deviceElements}
        </section>
    );
}

export { IoTDeviceListPanel };
