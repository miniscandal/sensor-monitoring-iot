import { useMqttClientTopicSubscriptions } from '@features/mqtt-client-subscriptions/hooks/use-topic-subscriptions';

import { SubscribedTopics } from '../../templates/subscribed-topics';

import './style.css';


function MqttClientSubscriptionsPage() {
    const topics = useMqttClientTopicSubscriptions();


    return (
        <SubscribedTopics topics={topics} />
    );
}

export { MqttClientSubscriptionsPage };
