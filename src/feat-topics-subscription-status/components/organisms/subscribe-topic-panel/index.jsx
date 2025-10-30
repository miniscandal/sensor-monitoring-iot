import { useTopicSubscriptions } from '@shared-custom-hooks/mqtt-client/topic-subscriptions';

import { PropertyItem } from '@shared-components/molecules/property-item';

import './style.css';


function SubscribeTopicPanel() {
    const topic = useTopicSubscriptions();

    const parameter = {
        name: 'subscribe',
        label: 'Topic Subscribe',
        svgIconName: 'topicSubscribe',
        value: topic,
    };


    return (
        <section class="subscribe_topic_panel">
            <PropertyItem {...parameter} />
        </section>
    );
}

export { SubscribeTopicPanel };
