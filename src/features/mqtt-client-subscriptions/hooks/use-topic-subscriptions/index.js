import { useState } from 'preact/hooks';

import { useMqttClientEvents } from '../../../../shared/hooks/mqtt-client/use-events';

import {
    MQTT_CLIENT_EVENT_SUBSCRIBE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';


function useMqttClientTopicSubscriptions() {
    const [topics, setTopics] = useState([]);

    useMqttClientEvents({
        entity: 'mqttEvents',
        id: MQTT_CLIENT_EVENT_SUBSCRIBE,
        listener: ({ data: { topic } }) => setTopics((prevState) => [...prevState, topic]),
    });

    useMqttClientEvents({
        entity: 'mqttEvents',
        id: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setTopics([]),
    });


    return topics;
}

export { useMqttClientTopicSubscriptions };
