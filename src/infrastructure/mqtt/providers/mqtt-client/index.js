import { MqttClientMockAdapter } from '@mocks/mqtt/adapters/client';
import { MqttClientAdapter } from '@infrastructure/mqtt/adapters/mqtt-client';
import { MqttClientEventNotifier } from '@infrastructure/mqtt/notifiers/mqtt-client-event';
import { mqttClientEventSubject } from '@infrastructure/mqtt/subjects/mqtt-client-subject';

import { USE_MQTT_MOCK } from '@shared-constants/mqtt-client-config';


function mqttClientProvider(useMock = USE_MQTT_MOCK) {
    const adapter = useMock ? new MqttClientMockAdapter() : new MqttClientAdapter();

    return new MqttClientEventNotifier(adapter, mqttClientEventSubject);
}

export { mqttClientProvider };
