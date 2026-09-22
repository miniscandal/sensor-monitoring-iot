import { createContext } from 'preact';

import { useEnvNodesPresenceCount } from '@modules/env-monitoring-nodes/ui/hooks/use-env-nodes-presence-count';
import { useEnvNodesPresence } from '@modules/env-monitoring-nodes/ui/hooks/use-env-nodes-presence';

import { envMonitoringNodesProviderFactory } from '@modules/env-monitoring-nodes/infrastructure/factories/nodes';


const EnvMonitoringNodesContext = createContext({
    nodes: new Map(),
    nodesCount: 0,
});


function EnvMonitoringNodesProvider({ children }) {
    const provider = envMonitoringNodesProviderFactory();
    const { nodes, nodeIds } = provider;

    const value = {
        nodes: useEnvNodesPresence({ nodes }),
        nodesCount: useEnvNodesPresenceCount({ nodeIds }),
    };


    return (
        <EnvMonitoringNodesContext.Provider value={value}>
            {children}
        </EnvMonitoringNodesContext.Provider>
    );
}

export { EnvMonitoringNodesContext, EnvMonitoringNodesProvider };
