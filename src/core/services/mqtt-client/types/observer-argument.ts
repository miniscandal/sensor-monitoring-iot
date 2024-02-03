import { ClientMqttPropertiesType } from './client-mqtt-properties';
import { DeviceParameterType } from './device-parameter';
import { DeviceStatusPropertiesType } from './device-status-properties';
import { ClientMqttSubscribeType } from './client-mqtt-subscribe';

type ObserverArgumentType = ClientMqttPropertiesType | DeviceParameterType | DeviceStatusPropertiesType | ClientMqttSubscribeType;

export { ObserverArgumentType };
