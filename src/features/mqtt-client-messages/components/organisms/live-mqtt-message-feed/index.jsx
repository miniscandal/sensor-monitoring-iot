// import { useMqttClientMessages } from '@features/mqtt-client-messages/hooks/use-messages';

import { Table } from '../../molecules/table';

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


    return (
        <section class="live-mqtt-message-feed">
            <Table headers={headers} rows={rows}>
                <colgroup>
                    <col class="table__column--timestamp" />
                    <col />
                    <col class="table__column--log-summary" />
                </colgroup>
            </Table>
        </section>
    );
}

export { LiveMqttMessageFeed };
