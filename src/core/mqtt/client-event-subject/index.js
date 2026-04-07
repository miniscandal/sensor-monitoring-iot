import { ObserverRegistry } from '@core-mqtt/observer-registry';


class MqttClientEventSubject {
    constructor(ObserverRegistry) {
        this.observers = new Set();
        this.ObserverRegistry = ObserverRegistry;
    }

    subscribe({ entity, instanceId, listener }) {
        const observerId = crypto.randomUUID();
        const observerReg = {
            id: observerId,
            listener,
        };
        this.observers.add(observerReg);

        this.ObserverRegistry.register({
            entity,
            instanceId,
            observerId,
        });

        return observerId;
    }

    unsubscribe(observerId) {
        for (const observer of this.observers) {
            if (observer.id === observerId) {
                this.observers.delete(observer);
                break;
            }
        }
    }

    notify({ entity, instanceId, actions, data }) {
        console.log({ entity, instanceId, actions, data });

        const observerIds = this.ObserverRegistry.getObserverIds({ entity, instanceId }) || [];


        console.log('ids', observerIds);


        this.observers.forEach(observer => {
            if (!observerIds.includes(observer.id)) {

                return;
            }
            observer.listener({ actions, data });
        });
    }
}

const mqttClientEventSubject = new MqttClientEventSubject(new ObserverRegistry());

export { mqttClientEventSubject };
