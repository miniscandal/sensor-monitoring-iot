import { useState, useEffect } from 'preact/hooks';

import { MqttClientSingleton } from '@core-services/mqtt-client';

import { statusConnectedSensor } from '@shared-constants/mqttt-client-status-codes';
import { publishRequestConnectedSensors } from '@shared-constants/mqtt-client-publish';
import { OBSERVER_ID_CONNECTED_SENSOR } from '@shared-constants/observer-id';

function handleConnectedSensors({ data, setConnectedSensors }) {
	const { message } = data;
	const { sensorId, status } = message;

	if (status !== statusConnectedSensor) {
		return;
	}

	setConnectedSensors(prevState => {
		const isNewSensor = prevState.some(item => item.sensorId === sensorId);

		return isNewSensor ? prevState : [...prevState, message];
	});
};

function useConnectedSensors() {
	const [connectedSensors, setConnectedSensors] = useState([]);

	useEffect(() => {
		const client = MqttClientSingleton.getInstance();
		client.publish(publishRequestConnectedSensors);

		const observer = (argument: ) => {
			handleConnectedSensors({ data, setConnectedSensors });
		};

		client.addObserver(OBSERVER_ID_CONNECTED_SENSOR, observer);
	}, []);

	return [connectedSensors];
}

export { useConnectedSensors };
