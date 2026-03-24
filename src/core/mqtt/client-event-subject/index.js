import { RegisterObserver } from '@core-mqtt/register-observer';


class MqttClientEventSubject {
    constructor(registerObserver) {
        this.observers = new Set();
        this.registerObserver = registerObserver;
    }

    subscribe({ entity, id, listener }) {
        const observerId = crypto.randomUUID();
        const observerReg = {
            id: observerId,
            listener,
        };
        this.observers.add(observerReg);

        this.registerObserver.register({
            entity,
            id,
            observerId,
        });

        return observerId;
    }

    unsubscribe(id) {
        for (const observer of this.observers) {
            if (observer.id === id) {
                this.observers.delete(observer);
                break;
            }
        }
    }

    notify({ entity, id, actions, data }) {
        console.log({ entity, id, actions, data });

        const observerIds = this.registerObserver.getObserverId({ entity, id }) || [];


        this.observers.forEach(observer => {
            if (!observerIds.includes(observer.id)) {

                return;
            }
            observer.listener({ actions, data });
        });
    }
}

const mqttClientEventSubject = new MqttClientEventSubject(new RegisterObserver());

export { mqttClientEventSubject };
