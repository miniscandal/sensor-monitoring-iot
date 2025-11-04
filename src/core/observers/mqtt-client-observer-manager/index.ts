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

    subscribe({ events = [], observer }) {
        const observerReg = {
            id: crypto.randomUUID(),
            fn: observer,
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

    notify(event, message) {
        const observerIds = this.mqttClientEvent[event];

        console.log('event', event);
        console.log('message', message);

        if (!observerIds) {

            return;
        }

        this.observers.forEach(observer => {
            if (observerIds.has(observer.id)) {
                observer.fn(event, message);
            }
        });
    }
}

const mqttClientObserverManager = new MqttClientObserverManager();

export { mqttClientObserverManager };
