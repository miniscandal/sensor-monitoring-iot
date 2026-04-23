import { OBSERVER_ENTITY_NODE_STATE_CODE } from '@shared-constants/observer-entities';
import { NODE_STATE_LOGGED_IN } from '@infrastructure/environmental-nodes/constants/node-state-codes';


function NodeLoggedInCountObserver() {
    return {
        entity: OBSERVER_ENTITY_NODE_STATE_CODE,
        instanceId: NODE_STATE_LOGGED_IN,
        listener: ({ data, nodeIds }) => {
            const { topic } = data;
            const nodeId = topic.split('/').at(-2);
            const newState = new Set(nodeIds);

            newState.add(nodeId);


            return newState;
        },
    };
}

export { NodeLoggedInCountObserver };
