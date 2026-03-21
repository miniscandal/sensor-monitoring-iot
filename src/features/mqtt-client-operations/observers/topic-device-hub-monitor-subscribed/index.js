import { IOT_DEVICE_OPERATION_CONNECT } from '@features/iot-devices-operations/constants/operations-code';

import { MQTT_CLIENT_EVENT_SUBSCRIBE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_STATUS_SUBSCRIBE_PRIVATE_TOPIC } from '@shared-constants/mqtt-client-status-codes';


function OnTopicDeviceHubMonitorSubscribedObserver() {

    return {
        events: [MQTT_CLIENT_EVENT_SUBSCRIBE],
        operationCodes: [MQTT_CLIENT_STATUS_SUBSCRIBE_PRIVATE_TOPIC],
        listener: ({ data: { actions: { publish } } }) => {
            publish({
                topic: import.meta.env.VITE_TOPIC_HUB_OPERATION_ALL,
                data: {
                    operationCode: IOT_DEVICE_OPERATION_CONNECT,
                },
            });
        },
    };
}

export { OnTopicDeviceHubMonitorSubscribedObserver };
