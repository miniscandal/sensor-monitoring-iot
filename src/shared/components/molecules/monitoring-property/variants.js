import {
	statusBroker,
	connectedSensors,
	host as iconHost,
	port as iconPort,
	protocol as iconProtocol,
	clientId as iconClientId,
	topicSubscribe as iconTopicSubscribe
} from '@shared-components/atoms/font-icon/variants';

import * as propiertes from '@shared-constants/mqtt-client-properties';

const clientMqtt = {
	text: 'Client MQTT',
	fontIcon: statusBroker,
	value: propiertes.clientMqtt
};
const sensors = {
	text: 'Sensors',
	fontIcon: connectedSensors,
	value: propiertes.sensors
};
const host = {
	text: 'Host',
	fontIcon: iconHost,
	value: propiertes.host
};
const port = {
	text: 'Port',
	fontIcon: iconPort,
	value: propiertes.port
};

const protocol = {
	text: 'Protocol',
	fontIcon: iconProtocol,
	value: propiertes.protocol
};
const clientId = {
	text: 'Client ID',
	fontIcon: iconClientId,
	value: propiertes.clientId
};
const subscribe = {
	text: 'Topic Subscribe',
	fontIcon: iconTopicSubscribe,
	value: propiertes.subscribe
}

export {
	clientMqtt,
	sensors,
	host,
	port,
	protocol,
	clientId,
	subscribe
};
