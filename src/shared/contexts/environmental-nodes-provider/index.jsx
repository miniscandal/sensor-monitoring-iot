import { createContext } from 'preact';
import { useState } from 'preact/hooks';


const EnvironmentalNodesContext = createContext({
    deviceStatusMap: new Map(),
});


function EnvironmentalNodesProvider({ children }) {
    const [deviceStatusMap, setDeviceStatusMap] = useState(new Map());

    const value = {
        deviceStatusMap,
        setDeviceStatusMap,
    };


    return (
        <EnvironmentalNodesContext.Provider value={value}>
            {children}
        </EnvironmentalNodesContext.Provider>
    );
}

export { EnvironmentalNodesContext, EnvironmentalNodesProvider };
