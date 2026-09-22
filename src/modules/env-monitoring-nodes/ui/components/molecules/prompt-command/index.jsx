import { Label } from '@shared-components/atoms/label';

import { classNames } from '@shared-utils/class-names';

import './style.css';


function PromptCommand({ prompt, command, isError }) {

    return (
        <div class={classNames('prompt-command', isError && 'syntax-error')}>
            <Label text={prompt} />
            <Label text={command} />
        </div>
    );
}

export { PromptCommand };
