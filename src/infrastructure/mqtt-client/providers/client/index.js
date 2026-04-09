import { MqttClientMockAdapter } from '@mocks/mqtt-client/adapters/client';
import { MqttClientAdapter } from '@infrastructure/mqtt-client/adapters/client';
import { MqttClientEventNotifier } from '@infrastructure/mqtt-client/notifiers/event';
import { mqttClientEventSubject } from '@infrastructure/mqtt-client/subjects/mqtt-client-subject';

import { USE_MQTT_CLIENT_MOCK } from '@shared-constants/mqtt-client-config';


function mqttClientProvider(useMock = USE_MQTT_CLIENT_MOCK) {
    const adapter = useMock ? new MqttClientMockAdapter() : new MqttClientAdapter();

    return new MqttClientEventNotifier(adapter, mqttClientEventSubject);
}

export { mqttClientProvider };
