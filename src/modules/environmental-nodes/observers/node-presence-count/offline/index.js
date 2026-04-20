import { OBSERVER_ENTITY_MQTT_EVENTS } from '@shared-constants/observer-entities';
import { MQTT_CLIENT_EVENT_OFFLINE } from '@infrastructure/mqtt-client/constants/client-events';


function NodeOfflineCountObserver() {
    return {
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => new Set(),
    };
}

export { NodeOfflineCountObserver };
