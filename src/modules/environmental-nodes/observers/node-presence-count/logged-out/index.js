import { OBSERVER_ENTITY_OPERATION_RESULT } from '@shared-constants/observer-entities';
import { NODE_OP_RESULT_LOGGED_OUT } from '@infrastructure/environmental-nodes/constants/node-operation-result-codes';


function NodeLoggedOutCountObserver() {
    return {
        entity: OBSERVER_ENTITY_OPERATION_RESULT,
        instanceId: NODE_OP_RESULT_LOGGED_OUT,
        listener: ({ data, nodeIds }) => {
            const { topic } = data;
            const nodeId = topic.split('/').at(-2);
            const newState = new Set(nodeIds);

            newState.delete(nodeId);


            return newState;
        },
    };
}

export { NodeLoggedOutCountObserver };
