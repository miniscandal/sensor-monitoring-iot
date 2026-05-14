import { useSubscribeObserverMqttClient } from '@infrastructure/mqtt-client/hooks/use-subscribe-observer';

import { SubscribedEnvironmentalNodeStatusTopicObserver } from '@modules/mqtt-client-operations/observers/topics/environmental-node-data';

import { TopicsPublishes } from '../../templates/topics-publishes';

import {
    MQTT_TOPIC_ENVIRONMENTAL_NODE_COMMAND,
    MQTT_TOPIC_ENVIRONMENTAL_NODE_ALL_COMMAND,
} from '@infrastructure/mqtt-client/constants/client-topics-publishes';

import './style.css';


function MqttClientPublishTopics() {
    const topics = [
        MQTT_TOPIC_ENVIRONMENTAL_NODE_COMMAND(),
        MQTT_TOPIC_ENVIRONMENTAL_NODE_ALL_COMMAND,
    ];

    useSubscribeObserverMqttClient(SubscribedEnvironmentalNodeStatusTopicObserver());


    return (
        <TopicsPublishes topics={topics} />
    );
}

export { MqttClientPublishTopics };
