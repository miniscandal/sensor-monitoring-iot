/**
 * Module responsibility
 * 
 */

import mqtt from 'mqtt';

import { mqttClientEventSubject } from '@core-services/mqtt-client-event-subject';

import {
    MQTT_CLIENT_EVENT_CONNECT,
    MQTT_CLIENT_EVENT_OFFLINE,
    MQTT_CLIENT_EVENT_SUBSCRIBE,
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_ERROR,
} from '@shared-constants/mqtt-client-events';

import { MQTT_CLIENT_STATUS_SUBSCRIBE_PRIVATE_TOPIC } from '@shared-constants/mqtt-client-status-codes';


class MqttClientSingleton {
    static instance;

    client;

    constructor() {
        this.client = mqtt.connect(import.meta.env.VITE_MQTT_BROKER);
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

    onConnect = () => {
        mqttClientEventSubject.notify({
            state: 'CONNECTED',
            data: {
                event: MQTT_CLIENT_EVENT_CONNECT,
                mqttClientProperties: this.getClientProperties(),
                actions: {
                    subscribe: (topic) => this.subscribe(topic),
                },
            },
            meta: {
                timestamp: Date.now(),
            },
        });
    };

    onOffline = () => {
        mqttClientEventSubject.notify({
            state: 'OFFLINE',
            data: {
                event: MQTT_CLIENT_EVENT_OFFLINE,
                mqttClientProperties: this.getClientProperties(),
            },
            meta: {
                timestamp: Date.now(),
            },
        });
    };

    onMessage = (topic, message) => {
        mqttClientEventSubject.notifyByStatusCode({
            data: {
                event: MQTT_CLIENT_EVENT_MESSAGE,
                topic,
                message: JSON.parse(message.toString()),
            },
        });
    };

    subscribe(topic) {
        this.client.subscribe(topic, (error) => {
            if (error) {
                console.error(`Error subscribe to topic ${topic}:`, error);

                return;
            }

            mqttClientEventSubject.notifyByOperationCode({
                state: 'SUBSCRIBE',
                data: {
                    event: MQTT_CLIENT_EVENT_SUBSCRIBE,
                    operationCode: MQTT_CLIENT_STATUS_SUBSCRIBE_PRIVATE_TOPIC,
                    topic,
                    actions: {
                        publish: ({ topic, data }) => this.publish({ topic, data }),
                    },
                },
                meta: {
                    timestamp: Date.now(),
                },
            });
        });
    }

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
    }

    publish({ topic, data }) {
        this.client.publish(topic, JSON.stringify(data));
    }

    end() {
        this.client.end();
    }
}

export { MqttClientSingleton };
