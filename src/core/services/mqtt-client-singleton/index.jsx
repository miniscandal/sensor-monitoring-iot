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
    MQTT_CLIENT_EVENT_PACKETSEND,
    MQTT_CLIENT_EVENT_PACKETRECEIVE,
    MQTT_CLIENT_EVENT_RECONNECT,
    MQTT_CLIENT_EVENT_CLOSE,
} from '@shared-constants/mqtt-client-events';

import { MQTT_CLIENT_STATUS_SUBSCRIBE_PRIVATE_TOPIC } from '@shared-constants/mqtt-client-status-codes';


class MqttClientSingleton {
    static instance;

    client;
    shouldSubscribeToPrivateTopic = false;
    envPrivateTopic = import.meta.env.VITE_MQTT_TOPIC_MONITOR_ALL;

    constructor() {
        /*
        LWT Example
        
        this.client = mqtt.connect(import.meta.env.VITE_MQTT_BROKER, {
            clientId: 'anime',
            will: {
                topic: import.meta.env.VITE_MQTT_TOPIC_MONITOR_ALL,
                payload: 'offline',
                qos: 1,
                retain: true,
            },
        });
        */
        this.client = mqtt.connect(import.meta.env.VITE_MQTT_BROKER);
        this.client.on(MQTT_CLIENT_EVENT_RECONNECT, this.onReconnect);
        this.client.on(MQTT_CLIENT_EVENT_CONNECT, this.onConnect);
        this.client.on(MQTT_CLIENT_EVENT_CLOSE, this.onClose);
        this.client.on(MQTT_CLIENT_EVENT_OFFLINE, this.onOffline);
        this.client.on(MQTT_CLIENT_EVENT_MESSAGE, this.onMessage);
        this.client.on(MQTT_CLIENT_EVENT_ERROR, (err) => console.error('MQTT error:', err));

        this.client.on(MQTT_CLIENT_EVENT_PACKETSEND, this.onPacketSend);
        this.client.on(MQTT_CLIENT_EVENT_PACKETRECEIVE, this.onPacketReceive);
    }

    static getInstance() {
        if (!MqttClientSingleton.instance) {
            MqttClientSingleton.instance = new MqttClientSingleton();
        }

        return MqttClientSingleton.instance;
    }

    onConnect = () => {
        mqttClientEventSubject.notify(
            MQTT_CLIENT_EVENT_CONNECT,
            {
                mqttClientProperties: this.getClientProperties(),
            },
        );
        this.subscribe(this.envPrivateTopic);
    };

    onOffline = () => {
        mqttClientEventSubject.notify(
            MQTT_CLIENT_EVENT_OFFLINE,
            {
                mqttClientProperties: this.getClientProperties(),
            },
        );
        this.shouldSubscribeToPrivateTopic = false;
    };

    onPacketSend = (packet) => {
        console.debug('[MQTT] Packet sent:', packet.cmd, packet);
    };

    onPacketReceive = (packet) => {
        console.debug('[MQTT] Packet received:', packet.cmd, packet);
    };

    onReconnect = () => {
        console.warn('[MQTT] Attempting to reconnect to broker...');
    };

    onClose = () => {
        console.error('[MQTT] Connection closed. Client is no longer connected to broker.');
    };

    onMessage = (topic, message) => {
        mqttClientEventSubject.notifyStatusCode(
            MQTT_CLIENT_EVENT_MESSAGE,
            JSON.parse(message.toString()),
        );
    };

    subscribe(topic) {
        this.client.subscribe(topic, (error) => {
            if (error) {
                console.error(`Error subscribe to topic ${topic}:`, error);

                return;
            }

            this.shouldSubscribeToPrivateTopic = true;

            mqttClientEventSubject.notifyByOperationCode(
                MQTT_CLIENT_EVENT_SUBSCRIBE,
                MQTT_CLIENT_STATUS_SUBSCRIBE_PRIVATE_TOPIC,
                {
                    mqttClient: MqttClientSingleton.getInstance(),
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


    publishIoTDeviceTopic(operationCode) {
        this.client.publish(import.meta.env.VITE_MQTT_TOPIC_CONTROLLER_ALL, JSON.stringify({
            operationCode,
        }));
    }

    end() {
        this.client.end();
    }
}

export { MqttClientSingleton };
