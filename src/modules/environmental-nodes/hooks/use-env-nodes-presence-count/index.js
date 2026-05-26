import { useState } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@infrastructure/mqtt-client/hooks/use-subscribe-observer';

import { MqttClientStateOfflineObserver } from '@modules/environmental-nodes/observers/node-presence/mqtt-client/state-offline';
import { EnvNodePresenceCountStateBirthObserver } from '@modules/environmental-nodes/observers/node-presence-count/state-birth';
import { EnvNodePresenceCountStateDeathObserver } from '@modules/environmental-nodes/observers/node-presence-count/state-death';

import { envNodePresenceCountResetStateListener } from '@modules/environmental-nodes/listeners/node-presence-count-reset-state';


const mqttClientStateOfflineObserver = MqttClientStateOfflineObserver();
const loggedInCountObserver = EnvNodePresenceCountStateBirthObserver();
const loggedOutCountObserver = EnvNodePresenceCountStateDeathObserver();


function useEnvNodesPresenceCount({ nodeIds }) {
    const [connectedNodeIds, setConnectedNodeIds] = useState(new Set(nodeIds));

    useSubscribeObserverMqttClient({
        entity: mqttClientStateOfflineObserver.entity,
        instanceId: mqttClientStateOfflineObserver.instanceId,
        listener: () => setConnectedNodeIds(envNodePresenceCountResetStateListener),
    });

    useSubscribeObserverMqttClient({
        entity: loggedInCountObserver.entity,
        instanceId: loggedInCountObserver.instanceId,
        listener: ({ data }) => (
            setConnectedNodeIds(loggedInCountObserver.listener({ data, nodeIds: connectedNodeIds }))
        ),
    });

    useSubscribeObserverMqttClient({
        entity: loggedOutCountObserver.entity,
        instanceId: loggedOutCountObserver.instanceId,
        listener: ({ data }) => (
            setConnectedNodeIds(loggedOutCountObserver.listener({ data, nodeIds: connectedNodeIds }))
        ),
    });


    return connectedNodeIds.size;
}

export { useEnvNodesPresenceCount };
