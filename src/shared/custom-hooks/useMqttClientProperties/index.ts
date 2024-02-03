/**
 * Module responsibility
 * 
 */

import { useState, useEffect } from 'preact/hooks';

import { MqttClientSingleton } from '@core-services/mqtt-client';

import { ObserverArgumentType } from '@core-services/mqtt-client/types/observer-argument';
import { ClientMqttPropertiesType } from '@core-services/mqtt-client/types/client-mqtt-properties';
import { ObserverType } from '@core-services/mqtt-client/types/observer';

import { CLIENT_MQTT_PROPERTIES } from '../../../core/services/mqtt-client/constants/client-mqtt-properties';
import { OBSERVER_ID_MQTT_CLIENT_PROPERTIES } from './constants/observer-id';

function observerOnConnectCallback(
	observerId: string, argument: ObserverArgumentType, setProperties,
) {
	if (observerId !== OBSERVER_ID_MQTT_CLIENT_PROPERTIES) {

		return;
	}
	setProperties((prevState: ClientMqttPropertiesType) => {
		return {
			...prevState,
			...(argument as ClientMqttPropertiesType),
		};
	});
}

function useMqttClientProperties() {
	const [properties, setProperties] = useState(CLIENT_MQTT_PROPERTIES);

	useEffect(() => {
		const client = MqttClientSingleton.getInstance();
		const observerOnConnect: ObserverType = (observerId, argument) => {
			observerOnConnectCallback(observerId, argument, setProperties);
		};
		client.addObserver(observerOnConnect);
	}, []);

	return properties;
}

export { useMqttClientProperties };
