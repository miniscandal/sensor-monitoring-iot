import { useState, useRef, useEffect } from 'preact/hooks';

import { PromptCommand } from '../../molecules/prompt-command';

import { Label } from '@shared-components/atoms/label';
import { ButtonSvgIcon } from '@shared-components/molecules/button-svg-icon';

import { computePastedInputValue } from './logic/compute-pasted-input-value';
import { parseCommandInput } from './logic/parse-command-input';

import { generateId } from '@shared-utils/generate-id';

import './style.css';


function TerminalPanel({ nodeId, setActiveControl }) {
    const [inputCommand, setInputCommand] = useState('');
    const [history, setHistory] = useState([]);

    const terminalBodyRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
            inputRef.current?.focus();
        }
    }, [history]);

    const handleInputChange = (event) => setInputCommand(event.target.value);
    const handleBodyClick = () => inputRef.current?.focus();
    const handleClose = () => setActiveControl(null);
    const handlePaste = (event) => {
        event.preventDefault();

        const pastedText = event.clipboardData.getData('text');
        const { selectionStart, selectionEnd } = event.target;

        const nextValue = computePastedInputValue({
            pastedText,
            inputCommand,
            selectionStart,
            selectionEnd,
        });

        setInputCommand(nextValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setHistory(prevState => [
            ...prevState,
            {
                id: generateId(),
                timestamp: Date.now(),
                prompt: `nodeId/${nodeId}>\u00A0`,
                command: `${inputCommand.trim()}\n`,
            },
        ]);

        const { command, flags } = parseCommandInput(inputCommand);

        console.log('command', command);
        console.log('flags', flags);

        setInputCommand('');
    };

    const promptCommandComponents = history.map(({ id, prompt, command }) => (
        < PromptCommand
            key={id}
            prompt={prompt}
            command={command}
        />
    ));


    return (
        <section class="terminal-panel">
            <header>
                <ButtonSvgIcon name="closeSmall" size="tiny" handleClick={handleClose} />
            </header>
            <div ref={terminalBodyRef} class="terminal-panel-body" onClick={handleBodyClick}>
                <pre>
                    {promptCommandComponents}
                </pre>
                <form onSubmit={handleSubmit}>
                    <Label htmlFor="terminal-input" text={`nodeId/${nodeId}>\u00A0`} />
                    <input
                        id="terminal-input"
                        autoFocus
                        ref={inputRef}
                        type="text"
                        value={inputCommand}
                        onInput={handleInputChange}
                        onPaste={handlePaste}
                    />
                </form>
            </div>
        </section>
    );
}

export { TerminalPanel };
