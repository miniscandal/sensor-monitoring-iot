import { useState, useMemo } from 'preact/hooks';
import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import { OnDeviceHubMessageReceivedObserver } from '@features/iot-devices-operations/observers/device-hub-message-received';


function useIoTDeviceSessionCount() {
    const [connectedDeviceIds, setConnectedDeviceIds] = useState([]);

    const actions = useMemo(() => ({
        onDeviceLogin: (id) => {
            setConnectedDeviceIds(prevState => prevState.includes(id) ? prevState : [...prevState, id]);
        },
        onDeviceLogout: (id) => {
            setConnectedDeviceIds(prevState => prevState.filter(deviceId => deviceId !== id));
        },
        onConnectionLost: () => {
            setConnectedDeviceIds([]);
        },
    }), []);

    useMqttClientEvents(OnDeviceHubMessageReceivedObserver({ actions }));


    return connectedDeviceIds.length;
}

export { useIoTDeviceSessionCount };
