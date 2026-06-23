import { useState } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@infrastructure/mqtt-client/hooks/use-subscribe-observer';

import { MqttClientStateOfflineObserver } from '@modules/environmental-nodes/observers/node-presence/mqtt-client/state-offline';
import { EnvNodePresenceCountStateBirthObserver } from '@modules/environmental-nodes/observers/node-presence-count/state-birth';
import { EnvNodePresenceCountStateDeathObserver } from '@modules/environmental-nodes/observers/node-presence-count/state-death';

import { envNodePresenceCountResetStateListener } from '@modules/environmental-nodes/listeners/node-presence-count-reset-state';


const mqttClientStateOfflineObserver = MqttClientStateOfflineObserver();
const envNodePresenceCountStateBirthObserver = EnvNodePresenceCountStateBirthObserver();
const envNodePresenceCountStateDeathObserver = EnvNodePresenceCountStateDeathObserver();


function useEnvNodesPresenceCount({ nodeIds }) {
    const [connectedNodeIds, setConnectedNodeIds] = useState(new Set(nodeIds));

    useSubscribeObserverMqttClient({
        entity: mqttClientStateOfflineObserver.entity,
        instanceId: mqttClientStateOfflineObserver.instanceId,
        listener: () => setConnectedNodeIds(envNodePresenceCountResetStateListener),
    });

    useSubscribeObserverMqttClient({
        entity: envNodePresenceCountStateBirthObserver.entity,
        instanceId: envNodePresenceCountStateBirthObserver.instanceId,
        listener: ({ data }) => (
            setConnectedNodeIds(envNodePresenceCountStateBirthObserver.listener({
                data,
                nodeIds: connectedNodeIds,
            }))
        ),
    });

    useSubscribeObserverMqttClient({
        entity: envNodePresenceCountStateDeathObserver.entity,
        instanceId: envNodePresenceCountStateDeathObserver.instanceId,
        listener: ({ data }) => (
            setConnectedNodeIds(envNodePresenceCountStateDeathObserver.listener({
                data,
                nodeIds: connectedNodeIds,
            }))
        ),
    });


    return connectedNodeIds.size;
}

export { useEnvNodesPresenceCount };
