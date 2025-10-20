import { useState, useEffect } from 'preact/hooks';

import { mqttClientObserverManager } from '@core-observers/mqtt-client-observer-manager';

import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';
import { IOT_DEVICE_STATUS_CONNECTED } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_DISCONNECTED } from '@shared-constants/iot-device-status-codes';


function useConnectedDeviceCount() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const observer = (event, { message }) => {
            console.log('event', event);
            console.log('message', message);

            if (event !== MQTT_CLIENT_EVENT_MESSAGE && event !== MQTT_CLIENT_EVENT_OFFLINE) {


                return;
            }

            if (event === MQTT_CLIENT_EVENT_OFFLINE) {
                setCount(0);

                console.log('offline');

            }


            const { statusCode } = message;

            if (statusCode !== IOT_DEVICE_STATUS_CONNECTED && statusCode !== IOT_DEVICE_STATUS_DISCONNECTED) {

                return;
            }
            console.log('statusCode', statusCode);

            setCount(prevState =>
            (
                statusCode === IOT_DEVICE_STATUS_CONNECTED
                    ? prevState + 1
                    : event === MQTT_CLIENT_EVENT_OFFLINE ? 0 : prevState - 1
            ));
        };

        mqttClientObserverManager.subscribe(observer);

        return () => { };
    }, []);

    console.log('count', count);

    return count;
}

export { useConnectedDeviceCount };
