/**
 * Module responsibility
 * 
 */

class MqttClientRepository {
    constructor(client) {
        this.client = client;
    }

    getProperties() {
        const { connected, options } = this.client;
        const { clientId, host, port, protocol } = options;

        return {
            clientMqtt: connected ? 'Connected' : undefined,
            host,
            port,
            protocol,
            clientId,
            connected,
        };
    }
}

export { MqttClientRepository };
