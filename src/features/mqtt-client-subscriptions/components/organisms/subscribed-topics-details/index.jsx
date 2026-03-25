import { useState } from 'preact/hooks';

import { MqttTopicPath } from '../../molecules/mqtt-topic-path';

import { useMqttClientTopicSubscriptions } from '@features/mqtt-client-subscriptions/hooks/use-topic-subscriptions';

import './style.css';


function SubscribedTopicsDetails() {
    const [isOpen, setIsOpen] = useState(false);
    const topics = useMqttClientTopicSubscriptions();

    const topicLabelComponents = topics.map(topic => <MqttTopicPath key={topic} topic={topic} />);

    const handleToggle = () => setIsOpen(prevState => !prevState);


    return (
        <details class="subscribed-topics-details" onToggle={handleToggle} open={isOpen}>
            <summary>
                Details subscribed topics
            </summary>
            <ul>
                {!topics.length ? 'No subscribed topics' : topicLabelComponents}
            </ul>
        </details>
    );
}

export { SubscribedTopicsDetails };
