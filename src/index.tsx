import { useEffect } from 'preact/hooks';
import { render } from 'preact';

import { MqttClientSingleton } from '@core-services/mqtt-client';

import { Header } from '@shared-components/organisms/header';

import { FeatMqttClientInformation } from './feat-mqtt-client-properties';
import { FeatSensorMonitoring } from './feat-show-sensor-monitoring';
import { FeatSensorDataLogging } from './feat-registered-data-on-listen-sensor';

import './style.css';

export function App() {
	useEffect(() => {
		const client = MqttClientSingleton.getInstance();

		return () => client.end();
	}, []);

	return (
		<>
			<Header />
			<main>
				<article>
					<FeatMqttClientInformation />
				</article>
				<article>
					<FeatSensorMonitoring />
				</article>
				<article>
					<FeatSensorDataLogging />
				</article>
			</main>
		</>
	);
}

render(<App />, document.getElementById('app'));
