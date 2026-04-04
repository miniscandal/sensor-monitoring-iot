import './style.css';


function JsonBoolean({ value }) {

    return (
        <span className="json-boolean">{String(value)}</span>
    );
}

export { JsonBoolean };
