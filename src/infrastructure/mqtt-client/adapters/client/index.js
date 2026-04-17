import mqtt from 'mqtt';

import {
    MQTT_BROKER_HOST,
    MQTT_BROKER_PORT,
} from '@infrastructure/mqtt-client/config/client-config';


class MqttClientAdapter {
    constructor() {
        this.client = mqtt.connect(`${MQTT_BROKER_HOST}/${MQTT_BROKER_PORT}`);
    }

    connect() {
        return this.client;
    }

    subscribe(topic, callback) {
        this.client.subscribe(topic, callback);
    }

    publish(topic, message) {
        this.client.publish(topic, JSON.stringify(message));
    }

    end() {
        this.client.end();
    }

    on(event, handler) {
        this.client.on(event, handler);
    }

    getClientProperties() {
        const { connected, options } = this.client;
        const { clientId, host, port, protocol } = options;


        return {
            clientMqtt: connected ? 'Connected' : null,
            host,
            port,
            protocol,
            clientId,
            connected,
        };
    }
}

export { MqttClientAdapter };
