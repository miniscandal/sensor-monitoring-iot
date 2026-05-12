import { useState } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@infrastructure/mqtt-client/hooks/use-subscribe-observer';

import { NodeLoggedInObserver } from '@modules/environmental-nodes/observers/node-presence/logged-in';
import { NodeLoggedOutObserver } from '@modules/environmental-nodes/observers/node-presence/logged-out';
import { NodeStreamingSensorsObserver } from '@modules/environmental-nodes/observers/streaming-sensors';
import { NodeMonitorOfflineObserver } from '@modules/environmental-nodes/observers/node-monitor/offline';


const offlineObserver = NodeMonitorOfflineObserver();
const loggedInObserver = NodeLoggedInObserver();
const loggedOutObserver = NodeLoggedOutObserver();
const streamingSensorsObserver = NodeStreamingSensorsObserver();


function useNodesPresence({ nodes: initialNodes }) {
    const [nodes, setNodes] = useState(new Map(initialNodes));

    useSubscribeObserverMqttClient({
        entity: offlineObserver.entity,
        instanceId: offlineObserver.instanceId,
        listener: () => setNodes(offlineObserver.listener()),
    });

    useSubscribeObserverMqttClient({
        entity: loggedInObserver.entity,
        instanceId: loggedInObserver.instanceId,
        listener: ({ data }) => (
            setNodes(prevState => loggedInObserver.listener({ data, nodes: prevState }))
        ),
    });

    useSubscribeObserverMqttClient({
        entity: loggedOutObserver.entity,
        instanceId: loggedOutObserver.instanceId,
        listener: ({ data }) => (
            setNodes(prevState => loggedOutObserver.listener({ data, nodes: prevState }))
        ),
    });

    useSubscribeObserverMqttClient({
        entity: streamingSensorsObserver.entity,
        instanceId: streamingSensorsObserver.instanceId,
        listener: ({ data }) => (
            setNodes(prevState => streamingSensorsObserver.listener({ data, nodes: prevState }))
        ),
    });


    return nodes;
}

export { useNodesPresence };
