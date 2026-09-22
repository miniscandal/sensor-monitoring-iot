import { parseFlag } from './parse-flag';

import { TOKEN_FLAG_VALUE_PATTERN } from '@modules/env-monitoring-nodes/constants/command-regex.js';


function tokenizeFlagValue(rawFlags = '') {
    if (!rawFlags) {

        return {};
    }

    const flagTokens = rawFlags.match(TOKEN_FLAG_VALUE_PATTERN) ?? [];


    return flagTokens.map(parseFlag);
}


export { tokenizeFlagValue };
