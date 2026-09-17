import { useState, useRef, useEffect } from 'preact/hooks';

import { Label } from '@shared-components/atoms/label';

import { PromptCommand } from '../../molecules/prompt-command';

import './style.css';

import { ButtonSvgIcon } from '@shared-components/molecules/button-svg-icon';


function TerminalPanel({ nodeId, setActiveControl }) {
    const [inputCommand, setInputCommand] = useState('');
    const [history, setHistory] = useState([]);

    const terminalBodyRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [history]);

    const handleSendMessage = (event) => {
        event.preventDefault();

        setHistory(prevState => [
            ...prevState,
            <PromptCommand
                key={prevState.length}
                prompt={`nodeId/${nodeId}>\u00A0`}
                command={`${inputCommand.trim()}\n`}
            />,
        ]);

        setInputCommand('');

        console.log(nodeId);
    };

    const handleInput = (event) => {
        setInputCommand(event.target.value);
    };

    const handleTerminalPanelBody = () => {
        inputRef.current.focus();
    };

    const handleButtonClose = () => setActiveControl(null);


    return (
        <section class="terminal-panel">
            <header>
                <ButtonSvgIcon name="closeSmall" size="tiny" handleClick={handleButtonClose} />
            </header>
            <div ref={terminalBodyRef} class="terminal-panel-body" onClick={handleTerminalPanelBody}>
                <pre>
                    {history}
                </pre>
                <form onSubmit={handleSendMessage}>
                    <Label htmlFor="terminal-input" text={`nodeId/${nodeId}>\u00A0`} />
                    <input
                        id="terminal-input"
                        autoFocus
                        ref={inputRef}
                        type="text"
                        value={inputCommand}
                        onInput={handleInput}
                    />
                </form>
            </div>
        </section>
    );
}

export { TerminalPanel };
