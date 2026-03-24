/*
Result Example

entities = {
    mqttEvents: {
        onConnect: [id,id,id],
        onOffline: [id,id,id],
    },
    statusCodes: {
        102: [id,id,id],
        103: [id,id,id],
    },
    operationCodes: {
        202: [id,id,id],
        203: [id,id,id],
    },
};
*/

class RegisterObserver {
    static VALID_ENTITIES = ['mqttEvents', 'statusCodes', 'operationCodes', 'topics'];

    constructor() {
        this.entities = {
            'mqttEvents': new Map(),
            'statusCodes': new Map(),
            'operationCodes': new Map(),
            'topics': new Map(),
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

export { RegisterObserver };
