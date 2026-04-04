import { JsonPunctuation } from '@shared-components/atoms/json-punctuation';
import { JsonValue } from '../json-value';

import { INDENT } from '@shared-constants/formatter';

import './style.css';


function JsonArrayItem({ value, level, isLast }) {
    const pad = ' '.repeat((level + 1) * INDENT);


    return (
        <span>
            {pad}
            <JsonValue value={value} level={level + 1} />
            {!isLast && <JsonPunctuation>,</JsonPunctuation>}
            {'\n'}
        </span>
    );
};

export { JsonArrayItem };
