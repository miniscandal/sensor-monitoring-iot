/**
 * Module responsibility
 * 
 */

import { render } from 'preact';
import { useEffect } from 'preact/hooks';

import { MqttClientSingleton } from '@core-services/mqtt-client';

import { FeatMqttClientProperties } from './feat-mqtt-client-properties';
import { FeatTopicSubscription } from './feat-topic-subscription';
import { FeatConnectedDeviceMonitoring } from './feat-connected-devices-monitoring';
import { FeatDataTracking } from './feat-device-data-tracking';

import { Header } from '@shared-components/organisms/header';

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
                <FeatMqttClientProperties />
                <FeatTopicSubscription />
                <FeatConnectedDeviceMonitoring />
                <FeatDataTracking />
            </main>
        </>
    );
}


render(<App />, document.getElementById('app'));
