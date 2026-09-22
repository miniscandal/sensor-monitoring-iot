import { createContext } from 'preact';

import { useEnvNodesPresenceCount } from '@modules/env-monitoring-nodes/ui/hooks/use-env-nodes-presence-count';
import { useEnvNodesPresence } from '@modules/env-monitoring-nodes/ui/hooks/use-env-nodes-presence';

import { environmentalNodesProviderFactory } from '@modules/env-monitoring-nodes/infrastructure/factories/nodes';


const EnvironmentalNodesContext = createContext({
    nodes: new Map(),
    nodesCount: 0,
});


function EnvironmentalNodesProvider({ children }) {
    const provider = environmentalNodesProviderFactory();
    const { nodes, nodeIds } = provider;

    const value = {
        nodes: useEnvNodesPresence({ nodes }),
        nodesCount: useEnvNodesPresenceCount({ nodeIds }),
    };


    return (
        <EnvironmentalNodesContext.Provider value={value}>
            {children}
        </EnvironmentalNodesContext.Provider>
    );
}

export { EnvironmentalNodesContext, EnvironmentalNodesProvider };
