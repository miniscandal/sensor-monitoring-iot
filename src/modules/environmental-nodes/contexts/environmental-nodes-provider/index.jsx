import { createContext } from 'preact';
import { useState } from 'preact/hooks';
import { signal } from '@preact/signals';

import { useConnectedNodesCount } from '@modules/environmental-nodes/hooks/use-connected-nodes-count';

import { environmentalNodesProviderFactory } from '@infrastructure/environmental-nodes/factories/nodes';
import { useSubscribeObserverMqttClient } from '@infrastructure/mqtt-client/hooks/use-subscribe-observer';

import { NodeLoggedInObserver } from '@modules/environmental-nodes/observers/node-presence/logged-in';
import { NodeLoggedOutObserver } from '@modules/environmental-nodes/observers/node-presence/logged-out';
import { NodeStreamingSensorsObserver } from '@modules/environmental-nodes/observers/streaming-sensors';
import { NodeMonitorOfflineObserver } from '@modules/environmental-nodes/observers/node-monitor/offline';


const offlineObserver = NodeMonitorOfflineObserver();
const loggedInObserver = NodeLoggedInObserver();
const loggedOutObserver = NodeLoggedOutObserver();
const streamingSensorsObserver = NodeStreamingSensorsObserver();

const EnvironmentalNodesContext = createContext({
    nodes: new Map(),
});


function EnvironmentalNodesProvider({ children }) {
    const provider = environmentalNodesProviderFactory();
    const { nodes: initialNodes, nodeIds } = provider;

    const [nodes, setNodes] = useState(new Map(initialNodes));
    const connectedCount = useConnectedNodesCount({ nodeIds });

    const value = {
        nodes,
        setNodes,
        connectedCount,
    };

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
            setNodes(prevState => streamingSensorsObserver.listener({ data, nodes: prevState, signal }))
        ),
    });


    return (
        <EnvironmentalNodesContext.Provider value={value}>
            {children}
        </EnvironmentalNodesContext.Provider>
    );
}

export { EnvironmentalNodesContext, EnvironmentalNodesProvider };
