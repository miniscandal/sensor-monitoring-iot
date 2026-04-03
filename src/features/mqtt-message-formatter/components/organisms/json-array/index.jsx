import { JsonPunctuation } from '../../atoms/json-punctuation';
import { JsonArrayItem } from '../../molecules/json-array-item';

import { INDENT } from '@features/mqtt-message-formatter/constants/formatter';


function JsonArray({ items, level }) {
    const closingPad = ' '.repeat(level * INDENT);


    return (
        <span>
            <JsonPunctuation>{'['}</JsonPunctuation>
            {'\n'}
            {items.map((item, i) => (
                <JsonArrayItem
                    key={i}
                    value={item}
                    level={level}
                    isLast={i === items.length - 1}
                />
            ))}
            {closingPad}
            <JsonPunctuation>{']'}</JsonPunctuation>
        </span>
    );
};

export { JsonArray };
