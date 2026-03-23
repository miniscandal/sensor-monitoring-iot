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
        this.client.on(MQTT_CLIENT_EVENT_CONNECT, this.onConnect);
        this.client.on(MQTT_CLIENT_EVENT_OFFLINE, this.onOffline);
        this.client.on(MQTT_CLIENT_EVENT_MESSAGE, this.onMessage);
        this.client.on(MQTT_CLIENT_EVENT_ERROR, (err) => console.error('MQTT error:', err));
    }

    static getInstance() {
        if (!MqttClientSingleton.instance) {
            MqttClientSingleton.instance = new MqttClientSingleton();
        }

        return MqttClientSingleton.instance;
    }

    onConnect() {
        mqttClientEventSubject.notify({
            entity: 'mqttEvents',
            value: MQTT_CLIENT_EVENT_CONNECT,
            actions: {
                ...MqttClientSingleton.getInstance(),
            },
        });
    };

    onOffline() {
        mqttClientEventSubject.notify({
            entity: 'mqttEvents',
            value: MQTT_CLIENT_EVENT_OFFLINE,
            actions: {
                ...MqttClientSingleton.getInstance(),
            },
        });
    };

    onMessage(topic, message) {
        const parseMessage = JSON.parse(message.toString());

        mqttClientEventSubject.notify({
            entity: 'statusCodes',
            value: parseMessage.statusCode,
            data: {
                topic,
                deviceId: topic.split('/').at(-2),
                message: parseMessage,
            },
        });
    };

    subscribe = (topic) => {
        this.client.subscribe(topic, () => {
            mqttClientEventSubject.notify({
                entity: 'mqttEvents',
                value: MQTT_CLIENT_EVENT_SUBSCRIBE,
                actions: {
                    ...MqttClientSingleton.getInstance(),
                },
                data: {
                    topic,
                },
            });
        });

        this.client.subscribe(topic, () => {
            mqttClientEventSubject.notify({
                entity: 'mqttEvents',
                value: topic,
                actions: {
                    ...MqttClientSingleton.getInstance(),
                },
                data: {
                    topic,
                },
            });
        });
    };

    getClientProperties = () => {
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

    publish = ({ topic, data }) => {
        this.client.publish(topic, JSON.stringify(data));
    };

    end = () => {
        this.client.end();
    };
}

export { MqttClientSingleton };
