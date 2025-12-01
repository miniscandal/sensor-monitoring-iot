import { createContext } from 'preact';
import { useState } from 'preact/hooks';


const IoTDevicesContext = createContext({
    iotDevices: new Map(),
});


function IoTDeviceProvider({ children }) {
    const [iotDevices, setIoTDevices] = useState(new Map());

    const value = {
        iotDevices,
        setIoTDevices,
    };


    return (
        <IoTDevicesContext.Provider value={value}>
            {children}
        </IoTDevicesContext.Provider>
    );
}

export { IoTDevicesContext, IoTDeviceProvider };
