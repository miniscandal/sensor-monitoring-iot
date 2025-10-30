import { useTopicsSubscription } from '@shared-custom-hooks/use-topics-subscription';

import { PropertyItem } from '@shared-components/molecules/property-item';

import './style.css';


function SubscribeTopicPanel() {
    const topic = useTopicsSubscription();

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
