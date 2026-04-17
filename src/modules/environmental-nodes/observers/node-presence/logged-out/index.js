import { OBSERVER_ENTITY_OPERATION_RESULT } from '@shared-constants/observer-entities';
import { NODE_OP_RESULT_LOGGED_OUT } from '@infrastructure/environmental-nodes/constants/node-operation-result-codes';


function NodeLoggedOutObserver() {

    return {
        entity: OBSERVER_ENTITY_OPERATION_RESULT,
        instanceId: NODE_OP_RESULT_LOGGED_OUT,
        listener: ({ data, nodes }) => {
            const newState = new Map(nodes);

            newState.delete(data.message.metadata.nodeId);


            return newState;
        },
    };
}

export { NodeLoggedOutObserver };


/*
import { OBSERVER_ENTITY_NODE_STATE } from '@shared-constants/observer-entities';
import { NODE_OP_RESULT_LOGGED_OUT } from '@shared-constants/node-state-codes';


function NodeLoggedOutObserver(setNodes) {

    return {
        entity: OBSERVER_ENTITY_NODE_STATE,
        instanceId: NODE_OP_RESULT_LOGGED_OUT,
        listener: ({ data }) => {
            const { metadata: { nodeId } } = data.message;

            setNodes(prevState => {
                const nextState = new Map(prevState);

                nextState.delete(nodeId);


                return nextState;
            });
        },
    };
}

export { NodeLoggedOutObserver };

*/
