// import { useMqttClientMessages } from '@features/mqtt-client-messages/hooks/use-messages';

import { Table } from '../../molecules/table';
import { TableColgroup } from '../../molecules/table-colgroup';

import messages from '.././../../mocks/messages-device-hub.json';

import './style.css';



function LiveMqttMessageFeed() {
    // const messages = useMqttClientMessages();
    // const data = messages.map(message => JSON.stringify(message));

    const headers = [
        'timestamp',
        'status_code',
        'message_summary',
    ];

    const rows = [...messages, ...messages, ...messages].map((message, index) => {
        const { metadata: { timestamp } } = message;


        return {
            key: `${timestamp}-${index}`,
            cells: [
                timestamp,
                message.data.statusCode,
                message.data.logSummary,
            ],
        };
    });

    const columns = [
        {
            span: 1,
            class: 'table__column--timestamp',

        },
        {
            span: 1,
            class: 'table__column--status-code',

        },
        {
            span: 1,
            class: 'table__column--message-summary',

        },
    ];


    return (
        <section class="live-mqtt-message-feed">
            <Table headers={headers} rows={rows}>
                <TableColgroup columns={columns} />
            </Table>
        </section>
    );
}

export { LiveMqttMessageFeed };
