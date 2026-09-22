import { render } from 'preact';
import { useEffect } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@core/mqtt-client/hooks/use-subscribe-observer';

import { mqttClientProviderFactory } from '@core/mqtt-client/factories/client';

import { OnMqttClientConnectedObserver } from '@modules/mqtt-client-subscription-topics/application/observers/connected';

import { MqttClientProperties } from '@modules/mqtt-client/ui/components/pages/mqtt-client-properties';
import { MqttClientSubscriptionTopics } from '@modules/mqtt-client-subscription-topics/ui/components/pages/subscription-topics';
import { MqttClientPublishTopics } from '@modules/mqtt-client-publish-topics/ui/components/pages/publish-topic';
import { EnvironmentalNodes } from '@modules/environmental-nodes/ui/components/pages/environmental-nodes';
// import { EnvironmentalNodesMessages } from '@modules/environmental-nodes-messages/components/pages/environmental-nodes-messages';

import { Header } from '@shared-components/organisms/header';

import './style.css';


export function App() {
    useEffect(() => {
        const mqttService = mqttClientProviderFactory();


        return () => mqttService.end();
    }, []);

    useSubscribeObserverMqttClient(OnMqttClientConnectedObserver());


    return (
        <>
            <Header />
            <main>
                <MqttClientProperties />
                <MqttClientSubscriptionTopics />
                <MqttClientPublishTopics />
                <EnvironmentalNodes />
                {/* <EnvironmentalNodesMessages /> */}
            </main>
        </>
    );
}


render(<App />, document.getElementById('app'));
