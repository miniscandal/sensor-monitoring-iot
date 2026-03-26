import { MqttTopicPath } from '../../molecules/mqtt-topic-path';

import { useMqttClientTopicSubscriptions } from '@features/mqtt-client-subscriptions/hooks/use-topic-subscriptions';

import { Details } from '@shared-components/organisms/details';

import './style.css';


function SubscribedTopicsDetails() {
    const topics = useMqttClientTopicSubscriptions();
    const topicLabelComponents = topics.map(topic => <MqttTopicPath key={topic} topic={topic} />);


    return (
        <div class="subscribed-topics-details">
            <Details summary="Details subscribed topics">
                <ul>
                    {!topics.length ? 'No subscribed topics' : topicLabelComponents}
                </ul>
            </Details>
        </div>
    );
}

export { SubscribedTopicsDetails };
