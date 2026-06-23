import { extractNodeId } from '@shared-utils/extract-node-id';

import { ENTITY_ENV_NODE_STATE_CODE } from '@shared-constants/observer-entities';
import { ENV_NODE_STATE_DEATH } from '@shared-constants/env-node-states-codes';


function EnvNodePresenceCountStateDeathObserver() {

    return {
        entity: ENTITY_ENV_NODE_STATE_CODE,
        instanceId: ENV_NODE_STATE_DEATH,
        listener: ({ data, nodeIds }) => {
            const newState = new Set(nodeIds);

            newState.delete(extractNodeId(data.topic));


            return newState;
        },
    };
}

export { EnvNodePresenceCountStateDeathObserver };
