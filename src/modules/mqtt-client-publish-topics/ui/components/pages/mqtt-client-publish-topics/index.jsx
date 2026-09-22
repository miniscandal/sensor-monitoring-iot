import { useSubscribeObserverMqttClient } from '@core/mqtt-client/hooks/use-subscribe-observer';

import { SubscribedEnvMonitoringNodeStatusTopicObserver } from '@modules/mqtt-client-operations/application/observers/topics/environmental-node-data';

import { MqttClientPublishTopicsTemplate } from '../../templates/mqtt-client-publish-topics';

import {
    MQTT_TOPIC_ENV_NODE_COMMAND,
    MQTT_TOPIC_ALL_ENV_NODE_COMMAND,
} from '@core/mqtt-client/constants/client-topics-publishes';

import './style.css';


function MqttClientPublishTopicsPage() {
    const topics = [
        MQTT_TOPIC_ENV_NODE_COMMAND(),
        MQTT_TOPIC_ALL_ENV_NODE_COMMAND,
    ];

    useSubscribeObserverMqttClient(SubscribedEnvMonitoringNodeStatusTopicObserver());


    return (
        <MqttClientPublishTopicsTemplate topics={topics} />
    );
}

export { MqttClientPublishTopicsPage };
