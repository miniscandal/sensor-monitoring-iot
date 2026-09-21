/**
 * Module responsibility
 * 
 */

import { useState } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@core/mqtt-client/hooks/use-subscribe-observer';

import { ENTITY_MQTT_CLIENT_EVENTS } from '@shared-constants/observer-entities';

import { MQTT_CLIENT_PROPERTIES } from '@core/mqtt-client/constants/client-properties';

import {
    MQTT_CLIENT_EVENT_CONNECT,
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@core/mqtt-client/constants/client-events';


function useMqttClientProperties() {
    const [properties, setProperties] = useState(MQTT_CLIENT_PROPERTIES);

    useSubscribeObserverMqttClient({
        entity: ENTITY_MQTT_CLIENT_EVENTS,
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
        entity: ENTITY_MQTT_CLIENT_EVENTS,
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
