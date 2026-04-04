/**
 * Module responsibility
 * 
 */

import { render } from 'preact';
import { useEffect } from 'preact/hooks';

import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import { MqttClientSingleton } from '@core-mqtt/client-singleton';

import { MqttClientPage } from '@features/mqtt-client/components/pages/mqtt-client';
import { MqttClientSubscriptionsPage } from '@features/mqtt-client-subscriptions/components/pages/mqtt-client-subscriptions';
import { MqttClientPublishesPage } from '@features/mqtt-client-publishes/components/pages/mqtt-client-publishes';
import { OnTopicDeviceHubMonitorSubscribedObserver } from '@features/mqtt-client-operations/observers/topic-device-hub-monitor-subscribed';
import { EnvironmentalNodesPage } from '@features/environmental-nodes/components/pages/environmental-nodes';
import { OnMqttClientConnectedObserver } from '@features/mqtt-client-subscriptions/observers/connected';
import { EnvironmentalNodeMessagesPage } from '@features/environmental-node-messages/components/page/environmental-node-messages';
import { JsonRenderer } from '@features/mqtt-message-formatter/components/templates/json-renderer';

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
                <MqttClientPage />
                <MqttClientSubscriptionsPage />
                <MqttClientPublishesPage />
                <EnvironmentalNodesPage />
                <EnvironmentalNodeMessagesPage />
                <JsonRenderer />
            </main>
        </>
    );
}


render(<App />, document.getElementById('app'));
