import { MqttClientSingleton } from '@core-services/mqtt-client';
import { useEffect, useState } from 'preact/hooks';

function handleOnMessages({ data, setMessageList }) {
	setMessageList(prevState => {
		return [
			...prevState,
			data
		]
	})
}

function useOnMessages() {
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		const client = MqttClientSingleton.getInstance();
		const observer = ({ data }) => {
			handleOnMessages({ data, setMessageList });
		};
		client.addObserver(observer);
	}, []);

	return [messageList];
}

export { useOnMessages };
