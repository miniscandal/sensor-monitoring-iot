import { useMqttClientTopicSubscriptions } from '@features/mqtt-client-subscriptions/hooks/use-topic-subscriptions';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function SubscribedTopicsCount() {
    const topics = useMqttClientTopicSubscriptions();

    const iconStat = {
        label: 'Subscription Topics',
        value: `Active (${topics.length})`,
        svgIconName: 'topicSubscribe',
    };


    return (
        <section class="subscribed-topics-count">
            <IconStat {...iconStat} />
        </section>
    );
}

export { SubscribedTopicsCount };
