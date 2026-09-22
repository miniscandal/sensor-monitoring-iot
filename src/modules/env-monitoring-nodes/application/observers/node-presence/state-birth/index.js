import { signal } from '@preact/signals';

import { ENTITY_ENV_NODE_STATE_CODE } from '@shared-constants/observer-entities';
import { ENV_NODE_STATE_BIRTH } from '@shared-constants/env-node-states-codes';


function EnvNodePresenceStateBirthObserver() {

    return {
        entity: ENTITY_ENV_NODE_STATE_CODE,
        instanceId: ENV_NODE_STATE_BIRTH,
        listener: ({ data: { message }, nodes }) => {
            const { nodeStateCode, metadata: { nodeId } } = message;
            const node = {
                ...message,
                nodeStateCode: signal(nodeStateCode),
                data: {
                    sensorsReadings: {
                        humidity: signal(null),
                        temperature: signal(null),
                    },
                },
            };


            return nodes.has(nodeId)
                ? nodes
                : new Map(nodes).set(nodeId, node);
        },
    };
}

export { EnvNodePresenceStateBirthObserver };
