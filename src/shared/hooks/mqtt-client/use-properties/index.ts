/**
 * Module responsibility
 * 
 */

import { useState } from 'preact/hooks';

import { useMqttClientEventSubjectSubscribe } from '../use-event-subject-subscribe';

import { MQTT_CLIENT_PROPERTIES } from '@shared-constants/mqtt-client-properties';

import { MQTT_CLIENT_EVENT_CONNECT } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';


function useMqttClientProperties() {
    const [properties, setProperties] = useState(MQTT_CLIENT_PROPERTIES);

    useMqttClientEventSubjectSubscribe({
        events: [MQTT_CLIENT_EVENT_CONNECT, MQTT_CLIENT_EVENT_OFFLINE],
        observer: (event, { mqttClientProperties }) => {
            setProperties((prevState) => (
                {
                    ...prevState,
                    ...mqttClientProperties,
                }
            ));
        },
    });


    return properties;
}

export { useMqttClientProperties };
