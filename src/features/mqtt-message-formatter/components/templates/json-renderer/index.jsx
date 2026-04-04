import { JsonValue } from '../../molecules/json-value';

import raw from '@mocks/iot-devices/mqtt-messages/plain-text/connection.txt?raw';

import './style.css';


function JsonRenderer() {

    return (
        <pre className="json-renderer">
            <JsonValue value={JSON.parse(raw)} />
        </pre>
    );
}

export { JsonRenderer };
