/**
 * Module responsibility
 */

import mqtt from 'mqtt';

import { publishSubscribe } from '@shared-constants/mqtt-client-publish';
import { notifyConnected } from '@shared-constants/mqtt-client-notify';

class MqttClientSingleton {
	static instance: MqttClientSingleton;

	private client: mqtt.MqttClient
	private observers: any[] = [];

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
			MqttClientSingleton.instance = new MqttClientSingleton(mqtt.connect(import.meta.env.VITE_MQTT_BROKER));
		}

		return MqttClientSingleton.instance;
	}

	private configureClient() {
		this.client.on('connect', this.onConnect);
		this.client.on('message', this.onMessage);
		this.client.on('reconnect', this.onReconnect);
	}

	private onConnect() {
		this.observerNotify(notifyConnected);
		this.subscribe(publishSubscribe);
	}

	private onMessage(topic: string, message: string | Buffer) {
		if (typeof message !== 'string')
			return;

		const onMessage = { topic, message: JSON.parse(message) };
		this.observerNotify(onMessage);
	}

	private onReconnect() {
		this.observerNotify(notifyConnected);
	}

	end() {
		this.client.end();
	}

	publish({ topic, message }) {
		const data = JSON.stringify({ ...message });
		this.client.publish(topic, data);
	}

	subscribe({ topic = '', message = {} }) {
		this.client.subscribe(topic, (err) => {
			if (!err) {
				this.publish({ topic, message });
			}
		});
	}

	unsubscribe({ topic = '' }) {
		this.client.unsubscribe(topic, (err) => {
			if (!err) {
				return;
			}
		});
	}

	addObserver(observer) {
		this.observers.push({ observer });
	}

	removeObserver(observer) {
		this.observers = this.observers.filter(obs => obs !== observer);
	}

	protected retrieveClientProperties() {
		const { connected, options } = this.client;
		const { clientId, host, port, protocol } = options;

		return {
			clientMqtt: connected ? 'Connected' : 'Disconnecting',
			clientId,
			host,
			port,
			protocol,
			connected
		};
	}

	protected observerNotify(data) {
		this.observers.forEach(({ observer }) => {
			observer({ data, properties: this.retrieveClientProperties() })
		});
	}
}

export { MqttClientSingleton };
