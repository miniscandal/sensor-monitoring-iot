import mqtt from 'mqtt';

type MqttClientPropertiesType = {
    clientMqtt: string | undefined;
    clientId: string | undefined;
    host: string | undefined;
    protocol: mqtt.MqttProtocol | undefined;
    port: number | undefined;
    subscribe: string | undefined;
    connected: boolean;
};

export { MqttClientPropertiesType };
