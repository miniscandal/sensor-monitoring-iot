import { useEffect } from 'preact/hooks';

import { mqttClientEventSubject } from '@core-mqtt/client-event-subject';


function useMqttClientEvents({ entity, value, listener }) {
    useEffect(() => {
        const observerId = mqttClientEventSubject.subscribe({
            entity,
            value,
            listener,
        });


        return () => mqttClientEventSubject.unsubscribe(observerId);
    }, [entity, value, listener]);
}

export { useMqttClientEvents };
