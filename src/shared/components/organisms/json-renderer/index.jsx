import { JsonToken } from '@shared-components/molecules/json-token';

import './style.css';


function JsonRenderer({ json }) {

    return (
        <pre className="json-renderer">
            <JsonToken token={json} />
        </pre>
    );
}

export { JsonRenderer };
