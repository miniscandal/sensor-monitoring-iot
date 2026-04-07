import {
    OBSERVER_ENTITY_STATUS_CODES,
    OBSERVER_ENTITY_MQTT_EVENTS,
} from '@core-constants/observer-entities';

import { MQTT_CLIENT_EVENT_MESSAGE } from '@shared-constants/mqtt-client-events';


class MqttClientPublishesService {
    static messages = new Map();

    setMessages(topic, message) {
        MqttClientPublishesService.messages.set(topic, message);
    }

    getMessages() {
        return MqttClientPublishesService.messages;
    }

    static #notify(entity, id, actions, data, mqttClientEventSubject) {
        mqttClientEventSubject.notify({
            entity,
            id,
            actions,
            data,
        });
    }

    static notify(topic, message, mqttClientEventSubject) {
        const data = {
            topic,
            message,
        };

        this.#notify(OBSERVER_ENTITY_MQTT_EVENTS, MQTT_CLIENT_EVENT_MESSAGE, null, data, mqttClientEventSubject); // ✅ Fix 4
        this.#notify(OBSERVER_ENTITY_STATUS_CODES, message.statusCode, null, data, mqttClientEventSubject); // ✅ Fix 4
    }
}

export { MqttClientPublishesService };
