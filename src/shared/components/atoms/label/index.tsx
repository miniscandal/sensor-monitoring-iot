import './style.css'


function Label({ htmlFor = '', ariaLabel = '', text = 'Label' }) {

    return (
        <label class="label" htmlFor={htmlFor} aria-label={ariaLabel}>
            {text}
        </label>
    );
}

export { Label };
