import { useEffect } from 'preact/hooks';

import { mqttClientEventSubject } from '@core-services/mqtt-client-event-subject';


function useMqttClientEventSubjectSubscribe({ events, statusCodes, observer }) {
    useEffect(() => {
        mqttClientEventSubject.subscribe({
            events,
            statusCodes,
            observer,
        });


        return () => mqttClientEventSubject.unsubscribe(observer);
    }, []);
}

export { useMqttClientEventSubjectSubscribe };
