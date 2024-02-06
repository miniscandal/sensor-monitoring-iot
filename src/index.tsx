/**
 * Module responsibility
 * 
 */

import { render } from 'preact';
import { useEffect } from 'preact/hooks';

import { MqttClientSingleton } from '@core-services/mqtt-client';

import { Header } from '@shared-components/organisms/header';

import { FeatMqttClientProperties } from './feat-mqtt-client-properties';
import { FeatShowConnectedDevices } from './feat-show-connected-devices';

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
					<FeatShowConnectedDevices />
				</article>
			</main>
		</>
	);
}

// @ts-expect-error: Irrelevant.
render(<App />, document.getElementById('app'));
