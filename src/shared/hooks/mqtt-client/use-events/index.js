/**
 * Hook to manage MQTT events using the Observer pattern.
 * An empty dependency array is used in useEffect because the observers 
 * are considered static for the lifecycle of this component.
 */


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export { useMqttClientEvents };
