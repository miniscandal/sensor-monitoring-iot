import { useEffect } from 'preact/hooks';

import { mqttClientEventSubject } from '@core-services/mqtt-client-event-subject';


function useMqttClientEvents({ events, statusCodes, operationCodes, listener }) {
    useEffect(() => {
        const observerId = mqttClientEventSubject.subscribe({
            events,
            statusCodes,
            operationCodes,
            listener,
        });


        return () => mqttClientEventSubject.unsubscribe(observerId);
    }, []);
}

export { useMqttClientEvents };
