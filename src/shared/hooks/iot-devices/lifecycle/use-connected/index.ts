import { useState } from 'preact/hooks';
import { useMqttClientEventSubject } from '@shared-hooks/mqtt-client/use-mqtt-observer';

import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';

import { IOT_DEVICE_STATUS_CONNECTED } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_DISCONNECTED } from '@shared-constants/iot-device-status-codes';


function useIoTDevicesConnected() {
    const [connectedDeviceIds, setConnectedDeviceIds] = useState([]);

    useMqttClientEventSubject({
        events: [MQTT_CLIENT_EVENT_MESSAGE, MQTT_CLIENT_EVENT_OFFLINE],
        statusCodes: [IOT_DEVICE_STATUS_CONNECTED, IOT_DEVICE_STATUS_DISCONNECTED],
        observer: (event, { deviceId, statusCode }) => {
            if (event === MQTT_CLIENT_EVENT_OFFLINE) {
                setConnectedDeviceIds([]);


                return;
            }

            setConnectedDeviceIds(prevState => {
                switch (statusCode) {
                    case IOT_DEVICE_STATUS_CONNECTED:

                        return prevState.includes(deviceId) ? prevState : [...prevState, deviceId];
                    case IOT_DEVICE_STATUS_DISCONNECTED:

                        return prevState.filter(id => id !== deviceId);
                    default:


                        return prevState;
                }
            });
        },
    });


    return connectedDeviceIds;
}

export { useIoTDevicesConnected };
