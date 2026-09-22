import { MQTT_CLIENT_EVENT_OFFLINE } from '@core/mqtt-client/constants/client-events';

import { ENTITY_MQTT_CLIENT_EVENTS } from '@shared-constants/observer-entities';


function MqttClientStateOfflineObserver() {

    return {
        entity: ENTITY_MQTT_CLIENT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_OFFLINE,
        listener: null,
    };
}

export { MqttClientStateOfflineObserver };
