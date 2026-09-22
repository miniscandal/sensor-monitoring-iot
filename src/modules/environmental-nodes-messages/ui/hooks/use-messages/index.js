import { useState } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@core/mqtt-client/hooks/use-subscribe-observer';

import { ENTITY_MQTT_CLIENT_EVENTS } from '@shared-constants/observer-entities';

import {
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@core/mqtt-client/constants/client-events';


function useMqttClientMessages() {
    const [messages, setMessages] = useState([]);


    useSubscribeObserverMqttClient({
        entity: ENTITY_MQTT_CLIENT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setMessages([]),
    });

    useSubscribeObserverMqttClient({
        entity: ENTITY_MQTT_CLIENT_EVENTS,
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
