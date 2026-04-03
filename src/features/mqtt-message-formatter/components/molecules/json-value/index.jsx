import { JsonString } from '../../atoms/json-string';
import { JsonNumber } from '../../atoms/json-number';
import { JsonObject } from '../../organisms/json-object';
import { JsonArray } from '../../organisms/json-array';
import { JsonBoolean } from '../../atoms/json-boolean';
import { JsonNull } from '../../atoms/json-null';


function JsonValue({ value, level = 0 }) {
    if (value === null) return <JsonNull />;
    if (Array.isArray(value)) return <JsonArray items={value} level={level} />;
    if (typeof value === 'object') return <JsonObject entries={Object.entries(value)} level={level} />;
    if (typeof value === 'string') return <JsonString value={value} />;
    if (typeof value === 'number') return <JsonNumber value={value} />;
    if (typeof value === 'boolean') return <JsonBoolean value={value} />;

    return null;
};

export { JsonValue };
