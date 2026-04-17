import { useEffect, useRef } from 'preact/hooks';

import { mqttClientSubject } from '@infrastructure/mqtt-client/subjects/mqtt-client-subject';


function useSubscribeObserverMqttClient({ entity, instanceId, listener }) {
    const stableListener = useRef(listener);

    useEffect(() => {
        stableListener.current = listener;
    }, [listener]);

    useEffect(() => {
        const observerId = mqttClientSubject.subscribe({
            entity, instanceId,
            listener: (...args) => stableListener.current(...args),
        });


        return () => mqttClientSubject.unsubscribe(observerId);
    }, [entity, instanceId]);
}

export { useSubscribeObserverMqttClient };


/*
import { useEffect } from 'preact/hooks';

import { mqttClientSubject } from '@infrastructure/mqtt-client/subjects/mqtt-client-subject';


function useSubscribeObserverMqttClient({ entity, instanceId, listener }) {
    useEffect(() => {
        const observerId = mqttClientSubject.subscribe({
            entity,
            instanceId,
            listener,
        });


        return () => mqttClientSubject.unsubscribe(observerId);
    }, [entity, instanceId, listener]);
}

export { useSubscribeObserverMqttClient };
*/
