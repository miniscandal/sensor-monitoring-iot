import { OBSERVER_ENTITY_NODE_STATE_CODE } from '@shared-constants/observer-entities';
import { NODE_STATE_STREAMING_SENSORS } from '@infrastructure/environmental-nodes/constants/node-state-codes';


function NodeStreamingSensorsObserver() {

    return {
        entity: OBSERVER_ENTITY_NODE_STATE_CODE,
        instanceId: NODE_STATE_STREAMING_SENSORS,
        listener: ({ data, nodes, signal }) => {
            const { message } = data;
            const { metadata, data: nodeData } = message;
            const { nodeId } = metadata;
            const { sensorReadings } = nodeData;

            const newState = new Map(nodes);

            const node = newState.get(nodeId);

            const { temperature, humidity } = sensorReadings;

            if (!node) {

                return nodes;
            }


            if (node?.sensorReadings) {
                node.sensorReadings.temperature.value = temperature;
                node.sensorReadings.humidity.value = humidity;


                return nodes;
            }

            newState.set(nodeId, {
                ...node,
                data: {
                    ...nodeData,
                    sensorReadings: {
                        temperature: signal(temperature),
                        humidity: signal(humidity),
                    },
                },
            });


            return newState;
        },
    };
}

export { NodeStreamingSensorsObserver };


/*
import { signal } from '@preact/signals';
import { OBSERVER_ENTITY_NODE_STATE_CODE } from '@shared-constants/observer-entities';
import { OP_RESULT_STREAMING_SENSOR_DATA } from '@shared-constants/node-state-codes';


function NodeStreamingSensorsObserver() {

    return {
        entity: OBSERVER_ENTITY_NODE_STATE_CODE,
        instanceId: OP_RESULT_STREAMING_SENSOR_DATA,

        listener: ({ data }) => {
            const { nodeId, message } = data;
            const { statusCode, ...readings } = message;


            setNodes(prevState => {
                const nextState = new Map(prevState);
                const node = nextState.get(nodeId);

                if (!node) {

                    return prevState;
                }

                const { temperature, humidity } = readings.sensorReadings;

                if (node.sensorReadings) {
                    node.sensorReadings.temperature.value = readings.sensorReadings.temperature;
                    node.sensorReadings.humidity.value = readings.sensorReadings.humidity;

                    nextState.set(nodeId, { ...node, statusCode });
                } else {
                    const sensorReadings = {
                        temperature: signal(temperature),
                        humidity: signal(humidity),
                    };

                    nextState.set(nodeId, { ...node, statusCode, sensorReadings });
                }


                return nextState;
            });
        },
    };
}

export { NodeStreamingSensorsObserver };

*/
