import { useState } from 'preact/hooks';

import { useMqttClientEventSubjectSubscribe } from '../use-event-subject-subscribe';

import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_MESSAGE_TRACKING } from '@shared-constants/mqtt-client-permissions';


function useMqttClientMessages() {
    const [messages, setMessages] = useState([]);

    useMqttClientEventSubjectSubscribe({
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
