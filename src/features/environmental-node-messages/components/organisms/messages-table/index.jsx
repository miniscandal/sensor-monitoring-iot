// import { useMqttClientMessages } from '@features/mqtt-client-messages/hooks/use-messages';

import { Table } from '../../molecules/table';
import { TableColgroup } from '../../molecules/table-colgroup';

import { HEADERS, COLUMNS } from '@features/environmental-node-messages/constants/feed-table';

import './style.css';


function MessagesTable({ rows }) {


    return (
        <section class="messages-table">
            <Table headers={HEADERS} rows={rows}>
                <TableColgroup columns={COLUMNS} />
            </Table>
        </section>
    );
}

export { MessagesTable };
