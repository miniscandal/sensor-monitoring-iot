/*
{
    "node_state_code": 201,
    "operation_result": null,
    "metadata": {
        "node_id": "a001",
        "timestamp": "2026-03-29T21:51:01Z",
        "firmware_version": "1.3.0",
        "location": {
            "lat": 20.5244,
            "lng": -99.8956,
            "zone": "assembly",
            "line": "3",
            "station": "welding robot"
        }
    },
    "data": {
        "sensor_readings": {
            "humidity": 32,
            "temperature": 43
        }
    },
    "connection": {
        "state": "online",
        "reason": "boot"
    }
}
*/

import { signal } from '@preact/signals';

import { OBSERVER_ENTITY_NODE_STATE_CODE } from '@shared-constants/observer-entities';
import { NODE_STATE_LOGGED_IN } from '@infrastructure/environmental-nodes/constants/node-state-codes';


function NodeLoggedInObserver() {

    return {
        entity: OBSERVER_ENTITY_NODE_STATE_CODE,
        instanceId: NODE_STATE_LOGGED_IN,
        listener: ({ data: { message }, nodes }) => {
            const { nodeStateCode, metadata: { nodeId } } = message;
            const node = {
                ...message,
                nodeStateCode: signal(nodeStateCode),
                data: {
                    sensorReadings: {
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

export { NodeLoggedInObserver };
