import { createContext } from 'preact';
import { useState } from 'preact/hooks';


const IoTDevicesContext = createContext({
    deviceStatusMap: new Map(),
});

function IoTDevicesProvider({ children }) {
    const [deviceStatusMap, setDeviceStatusMap] = useState(new Map());

    const value = {
        deviceStatusMap,
        setDeviceStatusMap,
    };


    return (
        <IoTDevicesContext.Provider value={value}>
            {children}
        </IoTDevicesContext.Provider>
    );
}

export { IoTDevicesContext, IoTDevicesProvider };
