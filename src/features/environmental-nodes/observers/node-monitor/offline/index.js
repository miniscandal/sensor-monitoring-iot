import { OBSERVER_ENTITY_MQTT_EVENTS } from '@shared-constants/observer-entities';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@shared-constants/mqtt-client-events';


function NodeMonitorOfflineObserver() {

    return {
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => new Map(),
    };
}

export { NodeMonitorOfflineObserver };


/*
import { OBSERVER_ENTITY_MQTT_EVENTS } from '@shared-constants/observer-entities';


function NodeMonitorOfflineObserver() {

    return {
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setNodes(new Map()),
    };
}

export { NodeMonitorOfflineObserver };
*/
