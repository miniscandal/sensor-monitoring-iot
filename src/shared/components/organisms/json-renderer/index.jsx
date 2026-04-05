import { JsonValue } from '@shared-components/molecules/json-value';

import './style.css';


function JsonRenderer({ json }) {

    return (
        <pre className="json-renderer">
            <JsonValue value={json} />
        </pre>
    );
}

export { JsonRenderer };
