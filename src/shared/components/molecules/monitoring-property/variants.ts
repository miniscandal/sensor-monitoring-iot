
import { statusBroker } from '@shared-components/atoms/font-icon/variants';
import { host as iconHost } from '@shared-components/atoms/font-icon/variants';
import { port as iconPort } from '@shared-components/atoms/font-icon/variants';
import { protocol as iconProtocol } from '@shared-components/atoms/font-icon/variants';
import { clientId as iconClientId } from '@shared-components/atoms/font-icon/variants';
import { connectedSensors } from '@shared-components/atoms/font-icon/variants';
import { topicSubscribe as iconTopicSubscribe } from '@shared-components/atoms/font-icon/variants';

import { MonitoringPropertyType } from './type';

const clientMqtt: MonitoringPropertyType = {
	text: 'Client MQTT Status',
	fontIcon: statusBroker,
	value: 'disconnected',
	size: undefined,
};

const host: MonitoringPropertyType = {
	text: 'Host',
	fontIcon: iconHost,
	value: 'disconnected',
	size: undefined,
};
const port: MonitoringPropertyType = {
	text: 'Port',
	fontIcon: iconPort,
	value: 'disconnected',
	size: undefined,
};

const protocol: MonitoringPropertyType = {
	text: 'Protocol',
	fontIcon: iconProtocol,
	value: 'disconnected',
	size: undefined,
};
const clientId: MonitoringPropertyType = {
	text: 'ID',
	fontIcon: iconClientId,
	value: 'disconnected',
	size: undefined,
};

const subscribe: MonitoringPropertyType = {
	text: 'Topic Subscribe',
	fontIcon: iconTopicSubscribe,
	value: 'disconnected',
	size: undefined,
};

const sensors: MonitoringPropertyType = {
	text: 'Sensors',
	fontIcon: connectedSensors,
	value: 'disconnected',
	size: undefined,
};

export { clientMqtt, host, port, protocol, clientId, subscribe, sensors };
