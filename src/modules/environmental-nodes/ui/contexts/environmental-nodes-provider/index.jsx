import { createContext } from 'preact';

import { useEnvNodesPresenceCount } from '@modules/environmental-nodes/ui/hooks/use-env-nodes-presence-count';
import { useEnvNodesPresence } from '@modules/environmental-nodes/ui/hooks/use-env-nodes-presence';

import { environmentalNodesProviderFactory } from '@modules/environmental-nodes/infrastructure/factories/nodes';


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
