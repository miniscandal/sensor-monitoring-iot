import { tokenizeFlagValue } from './tokenize-flag-value';

import { COMMAND_PATTERN } from '@modules/environmental-nodes/constants/command-regex.js';


function parseCommandInput(rawInput) {
    const [, command, rawFlags] = rawInput.trim().match(COMMAND_PATTERN);

    if (!command) {
        throw new Error('Command format is invalid or empty');
    }


    return {
        command,
        flags: tokenizeFlagValue(rawFlags),
    };
}

export { parseCommandInput };
