import { JsonPunctuation } from '@shared-components/atoms/json-punctuation';
import { JsonEntry } from '@shared-components/molecules/json-entry';

import { INDENT } from '@shared-constants/formatter';

import './style.css';


function JsonObject({ entries, level }) {
    const closingPad = ' '.repeat(level * INDENT);

    const jsonEntries = entries.map(([key, value], index) => (
        <JsonEntry
            key={key}
            name={key}
            value={value}
            level={level}
            isLast={index === entries.length - 1}
        />
    ));


    return (
        <span>
            <JsonPunctuation>{'{'}</JsonPunctuation>
            {'\n'}
            {jsonEntries}
            {closingPad}
            <JsonPunctuation>{'}'}</JsonPunctuation>
        </span>
    );
}

export { JsonObject };
