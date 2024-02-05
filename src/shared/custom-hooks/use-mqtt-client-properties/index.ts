/**
 * Module responsibility
 * 
 */

import { useState, useEffect } from 'preact/hooks';

import { MqttClientSingleton } from '@core-services/mqtt-client';

import { ObserverDataType } from '@core-services/mqtt-client/types/observer-data';
import { MqttClientPropertiesType } from '@core-services/mqtt-client/types/mqtt-client-properties';
import { ObserverType } from '@core-services/mqtt-client/types/observer';

import { MQTT_CLIENT_PROPERTIES } from '@core-services/mqtt-client/constants/client-mqtt-properties';
import { OBS_ID_MQTT_CLIENT_PROPS } from './constants/observer-id';

function observerCallback(
	observerId: string, data: ObserverDataType, setProperties,
) {
	if (observerId !== OBS_ID_MQTT_CLIENT_PROPS) {

		return;
	}
	setProperties((prevState: MqttClientPropertiesType) => {
		return {
			...prevState,
			...(data as MqttClientPropertiesType),
		};
	});
}

function useMqttClientProperties() {
	const [properties, setProperties] = useState(MQTT_CLIENT_PROPERTIES);

	useEffect(() => {
		const client = MqttClientSingleton.getInstance();
		const observer: ObserverType = (observerId, data) => {
			observerCallback(observerId, data, setProperties);
		};
		client.addObserver(observer);
	}, []);

	return properties;
}

export { useMqttClientProperties };
