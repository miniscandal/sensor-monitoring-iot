import { createContext } from 'preact';
import { useState } from 'preact/hooks';

import mocksIoTDevices from '@mocks/iot-device/context-iot-devices.json';


const IoTDevicesContext = createContext({
    iotDevices: new Map(
        mocksIoTDevices.map(iotDevice => [iotDevice.deviceId, iotDevice]),
    ),
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
