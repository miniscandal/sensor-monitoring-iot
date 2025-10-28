import { useState, useEffect } from 'preact/hooks';

import { mqttClientObserverManager } from '@core-observers/mqtt-client-observer-manager';

import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';

import { IOT_DEVICE_STATUS_CONNECTED } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_DISCONNECTED } from '@shared-constants/iot-device-status-codes';


function useConnectedDeviceCount() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const observer = (event, { statusCode }) => {
            if (event === MQTT_CLIENT_EVENT_OFFLINE) {
                setCount(0);

                return;
            }

            setCount(prevState => {
                switch (statusCode) {
                    case IOT_DEVICE_STATUS_CONNECTED:
                        return prevState + 1;
                    case IOT_DEVICE_STATUS_DISCONNECTED:
                        return Math.max(prevState - 1, 0);
                    default:
                        return prevState;
                }
            });
        };

        mqttClientObserverManager.subscribe({
            events: [MQTT_CLIENT_EVENT_MESSAGE, MQTT_CLIENT_EVENT_OFFLINE],
            observer,
        });


        return () => mqttClientObserverManager.unsubscribe(observer);
    }, []);


    return count;
}

export { useConnectedDeviceCount };
