import { useTopicSubscription } from '@shared-custom-hooks/use-topic-subscription';

import { Parameter } from '@shared-components/molecules/parameter';


function FeatTopicSubscription() {
    const topic = useTopicSubscription();

    const parameter = {
        name: 'subscribe',
        text: 'Topic Subscribe',
        icon: 'topicSubscribe',
        value: topic,
    };

    return (
        <Parameter {...parameter} />
    );
}

export { FeatTopicSubscription };
