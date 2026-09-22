import { normalizeValue } from './normalize-value';

import { FLAG_PATTERN } from '@modules/env-monitoring-nodes/constants/command-regex';


function parseFlag(token) {
    const [, name, rawValue] = token.match(FLAG_PATTERN) || [];

    if (!name) {
        throw new Error(`Flag must use the format -name=value: ${token}`);
    }


    return {
        name,
        value: normalizeValue(rawValue),
    };
}

export { parseFlag };
