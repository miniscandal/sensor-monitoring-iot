import { useEffect } from 'preact/hooks';

import { mqttClientEventSubject } from '@core-services/mqtt-client-event-subject';


function useMqttClientEventSubjectSubscribe({ events, statusCodes, operationCodes, observer }) {
    useEffect(() => {
        mqttClientEventSubject.subscribe({
            events,
            statusCodes,
            operationCodes,
            observer,
        });


        return () => mqttClientEventSubject.unsubscribe(observer);
    }, []);
}

export { useMqttClientEventSubjectSubscribe };
