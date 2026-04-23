import { OBSERVER_ENTITY_NODE_STATE_CODE } from '@shared-constants/observer-entities';
import { NODE_STATE_LOGGED_IN } from '@infrastructure/environmental-nodes/constants/node-state-codes';


function NodeLoggedInObserver() {

    return {
        entity: OBSERVER_ENTITY_NODE_STATE_CODE,
        instanceId: NODE_STATE_LOGGED_IN,
        listener: ({ data, nodes }) => {
            const { message } = data;
            const { metadata: { nodeId } } = message;
            const newtState = new Map(nodes);


            return nodes.has(nodeId)
                ? newtState
                : newtState.set(nodeId, { ...message, nodeId });
        },
    };
}

export { NodeLoggedInObserver };


/*
import { OBSERVER_ENTITY_NODE_STATE_CODE } from '@shared-constants/observer-entities';
import { NODE_STATE_LOGGED_IN } from '@shared-constants/node-state-codes';


function NodeLoggedInObserver(setNodes) {

    return {
        entity: OBSERVER_ENTITY_NODE_STATE_CODE,
        instanceId: NODE_STATE_LOGGED_IN,
        listener: ({ data }) => {
            const { message } = data;
            const { metadata: { nodeId } } = message;



            setNodes(prevState => {
                if (prevState.has(nodeId)) {

                    return prevState;
                };

                const nextState = new Map(prevState);

                nextState.set(nodeId, { ...message, nodeId });


                return nextState;
            });
        },
    };
}

export { NodeLoggedInObserver };

*/
