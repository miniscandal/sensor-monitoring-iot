import { signal } from '@preact/signals';
import { useContext } from 'preact/hooks';

import { useMQTTObserver } from '@shared-custom-hooks/mqtt-client/use-mqtt-observer';

import { IoTDevicesContext } from '@shared-contexts/iot-device';

import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';

import { IOT_DEVICE_STATUS_SENSOR_DATA_SENT } from '@shared-constants/iot-device-status-codes';



function useDeviceSensorReadings() {
    const { setIoTDevices } = useContext(IoTDevicesContext);

    useMQTTObserver({
        events: [MQTT_CLIENT_EVENT_MESSAGE],
        statusCodes: [IOT_DEVICE_STATUS_SENSOR_DATA_SENT],
        observer: (event, { deviceId, ...readings }) => {
            setIoTDevices(prevState => {
                const nextState = new Map(prevState);
                const device = nextState.get(deviceId);

                if (!device) {

                    return prevState;
                }

                const { temperature, humidity } = readings.sensorReadings || {};

                if (!(Number.isFinite(temperature) && Number.isFinite(humidity))) {

                    return prevState;
                }

                if (!device.sensorReadings) {
                    device.sensorReadings = {
                        temperature: signal(readings.sensorReadings.temperature),
                        humidity: signal(readings.sensorReadings.humidity),
                    };


                    return nextState;
                }

                device.sensorReadings.temperature.value = readings.sensorReadings.temperature;
                device.sensorReadings.humidity.value = readings.sensorReadings.humidity;


                return prevState;
            });
        },
    });
}

export { useDeviceSensorReadings };
