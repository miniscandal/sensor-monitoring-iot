import { useSubscribedTopics } from '@features/mqtt-client-subscriptions/hooks/use-subscribed-topics';

import { SubscribedTopics } from '../../templates/subscribed-topics';

import './style.css';


function MqttClientSubscriptionsPage() {
    const topics = useSubscribedTopics();


    return (
        <SubscribedTopics topics={topics} />
    );
}

export { MqttClientSubscriptionsPage };
