import { useEffect } from 'preact/hooks';

import { mqttClientObserverManager } from '@core-observers/mqtt-client-observer-manager';


function useMQTTObserver({ events, observer }) {
    useEffect(() => {
        mqttClientObserverManager.subscribe({
            events,
            observer,
        });


        return () => mqttClientObserverManager.unsubscribe(observer);
    }, []);
}

export { useMQTTObserver };
