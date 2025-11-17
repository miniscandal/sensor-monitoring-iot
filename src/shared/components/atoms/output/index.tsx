import './style.css';


function Output({ value = 'N/A', ariaLive = 'off', ariaLabel = 'Output value' }) {

    return (
        <output class="output" aria-live={ariaLive} aria-label={ariaLabel}>
            {value}
        </output>
    );
}

export { Output };
