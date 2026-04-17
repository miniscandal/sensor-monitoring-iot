import { useSubscribedTopics } from '@modules/mqtt-client-subscription-topics/hooks/use-subscribed-topics';

import { useSubscribeObserverMqttClient } from '@infrastructure/mqtt-client/hooks/use-subscribe-observer';

import { OnMqttClientConnectedObserver } from '@modules/mqtt-client-subscription-topics/observers/connected';

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
