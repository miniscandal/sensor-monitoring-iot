import { MqttClientPropertiesType } from './mqtt-client-properties';
import { ReceivedMessageByDeviceType } from './received-message-by-device';

type ObserverDataType = MqttClientPropertiesType | ReceivedMessageByDeviceType;

export {
    ObserverDataType,
};
