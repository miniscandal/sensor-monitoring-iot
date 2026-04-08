class MqttClientMockAdapter {
    constructor() {
        this.eventTarget = new EventTarget();
    }

    connect() {
        this.connected = true;
        this.eventTarget.dispatchEvent(new CustomEvent('connect'));
    }

    subscribe(topic, callback) {
        callback();
    }

    publish(topic, message) {
        this.eventTarget.dispatchEvent(new CustomEvent('message', {
            detail: { topic, message },
        }));
    }

    end() {
        this.eventTarget.dispatchEvent(new CustomEvent('offline'));
    }

    on(event, handler) {
        this.eventTarget.addEventListener(event, (e) => handler(e.detail?.topic, e.detail?.message));
    }

    getClientProperties() {

        return {
            clientMqtt: 'MockConnected',
            host: 'mock-host',
            port: 1883,
            protocol: 'mock',
            clientId: 'mock-client',
            connected: this.connected,
        };
    }
}

export { MqttClientMockAdapter };
