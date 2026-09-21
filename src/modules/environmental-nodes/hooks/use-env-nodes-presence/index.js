import { useState } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@core/mqtt-client/hooks/use-subscribe-observer';

import { MqttClientStateOfflineObserver } from '@modules/environmental-nodes/observers/node-presence/mqtt-client/state-offline';
import { EnvNodePresenceStateBirthObserver } from '@modules/environmental-nodes/observers/node-presence/state-birth';
import { EnvNodePresenceStateDeathObserver } from '@modules/environmental-nodes/observers/node-presence/state-death';
import { EnvNodeStreamingSensorAllObserver } from '@modules/environmental-nodes/observers/node-streaming-sensors-all';

import { envNodePresenceResetStateListener } from '@modules/environmental-nodes/listeners/node-presence-reset-state';


const mqttClientStateOfflineObserver = MqttClientStateOfflineObserver();
const envNodePresenceStateBirthObserver = EnvNodePresenceStateBirthObserver();
const envNodePresenceStateDeathObserver = EnvNodePresenceStateDeathObserver();
const envNodeStreamingSensorAllObserver = EnvNodeStreamingSensorAllObserver();


function useEnvNodesPresence({ nodes: initialNodes }) {
    const [nodes, setNodes] = useState(new Map(initialNodes));

    useSubscribeObserverMqttClient({
        entity: mqttClientStateOfflineObserver.entity,
        instanceId: mqttClientStateOfflineObserver.instanceId,
        listener: () => setNodes(envNodePresenceResetStateListener),
    });

    useSubscribeObserverMqttClient({
        entity: envNodePresenceStateBirthObserver.entity,
        instanceId: envNodePresenceStateBirthObserver.instanceId,
        listener: ({ data }) => (
            setNodes(prevState => envNodePresenceStateBirthObserver.listener({
                data,
                nodes: prevState,
            }))
        ),
    });

    useSubscribeObserverMqttClient({
        entity: envNodePresenceStateDeathObserver.entity,
        instanceId: envNodePresenceStateDeathObserver.instanceId,
        listener: ({ data }) => (
            setNodes(prevState => envNodePresenceStateDeathObserver.listener({
                data,
                nodes: prevState,
            }))
        ),
    });

    useSubscribeObserverMqttClient({
        entity: envNodeStreamingSensorAllObserver.entity,
        instanceId: envNodeStreamingSensorAllObserver.instanceId,
        listener: ({ data }) => (
            setNodes(prevState => envNodeStreamingSensorAllObserver.listener({
                data,
                nodes: prevState,
            }))
        ),
    });


    return nodes;
}

export { useEnvNodesPresence };
