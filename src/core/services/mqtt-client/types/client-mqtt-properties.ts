import mqtt from 'mqtt';

type ClientMqttPropertiesType = {
    clientMqtt: string | undefined;
    clientId: string | undefined;
    host: string | undefined;
    protocol: mqtt.MqttProtocol | undefined;
    port: number | undefined;
    subscribe: string | undefined;
    connected: boolean;
};

export { ClientMqttPropertiesType };
