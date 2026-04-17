import { useState } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@shared-hooks/mqtt-client/use-subscribe-observer';

import { OBSERVER_ENTITY_MQTT_EVENTS } from '@shared-constants/observer-entities';

import {
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';


function useMqttClientMessages() {
    const [messages, setMessages] = useState([]);


    useSubscribeObserverMqttClient({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setMessages([]),
    });

    useSubscribeObserverMqttClient({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_MESSAGE,
        listener: ({ data: { message } }) => {
            setMessages((prevState) => (
                [
                    ...prevState,
                    message,
                ]
            ));
        },
    });


    return messages;
}

export { useMqttClientMessages };
