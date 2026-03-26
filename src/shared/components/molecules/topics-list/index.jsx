import { MqttTopicPath } from '@shared-components/molecules/mqtt-topic-path';

import './style.css';


function TopicsList({ topics, emptyMessage }) {
    const topicComponents = topics.map(topic => <MqttTopicPath key={topic} topic={topic} />);


    return (
        <ul className="topics-list">
            {!topics.length ? emptyMessage : topicComponents}
        </ul>
    );
}

export { TopicsList };
