import { MqttClientMockAdapter } from '@mocks/mqtt/adapters/client';
import { MqttClientAdapter } from '@core-mqtt/adapters/client';
import { MqttClientService } from '@domain/mqtt/services/mqtt-client';
import { mqttClientEventSubject } from '@core-mqtt/client-event-subject';


function createMqttService(useMock = false) {
    const adapter = useMock ? new MqttClientMockAdapter() : new MqttClientAdapter();


    return new MqttClientService(adapter, mqttClientEventSubject);
}

export { createMqttService };
