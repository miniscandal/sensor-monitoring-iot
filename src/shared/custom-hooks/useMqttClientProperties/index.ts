import { useState, useEffect } from 'preact/hooks';

import { MqttClientSingleton } from '@core-services/mqtt-client';

import { clientMqtt } from '@shared-constants/mqtt-client-properties';
import { host } from '@shared-constants/mqtt-client-properties';
import { protocol } from '@shared-constants/mqtt-client-properties';
import { subscribe } from '@shared-constants/mqtt-client-properties';
import { port } from '@shared-constants/mqtt-client-properties';
import { clientId } from '@shared-constants/mqtt-client-properties';
import { connected } from '@shared-constants/mqtt-client-properties';

import { statusConnectedClient } from '@shared-constants/mqttt-client-status-codes';

function handleMqttClientProperties({ data, properties, setProperties }) {
	const { message } = data;
	const { status } = message;

	if (status !== statusConnectedClient) {
		return;
	}

	setProperties(prevState => {
		return {
			...prevState,
			...properties
		};
	});
};

function useMqttClientProperties() {
	const [properties, setProperties] = useState({
		clientMqtt,
		clientId,
		host,
		protocol,
		subscribe,
		port,
		connected: connected
	});

	useEffect(() => {
		const client = MqttClientSingleton.getInstance();
		const observer = ({ data, properties }) => {
			handleMqttClientProperties({ data, properties, setProperties });
		};
		client.addObserver(observer);
	}, []);

	return [properties];
}

export { useMqttClientProperties };
