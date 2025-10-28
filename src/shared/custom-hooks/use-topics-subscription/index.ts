import { useState, useEffect } from 'preact/hooks';

import { mqttClientObserverManager } from '@core-observers/mqtt-client-observer-manager';

import { MQTT_CLIENT_EVENT_SUBSCRIBE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';


function useTopicsSubscription() {
    const [topic, setTopic] = useState();

    useEffect(() => {
        const observer = (event, { topic }) => setTopic(topic);

        mqttClientObserverManager.subscribe({
            events: [MQTT_CLIENT_EVENT_SUBSCRIBE, MQTT_CLIENT_EVENT_OFFLINE],
            observer,
        });


        return () => mqttClientObserverManager.unsubscribe(observer);
    }, []);


    return topic;
}

export { useTopicsSubscription };
