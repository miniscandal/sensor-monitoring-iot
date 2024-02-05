import { OBSERVER_ID_CONNECTED_SENSOR } from "@shared-custom-hooks/useMqttClientProperties/constants/observer-id";

const NOTIFY_OBSERVER_DEVICE_CONNECTED = {
    observerId: OBSERVER_ID_CONNECTED_SENSOR,
    deviceMessage: {
        device_id: undefined,
        status_code: undefined,
        procudure_code: undefined,
    },
};

export { NOTIFY_OBSERVER_DEVICE_CONNECTED };
