import { useState } from 'preact/hooks';

import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import { OBSERVER_ENTITY_MQTT_EVENTS } from '@core-constants/observer-entities';

import {
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';


function useMqttClientMessages() {
    const [messages, setMessages] = useState([]);


    useMqttClientEvents({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setMessages([]),
    });

    useMqttClientEvents({
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
