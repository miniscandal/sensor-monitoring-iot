import { JsonPunctuation } from '../../atoms/json-punctuation';
import { JsonArrayItem } from '../../molecules/json-array-item';

import { INDENT } from '@features/mqtt-message-formatter/constants/formatter';

import './style.css';


function JsonArray({ items, level }) {
    const closingPad = ' '.repeat(level * INDENT);

    const jsonArrayItems = items.map((item, index) => (
        <JsonArrayItem
            key={index}
            value={item}
            level={level}
            isLast={index === items.length - 1}
        />
    ));


    return (
        <span>
            <JsonPunctuation>{'['}</JsonPunctuation>
            {'\n'}
            {jsonArrayItems}
            {closingPad}
            <JsonPunctuation>{']'}</JsonPunctuation>
        </span>
    );
}

export { JsonArray };
