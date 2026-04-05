/**
 * Observer triggered when subscribing to the environmental node status topic.
 * Publishes a connect operation to all environmental hub nodes.
 */

import { OBSERVER_ENTITY_TOPICS } from '@core-constants/observer-entities';

import { NODE_OPERATION_CONNECT } from '@shared-constants/operations-code';


function SubscribedEnvironmentalNodeStatusTopicObserver() {

    return {
        entity: OBSERVER_ENTITY_TOPICS,
        id: import.meta.env.VITE_TOPIC_HUB_STATUS,
        listener: ({ actions }) => {
            const { publish } = actions;

            publish({
                topic: import.meta.env.VITE_TOPIC_HUB_OPERATION_ALL,
                data: {
                    code: NODE_OPERATION_CONNECT,
                },
            });
        },
    };
}

export { SubscribedEnvironmentalNodeStatusTopicObserver };
