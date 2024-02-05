import { MqttClientProperties } from '@core-services/mqtt-client/types/mqtt-client-properties';

const MQTT_CLIENT_PROPERTIES: MqttClientProperties = {
    clientMqtt: undefined,
    clientId: undefined,
    host: undefined,
    protocol: undefined,
    port: undefined,
    subscribe: undefined,
    connected: false,
};

export { MQTT_CLIENT_PROPERTIES };
