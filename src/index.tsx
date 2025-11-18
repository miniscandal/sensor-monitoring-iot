/**
 * Module responsibility
 * 
 */

import { render } from 'preact';
import { useEffect } from 'preact/hooks';

import { MqttClientSingleton } from '@core-services/mqtt-client';

import { MqttClientStatus } from './features/mqtt-client-status/components/templates/mqtt-client-status';
import { TopicSubscription } from './features/topics-subscription/components/templates/topic-subscription';
import { DeviceManagement } from './features/device-management/components/templates/device-management';
import { LiveDataFeed } from './features/live-data-feed/components/templates/live-data-feed';

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
                <MqttClientStatus />
                <TopicSubscription />
                <DeviceManagement />
                <LiveDataFeed />
            </main>
        </>
    );
}


render(<App />, document.getElementById('app'));
