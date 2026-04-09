import { createContext } from 'preact';
import { useState } from 'preact/hooks';
import { useConnectedNodesCount } from '@features/environmental-nodes/hooks/use-connected-nodes-count';

import { environmentalNodesProviderFactory } from '@infrastructure/environmental-nodes/factories/nodes';


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


    return (
        <EnvironmentalNodesContext.Provider value={value}>
            {children}
        </EnvironmentalNodesContext.Provider>
    );
}

export { EnvironmentalNodesContext, EnvironmentalNodesProvider };
