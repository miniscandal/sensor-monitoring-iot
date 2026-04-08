import { MqttClientMockAdapter } from '@mocks/mqtt/adapters/client';
import { MqttClientAdapter } from '@infrastructure/mqtt/adapters/mqtt-client';
import { MqttClientEventNotifier } from '@infrastructure/mqtt/notifiers/mqtt-client-event';
import { mqttClientEventSubject } from '@infrastructure/mqtt/subjects/mqtt-client-subject';


function createMqttService(useMock = false) {
    const adapter = useMock ? new MqttClientMockAdapter() : new MqttClientAdapter();


    return new MqttClientEventNotifier(adapter, mqttClientEventSubject);
}

export { createMqttService };
