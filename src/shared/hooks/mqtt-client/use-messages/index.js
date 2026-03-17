import { useState } from 'preact/hooks';

import { useMqttClientEvents } from '../use-events';

import {
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_MESSAGE_TRACKING } from '@shared-constants/mqtt-client-permissions';


function useMqttClientMessages() {
    const [messages, setMessages] = useState([]);

    useMqttClientEvents({
        events: [MQTT_CLIENT_EVENT_MESSAGE, MQTT_CLIENT_EVENT_OFFLINE],
        statusCodes: [MQTT_CLIENT_MESSAGE_TRACKING],
        observer: (event, message) => {
            if (event === MQTT_CLIENT_EVENT_OFFLINE) {
                setMessages([]);
            }

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
