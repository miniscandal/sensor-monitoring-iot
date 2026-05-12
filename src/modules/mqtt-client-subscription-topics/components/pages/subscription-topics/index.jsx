import { useSubscribedTopics } from '@modules/mqtt-client-subscription-topics/hooks/use-subscribed-topics';

import { SubscribedTopics } from '../../templates/subscribed-topics';

import './style.css';


function MqttClientSubscriptionTopics() {
    const topics = useSubscribedTopics();


    return (
        <SubscribedTopics topics={topics} />
    );
}

export { MqttClientSubscriptionTopics };
