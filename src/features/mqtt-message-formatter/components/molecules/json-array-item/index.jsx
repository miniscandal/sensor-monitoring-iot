import { INDENT } from '@features/mqtt-message-formatter/constants/formatter';
import { JsonPunctuation } from '../../atoms/json-punctuation';
import { JsonValue } from '../json-value';


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
