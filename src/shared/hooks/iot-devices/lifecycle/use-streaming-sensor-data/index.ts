import { signal } from '@preact/signals';
import { useContext } from 'preact/hooks';

import { useMqttClientEventSubjectSubscribe } from '@shared-hooks/mqtt-client/use-event-subject-subscribe';

import { IoTDevicesContext } from '@shared-contexts/iot-devices-provider';

import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';

import { IOT_DEVICE_STATUS_STREAMING_SENSOR_DATA } from '@shared-constants/iot-device-status-codes';


function useIoTDeviceStreamingSensorData() {
    const { setDeviceStatusMap } = useContext(IoTDevicesContext);

    useMqttClientEventSubjectSubscribe({
        events: [MQTT_CLIENT_EVENT_MESSAGE],
        statusCodes: [IOT_DEVICE_STATUS_STREAMING_SENSOR_DATA],
        observer: (event, { deviceId, statusCode, ...readings }) => {
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
