import './style.css';


function RichHeading({ level = 1, children }) {
    const HeadingTag = `h${level}`;


    return (
        <HeadingTag className={`rich-heading h${level}`}>{children}</HeadingTag>
    );
}

export { RichHeading };
