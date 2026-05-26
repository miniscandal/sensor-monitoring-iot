import { ENTITY_ENV_NODE_STATE_CODE } from '@shared-constants/observer-entities';
import { ENV_NODE_STATE_BIRTH } from '@shared-constants/env-node-states-codes';


function EnvNodePresenceCountStateBirthObserver() {
    return {
        entity: ENTITY_ENV_NODE_STATE_CODE,
        instanceId: ENV_NODE_STATE_BIRTH,
        listener: ({ data, nodeIds }) => {
            const { topic } = data;
            const nodeId = topic.split('/').at(-2);
            const newState = new Set(nodeIds);

            newState.add(nodeId);


            return newState;
        },
    };
}

export { EnvNodePresenceCountStateBirthObserver };
