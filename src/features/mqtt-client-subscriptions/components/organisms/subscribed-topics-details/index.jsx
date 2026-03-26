import { useMqttClientTopicSubscriptions } from '@features/mqtt-client-subscriptions/hooks/use-topic-subscriptions';

import { Details } from '@shared-components/organisms/details';
import { TopicsList } from '@shared-components/molecules/topics-list';

import './style.css';


function SubscribedTopicsDetails() {
    const topics = useMqttClientTopicSubscriptions();


    return (
        <div class="subscribed-topics-details">
            <Details summary="Details subscribed topics">
                <TopicsList topics={topics} emptyMessage="No subscribed topics" />
            </Details>
        </div>
    );
}

export { SubscribedTopicsDetails };
