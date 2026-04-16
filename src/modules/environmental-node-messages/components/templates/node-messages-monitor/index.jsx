import { MessagesTable } from '../../organisms/messages-table';

import { JsonRenderer } from '@shared-components/organisms/json-renderer';

import { flatStringify } from '@modules/environmental-node-messages/utils/flat-stringify';
import { parseMessage } from '@modules/environmental-node-messages/utils/parse-message';
import { extractStatus } from '@modules/environmental-node-messages/utils/extract-status';

import './style.css';


function NodeMessagesMonitor({ messages }) {
    const rows = messages.map((
        (message, index) => parseMessage(message, index, { extractStatus, flatStringify })
    ));


    return (
        <article class="node-messages-monitor">
            <MessagesTable rows={rows} />
            <JsonRenderer json={messages[0]} />
        </article>
    );
}

export { NodeMessagesMonitor };
