import { useState } from 'preact/hooks';

import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import {
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';


function useMqttClientMessages() {
    const [messages, setMessages] = useState([]);


    useMqttClientEvents({
        entity: 'mqttEvents',
        id: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setMessages([]),
    });

    useMqttClientEvents({
        entity: 'mqttEvents',
        id: MQTT_CLIENT_EVENT_MESSAGE,
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
