import { MqttClientSingleton } from '@core-services/mqtt-client';
import { ObserverType } from '@core-services/mqtt-client/types/observer';
import { ObserverDataType } from '@core-services/mqtt-client/types/observer-data';
import { useEffect, useState } from 'preact/hooks';


function observerCallback(
	observerId: string, data: ObserverDataType, setMessageList,
) {
	setMessageList(prevState => {
		return [
			...prevState,
			data,
		];
	});
}

function useDataTracking() {
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		const client = MqttClientSingleton.getInstance();
		const observer: ObserverType = (observerId, data) => {
			observerCallback(observerId, data, setMessageList);
		};

		client.addObserver(observer);
	}, []);

	return { messageList };
}

export { useDataTracking };
