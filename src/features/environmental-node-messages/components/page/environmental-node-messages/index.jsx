import { NodeMessagesMonitor } from '../../templates/node-messages-monitor';

import nodes from '@mocks/environmental-nodes/data/node-collection.json';

import { deepCamel } from '@shared-utils/deep-camel';

import './style.css';


function EnvironmentalNodeMessages() {
    const rawMessages = [...nodes, ...nodes, ...nodes];
    const messages = rawMessages.map(deepCamel);


    return (
        <NodeMessagesMonitor messages={messages} />
    );
}

export { EnvironmentalNodeMessages };
