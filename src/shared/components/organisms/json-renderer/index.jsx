import { JsonValue } from '@shared-components/molecules/json-value';

import './style.css';


function JsonRenderer({ data }) {

    return (
        <pre className="json-renderer">
            <JsonValue value={data} />
        </pre>
    );
}

export { JsonRenderer };
