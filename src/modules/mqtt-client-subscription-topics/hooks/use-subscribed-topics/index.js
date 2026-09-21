import { useState } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@core/mqtt-client/hooks/use-subscribe-observer';

import { ENTITY_MQTT_CLIENT_EVENTS } from '@shared-constants/observer-entities';

import {
    MQTT_CLIENT_EVENT_SUBSCRIBE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@core/mqtt-client/constants/client-events';


function useSubscribedTopics() {
    const [topics, setTopics] = useState([]);

    useSubscribeObserverMqttClient({
        entity: ENTITY_MQTT_CLIENT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_SUBSCRIBE,
        listener: ({ data: { topic } }) => setTopics((prevState) => [...prevState, topic]),
    });

    useSubscribeObserverMqttClient({
        entity: ENTITY_MQTT_CLIENT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setTopics([]),
    });


    return topics;
}

export { useSubscribedTopics };
