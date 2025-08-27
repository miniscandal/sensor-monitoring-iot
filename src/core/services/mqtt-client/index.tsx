/**
 * Module responsibility
 * 
 */

import mqtt from 'mqtt';

import { ObserverType } from './types/observer';
import { PublicMessageToDeviceType } from './types/publish-message-to-device';
import { ObserverDataType } from './types/observer-data';
import { MqttClientPropertiesType } from './types/mqtt-client-properties';

import { ReceivedMessageByDeviceType } from './types/received-message-by-device';

import { OBS_ID_MQTT_CLIENT_PROPS } from '@shared-custom-hooks/use-mqtt-client-properties/constants/observer-id';
import { DEVICE_STATUS_CODE_CONNECTED } from '@shared-constants/mqttt-client-status-codes';
import { DEVICE_STATUS_CODE_REPORTED_PARAMETERS } from '@shared-constants/mqttt-client-status-codes';
import { OBS_ID_CONNECTED_DEVICE } from '@shared-custom-hooks/use-connected-devices/constants/observer-id';
import { OBS_ID_DEVICE_PARAMETERS_READING } from '@shared-custom-hooks/use-device-parameters-reading/constants/observer-id';

class MqttClientSingleton {
    private static instance: MqttClientSingleton;

    private client: mqtt.MqttClient;
    private observers: ObserverType[] = [];
    private subscribePriveTopic: boolean = false;
    private envPrivateTopic: string = import.meta.env.VITE_MQTT_PRIVATE_TOPIC;

    private constructor(client: mqtt.MqttClient) {
        this.client = client;
        this.configureClient();
    }

    static getInstance(): MqttClientSingleton {
        if (!MqttClientSingleton.instance) {
            const mqttConnect = mqtt.connect(import.meta.env.VITE_MQTT_BROKER);
            MqttClientSingleton.instance = new MqttClientSingleton(mqttConnect);
        }

        return MqttClientSingleton.instance;
    }

    protected observerNotify(observerId: string, data: ObserverDataType) {
        this.observers.forEach(observer => {
            try {
                observer(observerId, data);
            } catch (err) {
                console.error('Observer execution error: ', err);
            }
        });
    }

    protected getClientProperties(): MqttClientPropertiesType {
        const { connected, options } = this.client;
        const { clientId, host, port, protocol } = options;

        return {
            clientMqtt: connected ? 'Connected' : undefined,
            clientId,
            host,
            port,
            protocol,
            subscribe: this.subscribePriveTopic ? this.envPrivateTopic : undefined,
            connected,
        };
    }

    private onReconnect = () => {
        this.observerNotify(OBS_ID_MQTT_CLIENT_PROPS, this.getClientProperties());
    };

    private handleOnMessage(message: ReceivedMessageByDeviceType) {
        switch (message.status_code) {
            case DEVICE_STATUS_CODE_CONNECTED:
                this.observerNotify(OBS_ID_CONNECTED_DEVICE, message);
                break;
            case DEVICE_STATUS_CODE_REPORTED_PARAMETERS:
                this.observerNotify(OBS_ID_DEVICE_PARAMETERS_READING, message);
                break;
            default:
                break;
        }
    }

    private onMessage = (topic: string, message: string | Buffer) => {
        try {
            const parsed: ReceivedMessageByDeviceType = JSON.parse(message.toString());
            this.handleOnMessage(parsed);
        } catch (err) {
            console.error('Invalid MQTT message:', message.toString(), err);
        }
    };

    private onConnect = () => {
        this.observerNotify(OBS_ID_MQTT_CLIENT_PROPS, this.getClientProperties());
        this.subscribe(this.envPrivateTopic);
    };

    private configureClient() {
        this.client.on('connect', this.onConnect);
        this.client.on('message', this.onMessage);
        this.client.on('reconnect', this.onReconnect);
        this.client.on('error', (err) => console.error('MQTT error:', err));
        this.client.on('close', () => console.warn('MQTT connection closed'));
    }

    subscribe(topic: string) {
        this.client.subscribe(topic, (error: Error) => {
            if (error) {
                console.error(`Error subscribe to topic ${topic}:`, error);

                return;
            }
            this.subscribePriveTopic = true;
            this.observerNotify(OBS_ID_MQTT_CLIENT_PROPS, this.getClientProperties());
        });
    }

    unsubscribe(topic: string) {
        this.client.unsubscribe(topic, (error: Error) => {
            if (error) {
                console.error(`Error unsubscribe to topic ${topic}:`, error);
            }
        });
    }

    publish(topic: string, message: PublicMessageToDeviceType) {
        this.client.publish(topic, JSON.stringify(message));
    }

    end() {
        this.client.end();
    }

    addObserver(observer: ObserverType) {
        this.observers.push(observer);
    }

    removeObserver(observer: ObserverType) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
}

export { MqttClientSingleton };
