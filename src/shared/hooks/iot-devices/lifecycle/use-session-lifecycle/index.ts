/**
 * Module responsibility
 * 
 * ✰ Update session map on login and logout events
 * ✰ Clear all sessions when client goes offline
 *
 */

import { useContext } from 'preact/hooks';

import { useMqttClientEventSubjectSubscribe } from '@shared-hooks/mqtt-client/use-event-subject-subscribe';

import { IoTDevicesContext } from '@shared-contexts/iot-devices-provider';

import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';

import { IOT_DEVICE_STATUS_LOGGED_IN } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_LOGGED_OUT } from '@shared-constants/iot-device-status-codes';


function useIoTDeviceSessionLifecycle() {
    const { setDeviceStatusMap } = useContext(IoTDevicesContext);

    useMqttClientEventSubjectSubscribe({
        events: [MQTT_CLIENT_EVENT_MESSAGE, MQTT_CLIENT_EVENT_OFFLINE],
        statusCodes: [
            IOT_DEVICE_STATUS_LOGGED_IN,
            IOT_DEVICE_STATUS_LOGGED_OUT,
        ],
        observer: (event, { deviceId, statusCode, ...metadata }) => {
            if (event === MQTT_CLIENT_EVENT_OFFLINE) {
                setDeviceStatusMap(new Map());


                return;
            }

            setDeviceStatusMap(prevState => {
                const nextState = new Map(prevState);

                switch (statusCode) {
                    case IOT_DEVICE_STATUS_LOGGED_IN: {
                        if (nextState.has(deviceId)) {

                            return prevState;
                        }

                        nextState.set(deviceId, { deviceId, statusCode, ...metadata });


                        return nextState;
                    }
                    case IOT_DEVICE_STATUS_LOGGED_OUT:
                        nextState.delete(deviceId);


                        return nextState;
                    default:

                        return prevState;
                }
            });
        },
    });
}

export { useIoTDeviceSessionLifecycle };
