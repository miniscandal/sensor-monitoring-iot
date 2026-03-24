/**
 * Module responsibility
 * 
 */

import mqtt from 'mqtt';

import { mqttClientEventSubject } from '@core-mqtt/client-event-subject';

import {
    MQTT_CLIENT_EVENT_CONNECT,
    MQTT_CLIENT_EVENT_OFFLINE,
    MQTT_CLIENT_EVENT_SUBSCRIBE,
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_ERROR,
} from '@shared-constants/mqtt-client-events';


class MqttClientSingleton {
    static instance;

    mqttBrokerHost = import.meta.env.VITE_MQTT_BROKER_HOST;
    mqttBrokerPort = import.meta.env.VITE_MQTT_BROKER_PORT;


    constructor() {
        this.client = mqtt.connect(`${this.mqttBrokerHost}/${this.mqttBrokerPort}`);
        this.client.on(MQTT_CLIENT_EVENT_CONNECT, this.onConnect.bind(this));
        this.client.on(MQTT_CLIENT_EVENT_OFFLINE, this.onOffline.bind(this));
        this.client.on(MQTT_CLIENT_EVENT_MESSAGE, this.onMessage.bind(this));
        this.client.on(MQTT_CLIENT_EVENT_ERROR, (err) => console.error('MQTT error:', err));
    }

    static getInstance() {
        if (!MqttClientSingleton.instance) {
            MqttClientSingleton.instance = new MqttClientSingleton();
        }

        return MqttClientSingleton.instance;
    }

    #notify(entity, id, actions, data) {

        mqttClientEventSubject.notify({
            entity,
            id,
            actions,
            data,
        });
    }

    onConnect() {
        this.#notify('mqttEvents', MQTT_CLIENT_EVENT_CONNECT, {
            getClientProperties: this.getClientProperties.bind(this),
            subscribe: this.subscribe.bind(this),
        });
    };

    onOffline() {
        this.#notify('mqttEvents', MQTT_CLIENT_EVENT_OFFLINE, {
            getClientProperties: this.getClientProperties.bind(this),
        });
    };

    onMessage(topic, message) {
        const parseMessage = JSON.parse(message.toString());
        const data = {
            topic,
            deviceId: topic.split('/').at(-2),
            message: parseMessage,
        };


        this.#notify('statusCodes', parseMessage.statusCode, null, data);
        this.#notify('mqttEvents', MQTT_CLIENT_EVENT_MESSAGE, null, data);
    };

    subscribe(topic) {
        this.client.subscribe(topic, () => {
            const data = { topic };


            this.#notify('mqttEvents', MQTT_CLIENT_EVENT_SUBSCRIBE, {
                subscribe: this.subscribe.bind(this),
            }, data);
            this.#notify('topics', topic, { publish: this.publish.bind(this) }, data);
        });
    };

    getClientProperties() {
        const { connected, options } = this.client;
        const { clientId, host, port, protocol } = options;


        return {
            clientMqtt: connected ? 'Connected' : undefined,
            host,
            port,
            protocol,
            clientId,
            connected,
        };
    };

    publish({ topic, data }) {
        this.client.publish(topic, JSON.stringify(data));
    };

    end() {
        this.client.end();
    };
}

export { MqttClientSingleton };
