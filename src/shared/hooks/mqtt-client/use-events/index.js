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
