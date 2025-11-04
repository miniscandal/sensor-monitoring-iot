import { useContext } from 'preact/hooks';

import { useMQTTObserver } from '@shared-custom-hooks/mqtt-client/use-mqtt-observer';

import { IoTDevicesContext } from '@shared-contexts/iot-device';

import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';
import { signal } from '@preact/signals';


function useDeviceSensorReadings() {
    const { setIoTDevices } = useContext(IoTDevicesContext);

    useMQTTObserver({
        events: [MQTT_CLIENT_EVENT_MESSAGE],
        observer: (event, { statusCode, deviceId, ...readings }) => {
            if (statusCode !== 201) {

                return;
            }


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
