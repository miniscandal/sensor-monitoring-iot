// import { useEffect } from 'preact/compat';
// import { useSignal } from '@preact/signals';

// import { MqttClientSingleton } from '@core-services/mqtt-client';

// function handleReadingSensorParameters({ currentSensorId, data, signalHumidity, signalTemperature }) {
// 	const { message } = data;
// 	const { sensorId, status, humidity, temperature } = message;

// 	if (status !== 0 || sensorId !== currentSensorId) {
// 		return;
// 	}

// 	signalHumidity.value = humidity;
// 	signalTemperature.value = temperature;
// }

// function useReadingSensorParameters({ sensorId }) {
// 	const signalHumidity = useSignal(0);
// 	const signalTemperature = useSignal(0);

// 	useEffect(() => {
// 		const client = MqttClientSingleton.getInstance();
// 		const observer = ({ data }) => {
// 			handleReadingSensorParameters({
// 				currentSensorId: sensorId,
// 				data,
// 				signalHumidity,
// 				signalTemperature
// 			});
// 		};
// 		client.addObserver(observer);
// 	}, []);

// 	return { humidity: signalHumidity, temperature: signalTemperature };
// }

// export { useReadingSensorParameters }
