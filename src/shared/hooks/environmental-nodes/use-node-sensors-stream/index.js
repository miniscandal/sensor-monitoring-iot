import { signal } from '@preact/signals';
import { useContext } from 'preact/hooks';

import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import { EnvironmentalNodesContext } from '@shared-contexts/environmental-nodes-provider';

import { OBSERVER_ENTITY_STATUS_CODES } from '@shared-constants/observer-entities';

import { OP_RESULT_STREAMING_SENSOR_DATA } from '@shared-constants/node-status-codes';


function useNodeSensorsStream() {
    const { setNodes } = useContext(EnvironmentalNodesContext);


    useMqttClientEvents({
        entity: OBSERVER_ENTITY_STATUS_CODES,
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
    });
}

export { useNodeSensorsStream };
