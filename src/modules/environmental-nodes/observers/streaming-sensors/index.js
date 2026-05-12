import { safeRound } from '@shared-utils/safe-round';

import { OBSERVER_ENTITY_NODE_STATE_CODE } from '@shared-constants/observer-entities';
import { NODE_STATE_STREAMING_SENSORS } from '@infrastructure/environmental-nodes/constants/node-state-codes';


function NodeStreamingSensorsObserver() {

    return {
        entity: OBSERVER_ENTITY_NODE_STATE_CODE,
        instanceId: NODE_STATE_STREAMING_SENSORS,
        listener: ({ data, nodes }) => {
            const { message } = data;
            const { nodeStateCode, metadata, data: { sensorReadings } } = message;
            const { nodeId } = metadata;
            const { temperature, humidity } = sensorReadings;

            const node = nodes.get(nodeId);

            node.nodeStateCode.value = nodeStateCode;
            node.data.sensorReadings.temperature.value = safeRound(temperature);
            node.data.sensorReadings.humidity.value = safeRound(humidity);


            return nodes;
        },
    };
}

export { NodeStreamingSensorsObserver };
