import { useEffect } from 'preact/hooks';

import { mqttClientEventSubject } from '@core-mqtt/client-event-subject';


function useMqttClientEvents({ entity, id, listener }) {
    useEffect(() => {
        const observerId = mqttClientEventSubject.subscribe({
            entity,
            id,
            listener,
        });


        return () => mqttClientEventSubject.unsubscribe(observerId);
    }, [entity, id, listener]);
}

export { useMqttClientEvents };
