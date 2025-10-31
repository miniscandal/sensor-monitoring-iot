import { useState, useEffect } from 'preact/hooks';

import { mqttClientObserverManager } from '@core-observers/mqtt-client-observer-manager';

import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';

import { IOT_DEVICE_STATUS_CONNECTED } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_DISCONNECTED } from '@shared-constants/iot-device-status-codes';


function useDeviceRegistry() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const observer = (event, { statusCode, deviceId, ...metadata }) => {
            if (event === MQTT_CLIENT_EVENT_OFFLINE) {
                setDevices([]);

                return;
            }

            setDevices(prevState => {
                switch (statusCode) {
                    case IOT_DEVICE_STATUS_CONNECTED: {
                        const exists = prevState.some(device => device.deviceId === deviceId);

                        if (exists) {

                            return prevState;
                        }

                        return [...prevState, { deviceId, ...metadata }];
                    }
                    case IOT_DEVICE_STATUS_DISCONNECTED:
                        return prevState.filter(d => d.deviceId !== deviceId);
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


    return devices;
}

export { useDeviceRegistry };
