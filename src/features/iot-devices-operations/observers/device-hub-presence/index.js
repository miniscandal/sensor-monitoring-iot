import {
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';

import {
    IOT_DEVICE_STATUS_LOGGED_IN,
    IOT_DEVICE_STATUS_LOGGED_OUT,
} from '@shared-constants/iot-device-status-codes';


function OnDeviceHubPresenceObserver({ actions }) {

    return {
        events: [MQTT_CLIENT_EVENT_MESSAGE, MQTT_CLIENT_EVENT_OFFLINE],
        statusCodes: [
            IOT_DEVICE_STATUS_LOGGED_IN,
            IOT_DEVICE_STATUS_LOGGED_OUT,
        ],
        listener: ({ data }) => {
            const { event } = data;

            if (event === MQTT_CLIENT_EVENT_OFFLINE) {
                return actions.onConnectionLost();
            }


            const { message: { deviceId, statusCode, ...metadata } } = data;

            if (statusCode === IOT_DEVICE_STATUS_LOGGED_IN) {
                return actions.onLogin({ deviceId, statusCode, ...metadata });
            }

            if (statusCode === IOT_DEVICE_STATUS_LOGGED_OUT) {
                return actions.onLogout(deviceId);
            }
        },
    };
}

export { OnDeviceHubPresenceObserver };
