import { useMqttClientTopicSubscriptions } from '@features/mqtt-client-subscriptions/hooks/use-topic-subscriptions';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function SubscribeTopicPanel() {
    const topics = useMqttClientTopicSubscriptions();

    const iconStat = {
        label: 'Topic Subscribe',
        value: topics.join('\n'),
        svgIconName: 'topicSubscribe',
    };


    return (
        <section class="subscribe-topic-panel">
            <IconStat {...iconStat} />
        </section>
    );
}

export { SubscribeTopicPanel };
