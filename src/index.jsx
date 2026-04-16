/**
 * Module responsibility
 * 
 */

import { render } from 'preact';
import { useEffect } from 'preact/hooks';

import { mqttClientProviderFactory } from '@infrastructure/mqtt-client/factories/client';

import { MqttClientProperties } from '@modules/mqtt-client/components/pages/mqtt-client-properties';
import { MqttClientSubscriptionTopics } from '@modules/mqtt-client-subscription-topics/components/pages/subscription-topics';
import { MqttClientPublishTopics } from '@modules/mqtt-client-publish-topics/components/pages/publish-topic';
import { EnvironmentalNodes } from '@modules/environmental-nodes/components/pages/environmental-nodes';
import { EnvironmentalNodeMessages } from '@modules/environmental-node-messages/components/pages/environmental-node-messages';

import { Header } from '@shared-components/organisms/header';

import './style.css';


export function App() {
    useEffect(() => {
        const mqttService = mqttClientProviderFactory();


        return () => mqttService.end();
    }, []);


    return (
        <>
            <Header />
            <main>
                <MqttClientProperties />
                <MqttClientSubscriptionTopics />
                <MqttClientPublishTopics />
                <EnvironmentalNodes />
                <EnvironmentalNodeMessages />
            </main>
        </>
    );
}


render(<App />, document.getElementById('app'));
