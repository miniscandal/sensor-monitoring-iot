import { useState } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@infrastructure/mqtt-client/hooks/use-subscribe-observer';

import { OBSERVER_ENTITY_MQTT_EVENTS } from '@shared-constants/observer-entities';

import {
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@infrastructure/mqtt-client/constants/client-events';


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
