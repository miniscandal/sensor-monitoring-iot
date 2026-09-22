import { extractNodeId } from '@shared-utils/extract-node-id';

import { ENTITY_ENV_NODE_STATE_CODE } from '@shared-constants/observer-entities';
import { ENV_NODE_STATE_BIRTH } from '@shared-constants/env-node-states-codes';


function EnvNodePresenceCountStateBirthObserver() {

    return {
        entity: ENTITY_ENV_NODE_STATE_CODE,
        instanceId: ENV_NODE_STATE_BIRTH,
        listener: ({ data, nodeIds }) => {
            const newState = new Set(nodeIds);

            newState.add(extractNodeId(data.topic));


            return newState;
        },
    };
}

export { EnvNodePresenceCountStateBirthObserver };
