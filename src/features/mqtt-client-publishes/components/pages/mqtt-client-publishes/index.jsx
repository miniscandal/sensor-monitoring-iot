import { TopicsPublishes } from '../../templates/topics-publishes';

import {
    MQTT_TOPIC_NODE_OPERATION,
    MQTT_TOPIC_NODE_OPERATION_ALL,
} from '@features/mqtt-client-publishes/constants/topics-publishes';

import './style.css';


function MqttClientPublishesPage() {
    const topics = [
        MQTT_TOPIC_NODE_OPERATION(),
        MQTT_TOPIC_NODE_OPERATION_ALL,
    ];


    return (
        <TopicsPublishes count={topics.length} topics={topics} />
    );
}

export { MqttClientPublishesPage };
