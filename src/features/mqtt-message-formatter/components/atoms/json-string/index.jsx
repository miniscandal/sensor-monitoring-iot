import './style.css';

function JsonString({ value }) {

    return (
        <span className="json-string">{JSON.stringify(value)}</span>
    );
}

export { JsonString };
