import { useSubscribedTopics } from '@modules/mqtt-client-subscription-topics/ui/hooks/use-subscribed-topics';

import { MqttClientSubscriptionTopicsTemplate } from '../../templates/mqtt-client-subscription-topics';

import './style.css';


function MqttClientSubscriptionTopicsPage() {
    const topics = useSubscribedTopics();


    return (
        <MqttClientSubscriptionTopicsTemplate topics={topics} />
    );
}

export { MqttClientSubscriptionTopicsPage };
