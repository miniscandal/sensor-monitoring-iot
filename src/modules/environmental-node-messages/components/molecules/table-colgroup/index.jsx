import './style.css';


function TableColgroup({ columns }) {
    const cols = columns.map((column, index) => (
        <col key={`${column.class}-${index}`} span={column.span} class={column.class} />
    ));


    return (
        <colgroup class="table-colgroup">
            {cols}
        </colgroup>
    );
}

export { TableColgroup };
