import { statusSubscribeClient } from './iot-device-status-codes';
import { statusReadingSensorParameters } from './iot-device-status-codes';


const publishSubscribe = {
    topic: 'sensor-monitoring',
    message: { status: statusSubscribeClient },
};

const publishRequestConnectedSensors = {
    topic: 'sensor',
    message: { command: statusReadingSensorParameters },
};

export {
    publishSubscribe,
    publishRequestConnectedSensors,
};
