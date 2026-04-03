import { JsonPunctuation } from '../../atoms/json-punctuation';
import { JsonEntry } from '../../molecules/json-entry';

import { INDENT } from '@features/mqtt-message-formatter/constants/formatter';


function JsonObject({ entries, level }) {
    const closingPad = ' '.repeat(level * INDENT);


    return (
        <span>
            <JsonPunctuation>{'{'}</JsonPunctuation>
            {'\n'}
            {entries.map(([key, value], i) => (
                <JsonEntry
                    key={key}
                    name={key}
                    value={value}
                    level={level}
                    isLast={i === entries.length - 1}
                />
            ))}
            {closingPad}
            <JsonPunctuation>{'}'}</JsonPunctuation>
        </span>
    );
};

export { JsonObject };
