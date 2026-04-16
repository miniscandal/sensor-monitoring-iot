import { TableHeader } from '../../organisms/table-header';
import { TableBody } from '../../organisms/table-body';

import './style.css';


function Table({ headers, rows, children }) {

    return (
        <div class="table">
            <table class="table__element">
                {children}
                <TableHeader headers={headers} />
                <TableBody rows={rows} />
            </table>
        </div>
    );
}

export { Table };
