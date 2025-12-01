import { useMqttClientTopicSubscriptions } from '@shared-hooks/mqtt-client/use-topic-subscriptions';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function SubscribeTopicPanel() {
    const topic = useMqttClientTopicSubscriptions();

    const iconStat = {
        label: 'Topic Subscribe',
        value: topic,
        svgIconName: 'topicSubscribe',
    };


    return (
        <section class="subscribe-topic-panel">
            <IconStat {...iconStat} />
        </section>
    );
}

export { SubscribeTopicPanel };
