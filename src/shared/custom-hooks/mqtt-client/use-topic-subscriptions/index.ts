import { useState } from 'preact/hooks';

import { useMQTTObserver } from '../use-mqtt-observer';

import { MQTT_CLIENT_EVENT_SUBSCRIBE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';


function useTopicSubscriptions() {
    const [topic, setTopic] = useState();

    useMQTTObserver({
        events: [MQTT_CLIENT_EVENT_SUBSCRIBE, MQTT_CLIENT_EVENT_OFFLINE],
        observer: (event, { topic }) => setTopic(topic),
    });


    return topic;
}

export { useTopicSubscriptions };
