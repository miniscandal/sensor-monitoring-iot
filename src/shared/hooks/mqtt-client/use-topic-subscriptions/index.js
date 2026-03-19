import { useState } from 'preact/hooks';

import { useMqttClientEvents } from '../use-events';

import {
    MQTT_CLIENT_EVENT_SUBSCRIBE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';

import { MQTT_CLIENT_STATUS_SUBSCRIBE_PRIVATE_TOPIC } from '@shared-constants/mqtt-client-status-codes';


function useMqttClientTopicSubscriptions() {
    const [topic, setTopic] = useState(null);

    useMqttClientEvents({
        events: [MQTT_CLIENT_EVENT_SUBSCRIBE, MQTT_CLIENT_EVENT_OFFLINE],
        operationCodes: [MQTT_CLIENT_STATUS_SUBSCRIBE_PRIVATE_TOPIC],
        listener: ({ data: { topic } }) => setTopic(topic),
    });


    return topic;
}

export { useMqttClientTopicSubscriptions };
