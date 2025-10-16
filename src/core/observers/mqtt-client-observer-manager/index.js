class MqttClientObserverManager {
    constructor() {
        this.observers = new Set();
    }

    subscribe(observer) {
        this.observers.add(observer);
    }

    unsubscribe(observer) {
        this.observers.delete(observer);
    }

    notify(event, payload) {
        this.observers.forEach(observer => observer(event, payload));
    }
}

const mqttClientObserverManager = new MqttClientObserverManager();

export { mqttClientObserverManager };
