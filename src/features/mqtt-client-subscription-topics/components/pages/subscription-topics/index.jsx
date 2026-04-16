import { useSubscribedTopics } from '@features/mqtt-client-subscription-topics/hooks/use-subscribed-topics';

import { useSubscribeObserverMqttClient } from '@shared-hooks/mqtt-client/use-subscribe-observer';

import { OnMqttClientConnectedObserver } from '@features/mqtt-client-subscription-topics/observers/connected';

import { SubscribedTopics } from '../../templates/subscribed-topics';

import './style.css';


function MqttClientSubscriptionTopics() {
    const topics = useSubscribedTopics();

    useSubscribeObserverMqttClient(OnMqttClientConnectedObserver());


    return (
        <SubscribedTopics topics={topics} />
    );
}

export { MqttClientSubscriptionTopics };
