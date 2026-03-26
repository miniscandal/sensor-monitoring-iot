import { useState } from 'preact/hooks';

import './style.css';


function Details({ summary, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(prevState => !prevState);


    return (
        <details class="details" onToggle={handleToggle} open={isOpen}>
            <summary>
                {summary}
            </summary>
            {children}
        </details>
    );
}

export { Details };
