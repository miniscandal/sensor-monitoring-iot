/**
 * Module responsibility
 * 
 */

import mqtt from 'mqtt';

import { mqttClientEventSubject } from '@core-services/mqtt-client-event-subject';

import { MQTT_CLIENT_EVENT_CONNECT } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_SUBSCRIBE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_ERROR } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_PACKETSEND } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_PACKETRECEIVE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_RECONNECT } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_CLOSE } from '@shared-constants/mqtt-client-events';


class MqttClientConnectionSingleton {
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

        this.client.on(MQTT_CLIENT_EVENT_PACKETSEND, this.onPacketSend);
        this.client.on(MQTT_CLIENT_EVENT_PACKETRECEIVE, this.onPacketReceive);
    }

    static getInstance() {
        if (!MqttClientConnectionSingleton.instance) {
            MqttClientConnectionSingleton.instance = new MqttClientConnectionSingleton();
        }

        return MqttClientConnectionSingleton.instance;
    }

    private onConnect = () => {
        mqttClientEventSubject.notify(
            MQTT_CLIENT_EVENT_CONNECT,
            {
                mqttClientProperties: this.getClientProperties(),
            },
        );
        this.subscribe(this.envPrivateTopic);
    };

    private onOffline = () => {
        mqttClientEventSubject.notify(
            MQTT_CLIENT_EVENT_OFFLINE,
            {
                mqttClientProperties: this.getClientProperties(),
            },
        );
        this.shouldSubscribeToPrivateTopic = false;
    };

    private onPacketSend = (packet) => {
        console.debug('[MQTT] Packet sent:', packet.cmd, packet);
    };

    private onPacketReceive = (packet) => {
        console.debug('[MQTT] Packet received:', packet.cmd, packet);
    };

    private onReconnect = () => {
        console.warn('[MQTT] Attempting to reconnect to broker...');
    };

    private onClose = () => {
        console.error('[MQTT] Connection closed. Client is no longer connected to broker.');
    };

    private onMessage = (topic, message) => {
        mqttClientEventSubject.notifyStatusCode(
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

            mqttClientEventSubject.notify(
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

export { MqttClientConnectionSingleton };
