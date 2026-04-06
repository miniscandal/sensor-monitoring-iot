import { JsonKey } from '../../atoms/json-key';
import { JsonPunctuation } from '../../atoms/json-punctuation';

import { JsonToken } from '../json-token';

import { INDENT } from '@shared-constants/formatter';

import './style.css';


function JsonEntry({ name, value, level, isLast }) {
    const pad = ' '.repeat((level + 1) * INDENT);


    return (
        <span>
            {pad}
            <JsonKey name={name} />
            <JsonPunctuation>{': '}</JsonPunctuation>
            <JsonToken token={value} level={level + 1} />
            {!isLast && <JsonPunctuation>,</JsonPunctuation>}
            {'\n'}
        </span>
    );
};

export { JsonEntry };
