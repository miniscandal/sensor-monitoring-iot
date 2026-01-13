import { useState } from 'preact/hooks';
import { useMqttClientEventSubjectSubscribe } from '@shared-hooks/mqtt-client/use-event-subject-subscribe';

import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';

import { IOT_DEVICE_STATUS_LOGGED_IN } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_LOGGED_OUT } from '@shared-constants/iot-device-status-codes';


function useIoTDeviceSessionCount() {
    const [connectedDeviceIds, setConnectedDeviceIds] = useState([]);

    useMqttClientEventSubjectSubscribe({
        events: [MQTT_CLIENT_EVENT_MESSAGE, MQTT_CLIENT_EVENT_OFFLINE],
        statusCodes: [IOT_DEVICE_STATUS_LOGGED_IN, IOT_DEVICE_STATUS_LOGGED_OUT],
        observer: (event, { deviceId, statusCode }) => {
            if (event === MQTT_CLIENT_EVENT_OFFLINE) {
                setConnectedDeviceIds([]);


                return;
            }

            setConnectedDeviceIds(prevState => {
                switch (statusCode) {
                    case IOT_DEVICE_STATUS_LOGGED_IN:

                        return prevState.includes(deviceId) ? prevState : [...prevState, deviceId];
                    case IOT_DEVICE_STATUS_LOGGED_OUT:

                        return prevState.filter(id => id !== deviceId);
                    default:

                        return prevState;
                }
            });
        },
    });


    return connectedDeviceIds.length;
}

export { useIoTDeviceSessionCount };
