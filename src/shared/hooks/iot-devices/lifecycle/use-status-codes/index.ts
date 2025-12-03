import { useContext } from 'preact/hooks';

import { useMqttClientEventSubject } from '@shared-hooks/mqtt-client/use-mqtt-observer';

import { IoTDevicesContext } from '@shared-contexts/iot-devices-provider';

import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';

import { IOT_DEVICE_STATUS_CONNECTED } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_ACTIVATED } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_INACTIVE } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_IDLE } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_DISCONNECTED } from '@shared-constants/iot-device-status-codes';


function useIoTDevicesStatusLifecycle() {
    const { setDeviceStatusMap } = useContext(IoTDevicesContext);

    useMqttClientEventSubject({
        events: [MQTT_CLIENT_EVENT_MESSAGE, MQTT_CLIENT_EVENT_OFFLINE],
        statusCodes: [
            IOT_DEVICE_STATUS_CONNECTED,
            IOT_DEVICE_STATUS_ACTIVATED,
            IOT_DEVICE_STATUS_INACTIVE,
            IOT_DEVICE_STATUS_IDLE,
            IOT_DEVICE_STATUS_DISCONNECTED,
        ],
        observer: (event, { deviceId, statusCode, ...metadata }) => {
            if (event === MQTT_CLIENT_EVENT_OFFLINE) {
                setDeviceStatusMap(new Map());


                return;
            }

            setDeviceStatusMap(prevState => {
                const nextState = new Map(prevState);

                switch (statusCode) {
                    case IOT_DEVICE_STATUS_CONNECTED: {
                        if (nextState.has(deviceId)) {

                            return prevState;
                        }

                        nextState.set(deviceId, { deviceId, statusCode, ...metadata });


                        return nextState;
                    }
                    case IOT_DEVICE_STATUS_DISCONNECTED:
                        nextState.delete(deviceId);


                        return nextState;
                    default:

                        return prevState;
                }
            });
        },
    });
}

export { useIoTDevicesStatusLifecycle };
