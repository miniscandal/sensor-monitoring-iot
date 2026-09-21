/*
This module allows you to register and manage observers associated with different entities.
Each entity can have multiple instances, and each instance can have multiple observers.

Terminology:
- `entity`     → The container that groups related instances (e.g., mqttEvents, statusCodes).
                 Conceptually equivalent to a table in a database model.
- `instanceId` → A unique item that lives inside an entity (e.g., onConnect, 102, 'topic1').
                 Conceptually equivalent to a row/instance in a database model.

Example of a possible `entities` object as the result of an instance of ObserverRegistry
after registering some observers:

entities = {
    mqttEvents: {
        onConnect: ['observerId1', 'observerId2', 'observerId3'],
        onOffline: ['observerId4', 'observerId5'],
    },
    statusCodes: {
        102: ['observerId6', 'observerId7'],
        103: ['observerId8'],
    },
    operationResult: {
        202: ['observerId9', 'observerId10'],
        203: ['observerId11'],
    },
    topics: {
        'topic1': ['observerId12', 'observerId13'],
        'topic2': ['observerId14'],
    },
};

Notes:
- Each key in `entities` corresponds to one of the valid entities defined in `ENTITY_*`.
- Each instanceId within an entity can have an array of `observerId`s representing the registered observers.
- This setup allows selective notification of observers associated with a specific event, status code, operation code, or topic.
- The data above is a **possible runtime state** of an instance of ObserverRegistry, not hardcoded.
*/

import {
    ENTITY_MQTT_CLIENT_EVENTS,
    ENTITY_ENV_NODE_STATE_CODE,
    ENTITY_ENV_NODE_OPERATION_RESULT_CODE,
    ENTITY_MQTT_CLIENT_TOPICS,
} from '@shared-constants/observer-entities';


class ObserverRegistry {
    static VALID_ENTITIES = [
        ENTITY_MQTT_CLIENT_EVENTS,
        ENTITY_ENV_NODE_STATE_CODE,
        ENTITY_ENV_NODE_OPERATION_RESULT_CODE,
        ENTITY_MQTT_CLIENT_TOPICS,
    ];

    constructor() {
        this.entities = {
            [ENTITY_MQTT_CLIENT_EVENTS]: new Map(),
            [ENTITY_ENV_NODE_STATE_CODE]: new Map(),
            [ENTITY_ENV_NODE_OPERATION_RESULT_CODE]: new Map(),
            [ENTITY_MQTT_CLIENT_TOPICS]: new Map(),
        };
    }

    register({ entity, instanceId, observerId }) {
        const targetMap = this.entities[entity];

        if (!targetMap.has(instanceId)) {
            targetMap.set(instanceId, []);
        }

        targetMap.get(instanceId).push(observerId);
    }

    getObserverIds({ entity, instanceId }) {
        return this.entities[entity].get(instanceId);
    }
}

export { ObserverRegistry };
