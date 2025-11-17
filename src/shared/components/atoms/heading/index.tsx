import './style.css';


function Heading({ level = 1, text = 'Heading' }) {
    const HeadingTag = `h${level}`;


    return (
        <HeadingTag class={`heading h${level}`}>
            {text}
        </HeadingTag>
    );
}

export { Heading };
