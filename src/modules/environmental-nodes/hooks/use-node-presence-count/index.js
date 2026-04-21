import { useState } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@infrastructure/mqtt-client/hooks/use-subscribe-observer';

import { NodeOfflineCountObserver } from '@modules/environmental-nodes/observers/node-presence-count/offline';
import { NodeLoggedInCountObserver } from '@modules/environmental-nodes/observers/node-presence-count/logged-in';
import { NodeLoggedOutCountObserver } from '@modules/environmental-nodes/observers/node-presence-count/logged-out';


const offlineCountObserver = NodeOfflineCountObserver();
const loggedInCountObserver = NodeLoggedInCountObserver();
const loggedOutCountObserver = NodeLoggedOutCountObserver();


function useNodePresenceCount({ nodeIds }) {
    const [connectedNodeIds, setConnectedNodeIds] = useState(new Set(nodeIds));

    useSubscribeObserverMqttClient({
        entity: offlineCountObserver.entity,
        instanceId: offlineCountObserver.instanceId,
        listener: () => setConnectedNodeIds(offlineCountObserver.listener()),
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

export { useNodePresenceCount };
