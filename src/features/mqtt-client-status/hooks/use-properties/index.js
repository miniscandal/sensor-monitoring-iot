/**
 * Module responsibility
 * 
 */

import { useState } from 'preact/hooks';

import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import { MQTT_CLIENT_PROPERTIES } from '@shared-constants/mqtt-client-properties';

import {
    MQTT_CLIENT_EVENT_CONNECT,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';


function useMqttClientProperties() {
    const [properties, setProperties] = useState(MQTT_CLIENT_PROPERTIES);

    useMqttClientEvents({
        entity: 'mqttEvents',
        id: MQTT_CLIENT_EVENT_CONNECT,
        listener: ({ actions }) => {
            const { getClientProperties } = actions;

            setProperties((prevState) => (
                {
                    ...prevState,
                    ...getClientProperties(),
                }
            ));
        },
    });

    useMqttClientEvents({
        entity: 'mqttEvents',
        id: MQTT_CLIENT_EVENT_OFFLINE,
        listener: ({ actions }) => {
            const { getClientProperties } = actions;

            setProperties((prevState) => (
                {
                    ...prevState,
                    ...getClientProperties(),
                }
            ));
        },
    });


    return properties;
}

export { useMqttClientProperties };
