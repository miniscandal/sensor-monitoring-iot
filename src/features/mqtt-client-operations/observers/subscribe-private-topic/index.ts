import { IOT_DEVICE_OPERATION_CONNECT } from '@features/iot-devices-operations/constants/operations-code';

import { MQTT_CLIENT_EVENT_SUBSCRIBE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_STATUS_SUBSCRIBE_PRIVATE_TOPIC } from '@shared-constants/mqtt-client-status-codes';


function SubscribePrivateTopicObserver() {
    const observer = (event, { mqttClient }) => {
        console.log(mqttClient);

        mqttClient.publishIoTDeviceTopic(IOT_DEVICE_OPERATION_CONNECT);
    };


    return {
        events: [MQTT_CLIENT_EVENT_SUBSCRIBE],
        operationCodes: [MQTT_CLIENT_STATUS_SUBSCRIBE_PRIVATE_TOPIC],
        observer,
    };
}

export { SubscribePrivateTopicObserver };
