const MQTT_BROKER_HOST = import.meta.env.VITE_MQTT_BROKER_HOST ?? 'ws://localhost:8080';
const MQTT_BROKER_PORT = Number(import.meta.env.VITE_MQTT_BROKER_PORT) || 8080;
const USE_MQTT_MOCK = import.meta.env.VITE_USE_MQTT_MOCK === 'true';

export {
    MQTT_BROKER_HOST,
    MQTT_BROKER_PORT,
    USE_MQTT_MOCK,
};
