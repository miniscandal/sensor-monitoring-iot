import { NodesMessagesMonitor } from '../../templates/nodes-messages-monitor';

import nodes from '@mocks/environmental-nodes/data/node-collection.json';

import { deepCamel } from '@shared-utils/deep-camel';

import './style.css';


function EnvironmentalNodesMessages() {
    const rawMessages = [...nodes, ...nodes, ...nodes];
    const messages = rawMessages.map(deepCamel);


    return (
        <NodesMessagesMonitor messages={messages} />
    );
}

export { EnvironmentalNodesMessages };
