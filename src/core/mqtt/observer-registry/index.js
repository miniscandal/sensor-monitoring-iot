/*
This module allows you to register and manage observers associated with different entities.
Each entity can have multiple IDs, and each ID can have multiple observers.

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
    operationCodes: {
        202: ['observerId9', 'observerId10'],
        203: ['observerId11'],
    },
    topics: {
        'topic1': ['observerId12', 'observerId13'],
        'topic2': ['observerId14'],
    },
};

Notes:
- Each key in `entities` corresponds to one of the valid entities defined in `OBSERVER_ENTITY_*`.
- Each ID within an entity can have an array of `observerId`s representing the registered observers.
- This setup allows selective notification of observers associated with a specific event, status code, operation code, or topic.
- The data above is a **possible runtime state** of an instance of ObserverRegistry, not hardcoded.
*/

import {
    OBSERVER_ENTITY_MQTT_EVENTS,
    OBSERVER_ENTITY_STATUS_CODES,
    OBSERVER_ENTITY_OPERATION_CODES,
    OBSERVER_ENTITY_TOPICS,
} from '@core-constants/observer-entities';


class ObserverRegistry {
    static VALID_ENTITIES = [
        OBSERVER_ENTITY_MQTT_EVENTS,
        OBSERVER_ENTITY_STATUS_CODES,
        OBSERVER_ENTITY_OPERATION_CODES,
        OBSERVER_ENTITY_TOPICS,
    ];

    constructor() {
        this.entities = {
            [OBSERVER_ENTITY_MQTT_EVENTS]: new Map(),
            [OBSERVER_ENTITY_STATUS_CODES]: new Map(),
            [OBSERVER_ENTITY_OPERATION_CODES]: new Map(),
            [OBSERVER_ENTITY_TOPICS]: new Map(),
        };
    }

    register({ entity, id, observerId }) {
        const targetMap = this.entities[entity];

        if (!targetMap.has(id)) {
            targetMap.set(id, []);
        }

        targetMap.get(id).push(observerId);
    }

    getObserverId({ entity, id }) {
        return this.entities[entity].get(id);
    }
}

export { ObserverRegistry };
