import { NodeMessagesMonitor } from '../../templates/node-messages-monitor';

import messageCollection from '@mocks/iot-devices/device-collection.json';

import './style.css';


function EnvironmentalNodeMessagesPage() {
    const messages = [...messageCollection, ...messageCollection, ...messageCollection];


    return (
        <NodeMessagesMonitor messages={messages} />
    );
}

export { EnvironmentalNodeMessagesPage };
