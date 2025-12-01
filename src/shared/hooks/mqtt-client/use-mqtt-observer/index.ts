import { useEffect } from 'preact/hooks';

import { mqttClientObserverManager } from '@core-services/mqtt-client-observer-manager';


function useMQTTObserver({ events, statusCodes, observer }) {
    useEffect(() => {
        mqttClientObserverManager.subscribe({
            events,
            statusCodes,
            observer,
        });


        return () => mqttClientObserverManager.unsubscribe(observer);
    }, []);
}

export { useMQTTObserver };
