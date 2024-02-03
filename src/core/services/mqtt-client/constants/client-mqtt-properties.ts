import { ClientMqttPropertiesType } from '@core-services/mqtt-client/types/client-mqtt-properties';

const CLIENT_MQTT_PROPERTIES: ClientMqttPropertiesType = {
    clientMqtt: undefined,
    clientId: undefined,
    host: undefined,
    protocol: undefined,
    port: undefined,
    subscribe: undefined,
    connected: false,
};

export { CLIENT_MQTT_PROPERTIES };
