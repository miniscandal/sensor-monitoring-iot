import { MqttClientPropertiesType } from './mqtt-client-properties';
import { ReceivedMessageByDevice } from './received-message-by-device';

type ObserverDataType = MqttClientPropertiesType | ReceivedMessageByDevice;

export {
    ObserverDataType,
};
