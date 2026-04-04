import { JsonNull } from '../../atoms/json-null';
import { JsonBoolean } from '../../atoms/json-boolean';
import { JsonString } from '../../atoms/json-string';
import { JsonNumber } from '../../atoms/json-number';
import { JsonArray } from '../../organisms/json-array';
import { JsonObject } from '../../organisms/json-object';


const TYPE_CHECKS = [
    {
        match: (v) => v === null,
        render: () => <JsonNull />,
    },
    {
        match: (v) => Array.isArray(v),
        render: (v, l) => <JsonArray items={v} level={l} />,
    },
    {
        match: (v) => typeof v === 'object',
        render: (v, l) => <JsonObject entries={Object.entries(v)} level={l} />,
    },
    {
        match: (v) => typeof v === 'string',
        render: (v) => <JsonString value={v} />,
    },
    {
        match: (v) => typeof v === 'number',
        render: (v) => <JsonNumber value={v} />,
    },
    {
        match: (v) => typeof v === 'boolean',
        render: (v) => <JsonBoolean value={v} />,
    },
];

export { TYPE_CHECKS };
