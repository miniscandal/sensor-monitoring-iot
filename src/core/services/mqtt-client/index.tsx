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
import { DEVICE_STATUS_CODE_CONNECTED, DEVICE_STATUS_CODE_REPORTED_PARAMETERS } from '@shared-constants/mqttt-client-status-codes';
import { OBS_ID_CONNECTED_DEVICE } from '@shared-custom-hooks/use-connected-devices/constants/observer-id';
import { OBS_ID_DEVICE_PARAMETERS_READING } from '@shared-custom-hooks/use-device-parameters-reading/constants/observer-id';

class MqttClientSingleton {
	static instance: MqttClientSingleton;

	private client: mqtt.MqttClient;
	private observers: ObserverType[] = [];
	private subscribePriveTopic: boolean = false;
	private envPrivateTopic: string = import.meta.env.VITE_MQTT_PRIVATE_TOPIC;

	constructor(client: mqtt.MqttClient) {
		if (MqttClientSingleton.instance) {

			return MqttClientSingleton.instance;
		}

		this.client = client;
		this.onConnect = this.onConnect.bind(this);
		this.onMessage = this.onMessage.bind(this);
		this.onReconnect = this.onReconnect.bind(this);
		this.configureClient();
	}

	static getInstance() {
		if (!MqttClientSingleton.instance) {
			const mqttConnect = mqtt.connect(import.meta.env.VITE_MQTT_BROKER);
			MqttClientSingleton.instance = new MqttClientSingleton(mqttConnect);
		}

		return MqttClientSingleton.instance;
	}

	protected observerNotify(observerId: string, data: ObserverDataType) {
		this.observers.forEach(observer => observer(observerId, data));
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

	private onReconnect() {
		const clientProperties = this.getClientProperties();
		this.observerNotify(OBS_ID_MQTT_CLIENT_PROPS, clientProperties);
	}

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

	private onMessage(topic: string, message: string | Buffer) {
		const messageString = message.toString();
		this.handleOnMessage(JSON.parse(messageString));
	}

	private onConnect() {
		const clientProperties = this.getClientProperties();
		this.observerNotify(OBS_ID_MQTT_CLIENT_PROPS, clientProperties);
		this.subscribe(this.envPrivateTopic);
	}

	private configureClient() {
		this.client.on('connect', this.onConnect);
		this.client.on('message', this.onMessage);
		this.client.on('reconnect', this.onReconnect);
	}

	subscribe(topic: string) {
		this.client.subscribe(topic, (error: Error) => {
			if (error) {
				console.error(`Error subscribe to topic ${topic}:`, error);

				return;
			}
			this.subscribePriveTopic = true;
			const clientProperties = this.getClientProperties();
			this.observerNotify(OBS_ID_MQTT_CLIENT_PROPS, clientProperties);
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
		const data = JSON.stringify({ ...message });
		this.client.publish(topic, data);
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
