import { useState } from 'preact/hooks';

import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import { OBSERVER_ENTITY_MQTT_EVENTS } from '@core-constants/observer-entities';

import {
    MQTT_CLIENT_EVENT_SUBSCRIBE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';


function useSubscribedTopics() {
    const [topics, setTopics] = useState([]);

    useMqttClientEvents({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_SUBSCRIBE,
        listener: ({ data: { topic } }) => setTopics((prevState) => [...prevState, topic]),
    });

    useMqttClientEvents({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setTopics([]),
    });


    return topics;
}

export { useSubscribedTopics };
