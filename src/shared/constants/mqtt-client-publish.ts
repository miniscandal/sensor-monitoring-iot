import { statusSubscribeClient } from './mqttt-client-status-codes';
import { statusReadingSensorParameters } from './mqttt-client-status-codes';

const publishSubscribe = {
	topic: 'sensor-monitoring',
	message: { status: statusSubscribeClient }
}
const publishRequestConnectedSensors = {
	topic: 'sensor',
	message: { command: statusReadingSensorParameters }
}

export {
	publishSubscribe,
	publishRequestConnectedSensors
};
