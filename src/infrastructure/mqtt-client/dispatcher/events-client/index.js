import { deepCamel } from '@shared-utils/deep-camel';
import { adaptMqttMessage } from '@shared-utils/adapt-mqtt-message';

import { nodeStateBirthPayloadBuilder } from '../builders/node-state-birth-payload';
import { nodeStateDeathPayloadBuilder } from '../builders/node-state-death-payload';
import { nodeStateStreamingSensorAllPayloadBuilder } from '../builders/node-state-streaming-sensor-all-payload';

import { extractNodeId } from '@shared-utils/extract-node-id';

import {
    MQTT_CLIENT_EVENT_CONNECT,
    MQTT_CLIENT_EVENT_OFFLINE,
    MQTT_CLIENT_EVENT_SUBSCRIBE,
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_ERROR,
} from '@infrastructure/mqtt-client/constants/client-events';

import {
    ENV_NODE_STATE_BIRTH,
    ENV_NODE_STATE_DEATH,
    ENV_NODE_STATE_STREAMING_SENSOR_ALL,
} from '@shared-constants/env-node-states-codes';

import {
    ENTITY_MQTT_CLIENT_EVENTS,
    ENTITY_ENV_NODE_STATE_CODE,
    ENTITY_ENV_NODE_OPERATION_RESULT_CODE,
    ENTITY_MQTT_CLIENT_TOPICS,
} from '@shared-constants/observer-entities';


const eventBuilders = new Map([
    [ENV_NODE_STATE_BIRTH, nodeStateBirthPayloadBuilder],
    [ENV_NODE_STATE_DEATH, nodeStateDeathPayloadBuilder],
    [ENV_NODE_STATE_STREAMING_SENSOR_ALL, nodeStateStreamingSensorAllPayloadBuilder],
]);


class MqttClientEventDispatcher {
    #client;
    #subject;

    constructor(clientAdapter, mqttClientSubject) {
        this.#client = clientAdapter;
        this.#subject = mqttClientSubject;

        this.#client.on(MQTT_CLIENT_EVENT_CONNECT, this.#onConnect.bind(this));
        this.#client.on(MQTT_CLIENT_EVENT_OFFLINE, this.#onOffline.bind(this));
        this.#client.on(MQTT_CLIENT_EVENT_MESSAGE, this.#onMessage.bind(this));
        this.#client.on(MQTT_CLIENT_EVENT_ERROR, (err) => console.error('MQTT error:', err));
    }

    #onConnect() {
        this.#subject.notifyObservers({
            entity: ENTITY_MQTT_CLIENT_EVENTS,
            instanceId: MQTT_CLIENT_EVENT_CONNECT,
            actions: {
                getClientProperties: this.#client.getClientProperties.bind(this.#client),
                subscribe: this.subscribe.bind(this),
            },
            data: null,
        });
    }

    #onOffline() {
        this.#subject.notifyObservers({
            entity: ENTITY_MQTT_CLIENT_EVENTS,
            instanceId: MQTT_CLIENT_EVENT_OFFLINE,
            actions: {
                getClientProperties: this.#client.getClientProperties.bind(this.#client),
            },
            data: null,
        });
    }

    #onMessage(topic, rawMessage) {
        const message = adaptMqttMessage(deepCamel(JSON.parse(rawMessage.toString())));

        this.#subject.notifyObservers({
            entity: ENTITY_ENV_NODE_OPERATION_RESULT_CODE,
            instanceId: message.nodeOperationResult,
            actions: null,
            data: {
                topic,
                message,
            },
        });

        this.#subject.notifyObservers({
            entity: ENTITY_MQTT_CLIENT_EVENTS,
            instanceId: MQTT_CLIENT_EVENT_MESSAGE,
            actions: null,
            data: {
                topic,
                message,
            },
        });

        const { nodeStateCode } = message;

        const buildMessage = eventBuilders.get(nodeStateCode);

        this.#subject.notifyObservers({
            entity: ENTITY_ENV_NODE_STATE_CODE,
            instanceId: nodeStateCode,
            actions: null,
            data: {
                topic,
                message: buildMessage({
                    message,
                    nodeId: extractNodeId(topic),
                }),
            },
        });
    }

    subscribe(topic) {
        this.#client.subscribe(topic, () => {
            this.#subject.notifyObservers({
                entity: ENTITY_MQTT_CLIENT_EVENTS,
                instanceId: MQTT_CLIENT_EVENT_SUBSCRIBE,
                actions: {
                    subscribe: this.subscribe.bind(this),
                },
                data: {
                    topic,
                },
            });

            this.#subject.notifyObservers({
                entity: ENTITY_MQTT_CLIENT_TOPICS,
                instanceId: topic,
                actions: {
                    publish: this.publish.bind(this),
                },
                data: {
                    topic,
                },
            });
        });
    }

    publish({ topic, data }) {
        this.#client.publish(topic, data);
    }

    end() {
        this.#client.end();
    }
}

export { MqttClientEventDispatcher };
