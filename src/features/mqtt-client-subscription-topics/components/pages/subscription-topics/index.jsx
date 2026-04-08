import { useSubscribedTopics } from '@features/mqtt-client-subscription-topics/hooks/use-subscribed-topics';

import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import { OnMqttClientConnectedObserver } from '@features/mqtt-client-subscription-topics/observers/connected';

import { SubscribedTopics } from '../../templates/subscribed-topics';

import './style.css';


function MqttClientSubscriptionTopics() {
    const topics = useSubscribedTopics();

    useMqttClientEvents(OnMqttClientConnectedObserver());


    return (
        <SubscribedTopics topics={topics} />
    );
}

export { MqttClientSubscriptionTopics };
