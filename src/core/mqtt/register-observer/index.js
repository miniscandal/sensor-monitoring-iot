/*
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

    register({ entity, value, observerId }) {
        const targetMap = this.entities[entity];

        if (!targetMap.has(value)) {
            targetMap.set(value, []);
        }

        targetMap.get(value).push(observerId);
    }

    getObserverId({ entity, value }) {
        return this.entities[entity].get(value);
    }
}

export { RegisterObserver };
