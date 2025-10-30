/**
 * Module responsibility
 * 
 */

import { useState, useEffect } from 'preact/hooks';

import { mqttClientObserverManager } from '@core-observers/mqtt-client-observer-manager';

import { MqttClientPropertiesType } from '@core-services/mqtt-client/types/mqtt-client-properties';

import { MQTT_CLIENT_PROPERTIES } from '@core-services/mqtt-client/constants/client-mqtt-properties';

import { MQTT_CLIENT_EVENT_CONNECT } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';


function useMqttClientProperties() {
    const [properties, setProperties] = useState(MQTT_CLIENT_PROPERTIES);

    useEffect(() => {
        const observer = (event, { mqttClientProperties }) => {
            setProperties((prevState: MqttClientPropertiesType) => (
                {
                    ...prevState,
                    ...mqttClientProperties,
                }
            ));
        };

        mqttClientObserverManager.subscribe({
            events: [MQTT_CLIENT_EVENT_CONNECT, MQTT_CLIENT_EVENT_OFFLINE],
            observer,
        });


        return () => mqttClientObserverManager.unsubscribe(observer);
    }, []);


    return properties;
}

export { useMqttClientProperties };
