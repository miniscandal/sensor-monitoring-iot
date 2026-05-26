import { safeRound } from '@shared-utils/safe-round';

import { ENTITY_ENV_NODE_STATE_CODE } from '@shared-constants/observer-entities';
import { ENV_NODE_STATE_STREAMING_SENSOR_ALL } from '@shared-constants/env-node-states-codes';


function EnvNodeStreamingSensorAllObserver() {

    return {
        entity: ENTITY_ENV_NODE_STATE_CODE,
        instanceId: ENV_NODE_STATE_STREAMING_SENSOR_ALL,
        listener: ({ data, nodes }) => {
            const { message } = data;
            const { nodeStateCode, metadata, data: { sensorsReadings } } = message;
            const { nodeId } = metadata;
            const { temperature, humidity } = sensorsReadings;
            const node = nodes.get(nodeId);

            node.nodeStateCode.value = nodeStateCode;
            node.data.sensorsReadings.temperature.value = safeRound(temperature);
            node.data.sensorsReadings.humidity.value = safeRound(humidity);


            return nodes;
        },
    };
}

export { EnvNodeStreamingSensorAllObserver };
