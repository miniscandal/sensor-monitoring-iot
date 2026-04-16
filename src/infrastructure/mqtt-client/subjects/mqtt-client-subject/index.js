import { ObserverRegistry } from '@infrastructure/mqtt-client/subjects/observer-registry';


class MqttClientSubject {
    constructor(ObserverRegistry) {
        this.observers = new Set();
        this.observerRegistry = ObserverRegistry;
    }

    subscribe({ entity, instanceId, listener }) {
        const observerId = crypto.randomUUID();
        const observerReg = {
            id: observerId,
            listener,
        };

        this.observers.add(observerReg);

        this.observerRegistry.register({
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

    notifyObservers({ entity, instanceId, actions, data }) {
        console.log({ entity, instanceId, actions, data });

        const observerIds = this.observerRegistry.getObserverIds({ entity, instanceId }) || [];

        console.log('ids', observerIds);

        this.observers.forEach(observer => {
            if (!observerIds.includes(observer.id)) {

                return;
            }
            observer.listener({ actions, data });
        });
    }
}

const mqttClientSubject = new MqttClientSubject(new ObserverRegistry());

export { mqttClientSubject };
