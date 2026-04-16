import { useSubscribeObserverMqttClient } from '@shared-hooks/mqtt-client/use-subscribe-observer';

import { SubscribedEnvironmentalNodeStatusTopicObserver } from '@features/mqtt-client-operations/observers/topics/environmental-node-data';

import { TopicsPublishes } from '../../templates/topics-publishes';

import {
    MQTT_TOPIC_NODE_OPERATION,
    MQTT_TOPIC_NODE_OPERATION_ALL,
} from '@features/mqtt-client-publish-topics/constants/topics-publishes';

import './style.css';


function MqttClientPublishTopics() {
    const topics = [
        MQTT_TOPIC_NODE_OPERATION(),
        MQTT_TOPIC_NODE_OPERATION_ALL,
    ];

    useSubscribeObserverMqttClient(SubscribedEnvironmentalNodeStatusTopicObserver());


    return (
        <TopicsPublishes count={topics.length} topics={topics} />
    );
}

export { MqttClientPublishTopics };
