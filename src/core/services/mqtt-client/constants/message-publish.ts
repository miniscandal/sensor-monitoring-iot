import { statusSubscribeClient } from '@shared-constants/iot-device-status-codes';
import { statusReadingSensorParameters } from '@shared-constants/iot-device-status-codes';

import { MessagePublishType } from '../types/publish-message-to-device';

const MSG_PUBLISH_SUBSCRIBE: MessagePublishType = {
    topic: 'control-system',
    message: { status: statusSubscribeClient },
};

const MSG_PUBLISH_REQ_CONNECT_SENSORS: MessagePublishType = {
    topic: 'device',
    message: { procedure_code_request: statusReadingSensorParameters },
};

export {
    MSG_PUBLISH_SUBSCRIBE,
    MSG_PUBLISH_REQ_CONNECT_SENSORS,
};
