import { createContext } from 'preact';

import { useNodePresenceCount } from '@modules/environmental-nodes/hooks/use-node-presence-count';

import { environmentalNodesProviderFactory } from '@infrastructure/environmental-nodes/factories/nodes';
import { useNodePresence } from '@modules/environmental-nodes/hooks/use-node-presence';


const EnvironmentalNodesContext = createContext({
    nodes: new Map(),
});


function EnvironmentalNodesProvider({ children }) {
    const provider = environmentalNodesProviderFactory();
    const { nodes, nodeIds } = provider;

    const value = {
        nodes: useNodePresence({ nodes }),
        nodesCount: useNodePresenceCount({ nodeIds }),
    };


    return (
        <EnvironmentalNodesContext.Provider value={value}>
            {children}
        </EnvironmentalNodesContext.Provider>
    );
}

export { EnvironmentalNodesContext, EnvironmentalNodesProvider };
