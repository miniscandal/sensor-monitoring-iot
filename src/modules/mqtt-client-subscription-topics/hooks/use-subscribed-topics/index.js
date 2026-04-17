import { useState } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@infrastructure/mqtt-client/hooks/use-subscribe-observer';

import { OBSERVER_ENTITY_MQTT_EVENTS } from '@shared-constants/observer-entities';

import {
    MQTT_CLIENT_EVENT_SUBSCRIBE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';


function useSubscribedTopics() {
    const [topics, setTopics] = useState([]);

    useSubscribeObserverMqttClient({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_SUBSCRIBE,
        listener: ({ data: { topic } }) => setTopics((prevState) => [...prevState, topic]),
    });

    useSubscribeObserverMqttClient({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setTopics([]),
    });


    return topics;
}

export { useSubscribedTopics };
