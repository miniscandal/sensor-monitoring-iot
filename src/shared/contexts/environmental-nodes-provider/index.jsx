import { createContext } from 'preact';
import { useState } from 'preact/hooks';

import nodeMocks from '@mocks/environmental-nodes/node-collection.json';
import { deepCamel } from '@shared-utils/deep-camel';


const mocks = nodeMocks.map(deepCamel).map(node => [node.metadata.nodeId, node]);

const EnvironmentalNodesContext = createContext({
    nodes: new Map(),
});


function EnvironmentalNodesProvider({ children }) {
    const [nodes, setNodes] = useState(new Map(mocks));
    const value = {
        nodes,
        setNodes,
    };


    return (
        <EnvironmentalNodesContext.Provider value={value}>
            {children}
        </EnvironmentalNodesContext.Provider>
    );
}

export { EnvironmentalNodesContext, EnvironmentalNodesProvider };
