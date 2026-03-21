/**
 * Module responsibility
 * 
 * ✰ Update session map on login and logout events
 * ✰ Clear all sessions when client goes offline
 *
 */

import { useMemo, useContext } from 'preact/hooks';

import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import { IoTDevicesContext } from '@shared-contexts/iot-devices-provider';

import { OnDeviceHubPresenceObserver } from '@features/iot-devices-operations/observers/device-hub-presence';


function useDeviceHubPresence() {
    const { setDeviceStatusMap } = useContext(IoTDevicesContext);

    const actions = useMemo(() => ({
        onLogin: (deviceData) => {
            setDeviceStatusMap(prevState => {
                if (prevState.has(deviceData.deviceId)) {

                    return prevState;
                };

                const nextState = new Map(prevState);

                nextState.set(deviceData.deviceId, deviceData);


                return nextState;
            });
        },
        onLogout: (deviceId) => {
            setDeviceStatusMap(prevState => {
                const nextState = new Map(prevState);

                nextState.delete(deviceId);


                return nextState;
            });
        },
        onConnectionLost: () => {
            setDeviceStatusMap(new Map());
        },
    }), [setDeviceStatusMap]);

    useMqttClientEvents(OnDeviceHubPresenceObserver({ actions }));
}

export { useDeviceHubPresence };
