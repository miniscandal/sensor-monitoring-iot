import {
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';

import {
    IOT_DEVICE_STATUS_LOGGED_IN,
    IOT_DEVICE_STATUS_LOGGED_OUT,
} from '@shared-constants/iot-device-status-codes';


function OnDeviceHubMessageReceivedObserver({ actions }) {

    return {
        events: [MQTT_CLIENT_EVENT_MESSAGE, MQTT_CLIENT_EVENT_OFFLINE],
        statusCodes: [IOT_DEVICE_STATUS_LOGGED_IN, IOT_DEVICE_STATUS_LOGGED_OUT],
        listener: ({ data }) => {
            const { event, message: { deviceId, statusCode } } = data;

            if (event === MQTT_CLIENT_EVENT_OFFLINE) {
                return actions.onConnectionLost();
            }

            if (statusCode === IOT_DEVICE_STATUS_LOGGED_IN) {
                return actions.onDeviceLogin(deviceId);
            }

            if (statusCode === IOT_DEVICE_STATUS_LOGGED_OUT) {
                return actions.onDeviceLogout(deviceId);
            }
        },
    };
}

export { OnDeviceHubMessageReceivedObserver };
