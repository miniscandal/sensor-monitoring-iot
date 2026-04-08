import { NodeMessagesMonitor } from '../../templates/node-messages-monitor';

import messageCollection from '@mocks/environmental-nodes/node-collection.json';

import { deepCamel } from '@shared-utils/deep-camel';

import './style.css';


function EnvironmentalNodeMessages() {
    const rawMessages = [...messageCollection, ...messageCollection, ...messageCollection];

    const messages = rawMessages.map(deepCamel);


    return (
        <NodeMessagesMonitor messages={messages} />
    );
}

export { EnvironmentalNodeMessages };
