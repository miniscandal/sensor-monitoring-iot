import { ENTITY_ENV_NODE_STATE_CODE } from '@shared-constants/observer-entities';
import { ENV_NODE_STATE_DEATH } from '@shared-constants/env-node-states-codes';


function EnvNodePresenceCountStateDeathObserver() {
    return {
        entity: ENTITY_ENV_NODE_STATE_CODE,
        instanceId: ENV_NODE_STATE_DEATH,
        listener: ({ data, nodeIds }) => {
            const { topic } = data;
            const nodeId = topic.split('/').at(-2);
            const newState = new Set(nodeIds);

            newState.delete(nodeId);


            return newState;
        },
    };
}

export { EnvNodePresenceCountStateDeathObserver };
