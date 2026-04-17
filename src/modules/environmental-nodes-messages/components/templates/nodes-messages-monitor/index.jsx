import { MessagesTable } from '../../organisms/messages-table';

import { JsonRenderer } from '@shared-components/organisms/json-renderer';

import { flatStringify } from '@modules/environmental-nodes-messages/utils/flat-stringify';
import { parseMessage } from '@modules/environmental-nodes-messages/utils/parse-message';
import { extractStatus } from '@modules/environmental-nodes-messages/utils/extract-status';

import './style.css';


function NodesMessagesMonitor({ messages }) {
    const rows = messages.map((
        (message, index) => parseMessage(message, index, { extractStatus, flatStringify })
    ));


    return (
        <article class="nodes-messages-monitor">
            <MessagesTable rows={rows} />
            <JsonRenderer json={messages[0]} />
        </article>
    );
}

export { NodesMessagesMonitor };
