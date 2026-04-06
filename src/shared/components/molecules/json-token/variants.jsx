import { JsonNull } from '@shared-components/atoms/json-null';
import { JsonBoolean } from '@shared-components/atoms/json-boolean';
import { JsonString } from '@shared-components/atoms/json-string';
import { JsonNumber } from '@shared-components/atoms/json-number';
import { JsonArray } from '@shared-components/organisms/json-array';
import { JsonObject } from '@shared-components/organisms/json-object';


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
