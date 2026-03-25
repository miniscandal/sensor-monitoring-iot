import { useMqttClientTopicSubscriptions } from '@features/mqtt-client-subscriptions/hooks/use-topic-subscriptions';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function SubscribedTopicsPanel() {
    const topics = useMqttClientTopicSubscriptions();

    const iconStat = {
        label: 'Subscribed topics',
        value: `${topics.length} subscriptions`,
        svgIconName: 'topicSubscribe',
    };


    return (
        <section class="subscribe-topic-panel">
            <IconStat {...iconStat} />
        </section>
    );
}

export { SubscribedTopicsPanel };
