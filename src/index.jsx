import { render } from 'preact';
import { useEffect } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@core/mqtt-client/hooks/use-subscribe-observer';

import { mqttClientProviderFactory } from '@core/mqtt-client/factories/client';

import { OnMqttClientConnectedObserver } from '@modules/mqtt-client-subscription-topics/application/observers/connected';

import { MqttClientAttributesPage } from '@modules/mqtt-client-attributes/ui/components/pages/mqtt-client-attributes';
import { MqttClientSubscriptionTopicsPage } from '@modules/mqtt-client-subscription-topics/ui/components/pages/mqtt-client-subscription-topics';
import { MqttClientPublishTopicsPage } from '@modules/mqtt-client-publish-topics/ui/components/pages/mqtt-client-publish-topics';
import { EnvMonitoringNodesPage } from '@modules/env-monitoring-nodes/ui/components/pages/env-monitoring-nodes';
// import { EnvironmentalNodesMessages } from '@modules/env-monitoring-nodes-messages/components/pages/environmental-nodes-messages';

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
                <MqttClientAttributesPage />
                <MqttClientSubscriptionTopicsPage />
                <MqttClientPublishTopicsPage />
                <EnvMonitoringNodesPage />
                {/* <EnvironmentalN odesMessages /> */}
            </main>
        </>
    );
}


render(<App />, document.getElementById('app'));
