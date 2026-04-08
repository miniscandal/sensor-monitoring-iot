/**
 * Module responsibility
 * 
 */

import { render } from 'preact';
import { useEffect } from 'preact/hooks';

import { createMqttService } from '@infrastructure/mqtt/providers/mqtt-client';

import { MqttClientProperties } from '@features/mqtt-client/components/pages/mqtt-client-properties';
import { MqttClientSubscriptionTopics } from '@features/mqtt-client-subscription-topics/components/pages/subscription-topics';
import { MqttClientPublishTopics } from '@features/mqtt-client-publish-topics/components/pages/publish-topic';
import { EnvironmentalNodes } from '@features/environmental-nodes/components/pages/environmental-nodes';
import { EnvironmentalNodeMessages } from '@features/environmental-node-messages/components/page/environmental-node-messages';

import { Header } from '@shared-components/organisms/header';

import './style.css';


export function App() {
    useEffect(() => {
        const mqttService = createMqttService();
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
