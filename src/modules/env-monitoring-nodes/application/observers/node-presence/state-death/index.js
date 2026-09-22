import { ENV_NODE_STATE_DEATH } from '@shared-constants/env-node-states-codes';

import { ENTITY_ENV_NODE_STATE_CODE } from '@shared-constants/observer-entities';


function EnvNodePresenceStateDeathObserver() {

    return {
        entity: ENTITY_ENV_NODE_STATE_CODE,
        instanceId: ENV_NODE_STATE_DEATH,
        listener: ({ data, nodes }) => {
            const newState = new Map(nodes);

            newState.delete(data.message.metadata.nodeId);


            return newState;
        },
    };
}

export { EnvNodePresenceStateDeathObserver };
