// import { useMqttClientMessages } from '@features/mqtt-client-messages/hooks/use-messages';

import { Table } from '../../molecules/table';
import { TableColgroup } from '../../molecules/table-colgroup';

import { flatStringify } from '@features/mqtt-client-messages/utils/flat-stringify';
import { parseMessage } from '@features/mqtt-client-messages/utils/parse-message';
import { extractStatus } from '@features/mqtt-client-messages/utils/extract-status';

import { HEADERS, COLUMNS } from '@features/mqtt-client-messages/constants/feed-table';

import messages from '@mocks/iot-devices/device-collection.json';

import './style.css';


function LiveMqttMessageFeed() {
    const rows = [...messages, ...messages, ...messages].map((
        (message, index) => parseMessage(message, index, { extractStatus, flatStringify })
    ));


    return (
        <section class="live-mqtt-message-feed">
            <Table headers={HEADERS} rows={rows}>
                <TableColgroup columns={COLUMNS} />
            </Table>
        </section>
    );
}

export { LiveMqttMessageFeed };
