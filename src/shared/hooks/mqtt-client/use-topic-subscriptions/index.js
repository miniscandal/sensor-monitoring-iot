import { useState } from 'preact/hooks';

import { useMqttClientEvents } from '../use-events';

import {
    MQTT_CLIENT_EVENT_SUBSCRIBE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';


function useMqttClientTopicSubscriptions() {
    const [topic, setTopic] = useState();

    useMqttClientEvents({
        events: [MQTT_CLIENT_EVENT_SUBSCRIBE, MQTT_CLIENT_EVENT_OFFLINE],
        listener: (event, { topic }) => setTopic(topic),
    });


    return topic;
}

export { useMqttClientTopicSubscriptions };
