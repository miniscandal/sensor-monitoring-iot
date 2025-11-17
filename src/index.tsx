/**
 * Module responsibility
 * 
 */

import { render } from 'preact';
import { useEffect } from 'preact/hooks';

import { MqttClientSingleton } from '@core-services/mqtt-client';

import { FeatMqttClientStatus } from './feat-mqtt-client-status';
import { FeatTopicSubscription } from './feat-topics-subscription-status';
import { FeatConnectedDeviceMonitoring } from './feat-connected-devices-monitoring';
import { FeatLiveDataFeed } from './feat-live-data-feed';

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
                <FeatMqttClientStatus />
                <FeatTopicSubscription />
                <FeatConnectedDeviceMonitoring />
                <FeatLiveDataFeed />
            </main>
        </>
    );
}


render(<App />, document.getElementById('app'));
