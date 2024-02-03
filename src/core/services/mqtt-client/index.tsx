/**
 * Module responsibility
 * 
 */

import mqtt from 'mqtt';

import { ObserverType } from './types/observer';
import { MessagePublishType } from './types/messages-publish';
import { ObserverArgumentType } from './types/observer-argument';
import { ClientMqttPropertiesType } from './types/client-mqtt-properties';

import { OBSERVER_ID_MQTT_CLIENT_PROPERTIES } from '@shared-custom-hooks/useMqttClientProperties/constants/observer-id';

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

	protected observerNotify(observerId: string, argument: ObserverArgumentType) {
		this.observers.forEach(observer => observer(observerId, argument));
	}

	protected getClientProperties(): ClientMqttPropertiesType {
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
		const mqttClientProperties = this.getClientProperties();
		this.observerNotify(OBSERVER_ID_MQTT_CLIENT_PROPERTIES, mqttClientProperties);
	}

	private onMessage(topic: string, message: string | Buffer) {
		const messageString = message.toString();
		this.observerNotify(OBSERVER_ID_MQTT_CLIENT_PROPERTIES, JSON.parse(messageString));
	}

	private onConnect() {
		const mqttClientProperties = this.getClientProperties();
		this.observerNotify(OBSERVER_ID_MQTT_CLIENT_PROPERTIES, mqttClientProperties);
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
			const mqttClientProperties = this.getClientProperties();
			this.observerNotify(OBSERVER_ID_MQTT_CLIENT_PROPERTIES, mqttClientProperties);
		});
	}

	unsubscribe(topic: string) {
		this.client.unsubscribe(topic, (error: Error) => {
			if (error) {
				console.error(`Error unsubscribe to topic ${topic}:`, error);
			}
		});
	}

	publish(topic: string, message: MessagePublishType) {
		const argument = JSON.stringify({ ...message });
		this.client.publish(topic, argument);
	}

	end() {
		this.client.end();
	}

	addObserver(argument: ObserverType) {
		this.observers.push(argument);
	}

	removeObserver(argument: ObserverType) {
		this.observers = this.observers.filter(obs => obs !== argument);
	}
}

export { MqttClientSingleton };
