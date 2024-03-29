/**
 * Module responsibility
 * 
 */

import { render } from 'preact';
import { useEffect } from 'preact/hooks';

import { MqttClientSingleton } from '@core-services/mqtt-client';

import { Header } from '@shared-components/organisms/header';

import { FeatMqttClientProperties } from './feat-mqtt-client-properties';
import { FeatConnectedDeviceMonitoring } from './feat-connected-devices-monitoring';
import { FeatDataTracking } from './feat-device-data-tracking';

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
					<FeatMqttClientProperties />
				</article>
				<article>
					<FeatConnectedDeviceMonitoring />
				</article>
				<article>
					<FeatDataTracking />
				</article>
			</main>
		</>
	);
}

// @ts-expect-error: Irrelevant.
render(<App />, document.getElementById('app'));
