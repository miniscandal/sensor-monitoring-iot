import { createContext } from 'preact';

import { useNodesPresenceCount } from '@modules/environmental-nodes/hooks/use-nodes-presence-count';

import { environmentalNodesProviderFactory } from '@infrastructure/environmental-nodes/factories/nodes';
import { useNodesPresence } from '@modules/environmental-nodes/hooks/use-nodes-presence';


const EnvironmentalNodesContext = createContext({
    nodes: new Map(),
});


function EnvironmentalNodesProvider({ children }) {
    const provider = environmentalNodesProviderFactory();
    const { nodes, nodeIds } = provider;

    const value = {
        nodes: useNodesPresence({ nodes }),
        nodesCount: useNodesPresenceCount({ nodeIds }),
    };


    return (
        <EnvironmentalNodesContext.Provider value={value}>
            {children}
        </EnvironmentalNodesContext.Provider>
    );
}

export { EnvironmentalNodesContext, EnvironmentalNodesProvider };
