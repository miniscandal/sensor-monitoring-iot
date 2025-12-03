/**
 * Module responsibility
 * 
 */

import { render } from 'preact';
import { useEffect } from 'preact/hooks';

import { MqttClientConnectionSingleton } from '@core-services/mqtt-client-connection-singleton';

import { MqttClientStatus } from '@features/mqtt-client-status/components/templates/status';
import { TopicSubscription } from '@features/mqtt-client-subscriptions/components/templates/topic-subscription';
import { DeviceManagement } from '@features/iot-devices-operations/components/templates/management';

import { Header } from '@shared-components/organisms/header';

import './style.css';


export function App() {
    useEffect(() => {
        const client = MqttClientConnectionSingleton.getInstance();


        return () => client.end();
    }, []);

    return (
        <>
            <Header />
            <main>
                <MqttClientStatus />
                <TopicSubscription />
                <DeviceManagement />
            </main>
        </>
    );
}


render(<App />, document.getElementById('app'));
