/**
 * Module responsibility
 * 
 */

import { render } from 'preact';
import { useEffect } from 'preact/hooks';

import { useMqttClientEventSubjectSubscribe } from '@shared-hooks/mqtt-client/use-event-subject-subscribe';

import { MqttClientSingleton } from '@core-services/mqtt-client-singleton';

import { MqttClientStatus } from '@features/mqtt-client-status/components/templates/status';
import { TopicSubscription } from '@features/mqtt-client-subscriptions/components/templates/topic-subscription';
import { SubscribePrivateTopicObserver } from '@features/mqtt-client-operations/observers/subscribe-private-topic';
import { DeviceManagement } from '@features/iot-devices-operations/components/templates/management';

import { Header } from '@shared-components/organisms/header';

import './style.css';


export function App() {
    useEffect(() => {
        const client = MqttClientSingleton.getInstance();


        return () => client.end();
    }, []);

    useMqttClientEventSubjectSubscribe(SubscribePrivateTopicObserver());


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
