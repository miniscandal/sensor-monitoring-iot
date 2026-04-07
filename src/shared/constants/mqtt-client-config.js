const MQTT_BROKER_HOST = import.meta.env.VITE_MQTT_BROKER_HOST ?? 'ws://localhost:8080';
const MQTT_BROKER_PORT = Number(import.meta.env.VITE_MQTT_BROKER_PORT) || 8080;


export { MQTT_BROKER_HOST, MQTT_BROKER_PORT };
