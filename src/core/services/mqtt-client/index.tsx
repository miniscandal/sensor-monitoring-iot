/**
 * Module responsibility
 * 
 */

import mqtt from 'mqtt';

import { mqttClientObserverManager } from '@core-observers/mqtt-client-observer-manager';

import { MQTT_CLIENT_EVENT_CONNECT } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_RECONNECT } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_CLOSE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_SUBSCRIBE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_ERROR } from '@shared-constants/mqtt-client-events';


class MqttClientSingleton {
    private static instance;

    private client;
    private shouldSubscribeToPrivateTopic = false;
    private envPrivateTopic = import.meta.env.VITE_MQTT_PRIVATE_TOPIC;

    private constructor() {
        this.client = mqtt.connect(import.meta.env.VITE_MQTT_BROKER);
        this.client.on(MQTT_CLIENT_EVENT_RECONNECT, this.onReconnect);
        this.client.on(MQTT_CLIENT_EVENT_CONNECT, this.onConnect);
        this.client.on(MQTT_CLIENT_EVENT_CLOSE, this.onClose);
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

    private onConnect = () => {
        mqttClientObserverManager.notify(
            MQTT_CLIENT_EVENT_CONNECT,
            {
                mqttClientProperties: this.getClientProperties(),
            },
        );
        this.subscribe(this.envPrivateTopic);
    };

    private onClose = () => {
        mqttClientObserverManager.notify(
            MQTT_CLIENT_EVENT_CLOSE,
            {
                mqttClientProperties: this.getClientProperties(),
            },
        );
    };

    private onOffline = () => {
        mqttClientObserverManager.notify(
            MQTT_CLIENT_EVENT_OFFLINE,
            {
                mqttClientProperties: this.getClientProperties(),
            },
        );
    };

    private onReconnect = () => {
        mqttClientObserverManager.notify(
            MQTT_CLIENT_EVENT_RECONNECT,
            {
                mqttClientProperties: this.getClientProperties(),
            },
        );
    };

    private onMessage = (topic, message) => {
        mqttClientObserverManager.notify(
            MQTT_CLIENT_EVENT_MESSAGE,
            JSON.parse(message.toString()),
        );
    };

    private subscribe(topic) {
        this.client.subscribe(topic, (error) => {
            if (error) {
                console.error(`Error subscribe to topic ${topic}:`, error);

                return;
            }

            this.shouldSubscribeToPrivateTopic = true;

            mqttClientObserverManager.notify(
                MQTT_CLIENT_EVENT_SUBSCRIBE,
                {
                    topic,
                });
        });
    }

    protected getClientProperties() {
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

    end() {
        this.client.end();
    }
}

export { MqttClientSingleton };
