import { useTopicSubscription } from '@shared-custom-hooks/use-topic-subscription';

import { PropertyItem } from '@shared-components/molecules/property-item';

import topicSubscribe from '@assets/images/mqtt-icons/topic-subscribe.svg';

import './style.css';


function SubscribeTopicPanel() {
    const topic = useTopicSubscription();

    const parameter = {
        name: 'subscribe',
        label: 'Topic Subscribe',
        svgIcon: topicSubscribe,
        value: topic,
    };


    return (
        <PropertyItem {...parameter} />
    );
}

export { SubscribeTopicPanel };
