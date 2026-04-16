import { TableCell } from '../../atoms/table-cell';

import './style.css';


function TableRow({ cells }) {
    const tableCells = cells.map((value, index) => <TableCell key={`${value}-${index}`} value={value} />);


    return (
        <tr class="table-row">
            {tableCells}
        </tr>
    );
}

export { TableRow };
