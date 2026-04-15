import { useEffect, useRef } from 'preact/hooks';

import { mqttClientEventSubject } from '@infrastructure/mqtt-client/subjects/mqtt-client-subject';


function useMqttClientEvents({ entity, instanceId, listener }) {
    const stableListener = useRef(listener);

    useEffect(() => {
        stableListener.current = listener;
    }, [listener]);

    useEffect(() => {
        const observerId = mqttClientEventSubject.subscribe({
            entity,
            instanceId,
            listener: (...args) => stableListener.current(...args),
        });


        return () => mqttClientEventSubject.unsubscribe(observerId);
    }, [entity, instanceId]);
}

export { useMqttClientEvents };


/*
import { useEffect } from 'preact/hooks';

import { mqttClientEventSubject } from '@infrastructure/mqtt-client/subjects/mqtt-client-subject';


function useMqttClientEvents({ entity, instanceId, listener }) {
    useEffect(() => {
        const observerId = mqttClientEventSubject.subscribe({
            entity,
            instanceId,
            listener,
        });


        return () => mqttClientEventSubject.unsubscribe(observerId);
    }, [entity, instanceId, listener]);
}

export { useMqttClientEvents };
*/
