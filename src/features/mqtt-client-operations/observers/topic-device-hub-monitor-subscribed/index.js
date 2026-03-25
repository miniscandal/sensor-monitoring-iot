import { OBSERVER_ENTITY_TOPICS } from '@core-constants/observer-entities';

import { IOT_DEVICE_OPERATION_CONNECT } from '@features/iot-devices-operations/constants/operations-code';


function OnTopicDeviceHubMonitorSubscribedObserver() {

    return {
        entity: OBSERVER_ENTITY_TOPICS,
        id: import.meta.env.VITE_TOPIC_HUB_STATUS,
        listener: ({ actions }) => {
            const { publish } = actions;

            publish({
                topic: import.meta.env.VITE_TOPIC_HUB_OPERATION_ALL,
                data: {
                    code: IOT_DEVICE_OPERATION_CONNECT,
                },
            });
        },
    };
}

export { OnTopicDeviceHubMonitorSubscribedObserver };
