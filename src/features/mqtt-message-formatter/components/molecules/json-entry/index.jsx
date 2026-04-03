import { INDENT } from '@features/mqtt-message-formatter/constants/formatter';
import { JsonKey } from '../../atoms/json-key';
import { JsonPunctuation } from '../../atoms/json-punctuation';
import { JsonValue } from '../json-value';

function JsonEntry({ name, value, level, isLast }) {
    const pad = ' '.repeat((level + 1) * INDENT);


    return (
        <span>
            {pad}
            <JsonKey name={name} />
            <JsonPunctuation>{': '}</JsonPunctuation>
            <JsonValue value={value} level={level + 1} />
            {!isLast && <JsonPunctuation>,</JsonPunctuation>}
            {'\n'}
        </span>
    );
};

export { JsonEntry };
