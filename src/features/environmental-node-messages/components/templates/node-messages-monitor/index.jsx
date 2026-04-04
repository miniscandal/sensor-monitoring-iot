import { MessagesTable } from '../../organisms/messages-table';
import { JsonRenderer } from '@shared-components/organisms/json-renderer';

import raw from '@mocks/iot-devices/mqtt-messages/plain-text/connection.txt?raw';

import './style.css';


function NodeMessagesMonitor() {

    return (
        <article class="node-messages-monitor">
            <MessagesTable />
            <JsonRenderer data={JSON.parse(raw)} />
        </article>
    );
}

export { NodeMessagesMonitor };
