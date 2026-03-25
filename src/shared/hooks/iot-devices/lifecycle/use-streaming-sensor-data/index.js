import { signal } from '@preact/signals';
import { useContext } from 'preact/hooks';

import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import { IoTDevicesContext } from '@shared-contexts/iot-devices-provider';

import { OBSERVER_ENTITY_STATUS_CODES } from '@core-constants/observer-entities';

import { IOT_DEVICE_STATUS_STREAMING_SENSOR_DATA } from '@shared-constants/iot-device-status-codes';


function useIoTDeviceStreamingSensorData() {
    const { setDeviceStatusMap } = useContext(IoTDevicesContext);


    useMqttClientEvents({
        entity: OBSERVER_ENTITY_STATUS_CODES,
        id: IOT_DEVICE_STATUS_STREAMING_SENSOR_DATA,
        listener: ({ data }) => {
            const { deviceId, message } = data;
            const { statusCode, ...readings } = message;


            setDeviceStatusMap(prevState => {
                const nextState = new Map(prevState);
                const device = nextState.get(deviceId);

                if (!device) {

                    return prevState;
                }

                const { temperature, humidity } = readings.sensorReadings;

                if (device.sensorReadings) {
                    device.sensorReadings.temperature.value = readings.sensorReadings.temperature;
                    device.sensorReadings.humidity.value = readings.sensorReadings.humidity;

                    nextState.set(deviceId, { ...device, statusCode });
                } else {
                    const sensorReadings = {
                        temperature: signal(temperature),
                        humidity: signal(humidity),
                    };

                    nextState.set(deviceId, { ...device, statusCode, sensorReadings });
                }


                return nextState;
            });
        },
    });
}

export { useIoTDeviceStreamingSensorData };
