import { Label } from '@shared-components/atoms/label';

import './style.css';


function PromptCommand({ prompt, command }) {

    return (
        <div class="prompt-command">
            <Label text={prompt} />
            <Label text={command} />
        </div>
    );
}

export { PromptCommand };
