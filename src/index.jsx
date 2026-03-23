/**
 * Module responsibility
 * 
 */

import { render } from 'preact';
import { useEffect } from 'preact/hooks';

import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import { MqttClientSingleton } from '@core-mqtt/client-singleton';

import { MqttClientStatus } from '@features/mqtt-client-status/components/templates/status';
import { TopicSubscription } from '@features/mqtt-client-subscriptions/components/templates/topic-subscription';
import { OnTopicDeviceHubMonitorSubscribedObserver } from '@features/mqtt-client-operations/observers/topic-device-hub-monitor-subscribed';
import { DeviceManagement } from '@features/iot-devices-operations/components/templates/management';
import { OnMqttClientConnectedObserver } from '@features/mqtt-client-operations/observers/connected';

import { Header } from '@shared-components/organisms/header';

import './style.css';


export function App() {
    useEffect(() => {
        const client = MqttClientSingleton.getInstance();


        return () => client.end();
    }, []);

    useMqttClientEvents(OnMqttClientConnectedObserver());
    useMqttClientEvents(OnTopicDeviceHubMonitorSubscribedObserver());


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
