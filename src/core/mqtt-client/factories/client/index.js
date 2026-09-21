import { MqttClientAdapter } from '@core/mqtt-client/adapters/client';
import { MqttClientEventDispatcher } from '@core/mqtt-client/dispatcher/events-client';

import { mqttClientSubject } from '@core/mqtt-client/subjects/mqtt-client-subject';

import { MqttClientMockAdapter } from '@mocks/mqtt-client/adapters/client';

import { USE_MQTT_CLIENT_MOCK } from '@core/mqtt-client/constants/client-config';


function mqttClientProviderFactory(useMock = USE_MQTT_CLIENT_MOCK) {
    const adapter = useMock ? new MqttClientMockAdapter() : new MqttClientAdapter();


    return new MqttClientEventDispatcher(adapter, mqttClientSubject);
}

export { mqttClientProviderFactory };
