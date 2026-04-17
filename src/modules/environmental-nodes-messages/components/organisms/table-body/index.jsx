import { TableRow } from '../../molecules/table-row';

import './style.css';


function TableBody({ rows }) {
    const tableRows = rows.map(row => <TableRow key={row.key} cells={row.cells} />);


    return (
        <tbody class="table-body">
            {tableRows}
        </tbody>
    );
}

export { TableBody };
