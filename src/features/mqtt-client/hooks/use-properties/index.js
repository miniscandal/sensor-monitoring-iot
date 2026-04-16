/**
 * Module responsibility
 * 
 */

import { useState } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@shared-hooks/mqtt-client/use-subscribe-observer';

import { OBSERVER_ENTITY_MQTT_EVENTS } from '@shared-constants/observer-entities';

import { MQTT_CLIENT_PROPERTIES } from '@shared-constants/mqtt-client-properties';

import {
    MQTT_CLIENT_EVENT_CONNECT,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';


function useMqttClientProperties() {
    const [properties, setProperties] = useState(MQTT_CLIENT_PROPERTIES);

    useSubscribeObserverMqttClient({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_CONNECT,
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

    useSubscribeObserverMqttClient({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_OFFLINE,
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
