import { TableHeaderCell } from '../../atoms/table-header-cell';

import './style.css';


function TableHeader({ headers }) {
    const tableHeaderCells = headers.map(header => <TableHeaderCell key={header} header={header} />);


    return (
        <thead class="table-header">
            <tr>
                {tableHeaderCells}
            </tr>
        </thead>
    );
}

export { TableHeader };
