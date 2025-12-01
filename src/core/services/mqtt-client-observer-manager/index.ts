import { MQTT_CLIENT_MESSAGE_TRACKING } from '@shared-constants/mqtt-client-permissions';


class MqttClientObserverManager {
    constructor() {
        this.observers = new Set();
        this.mqttClientEvent = {
            connect: new Set(),
            offline: new Set(),
            subscribe: new Set(),
            message: new Set(),
        };
    }

    subscribe({ events, statusCodes, observer }) {
        const observerReg = {
            id: crypto.randomUUID(),
            fn: observer,
            statusCodes: new Set(statusCodes),
        };
        this.observers.add(observerReg);

        events.forEach(event => {
            if (this.mqttClientEvent[event]) {
                this.mqttClientEvent[event].add(observerReg.id);
            }
        });

        return observerReg.id;
    }

    unsubscribe(id) {
        for (const obs of this.observers) {
            if (obs.id === id) {
                this.observers.delete(obs);
                for (const eventName in this.mqttClientEvent) {
                    this.mqttClientEvent[eventName].delete(id);
                }
                break;
            }
        }
    }

    notifyStatusCode(event, message) {
        const observerIds = this.mqttClientEvent[event];

        console.log('method', 'notifyStatusCode');
        console.log('event', event);
        console.log('message', message);

        this.observers.forEach(observer => {
            if (!observerIds.has(observer.id)) {

                return;
            }

            if (!observer.statusCodes.has(message.statusCode) && !observer.statusCodes.has(MQTT_CLIENT_MESSAGE_TRACKING)) {

                return;
            }
            observer.fn(event, message);
        });
    }

    notify(event, message) {
        const observerIds = this.mqttClientEvent[event];

        console.log('method', 'notify');
        console.log('event', event);
        console.log('message', message);

        this.observers.forEach(observer => {
            if (!observerIds.has(observer.id)) {

                return;
            }
            observer.fn(event, message);
        });
    }
}

const mqttClientObserverManager = new MqttClientObserverManager();

export { mqttClientObserverManager };
