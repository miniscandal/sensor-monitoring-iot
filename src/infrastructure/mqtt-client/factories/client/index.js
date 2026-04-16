import { MqttClientMockAdapter } from '@mocks/mqtt-client/adapters/client';
import { MqttClientAdapter } from '@infrastructure/mqtt-client/adapters/client';
import { MqttClientEventDispatcher } from '@infrastructure/mqtt-client/dispatcher/events-client';
import { mqttClientSubject } from '@infrastructure/mqtt-client/subjects/mqtt-client-subject';

import { USE_MQTT_CLIENT_MOCK } from '@shared-constants/mqtt-client-config';


function mqttClientProviderFactory(useMock = USE_MQTT_CLIENT_MOCK) {
    const adapter = useMock ? new MqttClientMockAdapter() : new MqttClientAdapter();


    return new MqttClientEventDispatcher(adapter, mqttClientSubject);
}

export { mqttClientProviderFactory };
