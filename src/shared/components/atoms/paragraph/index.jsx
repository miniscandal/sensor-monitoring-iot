import './style.css';


function Paragraph({ text = 'Paragraph', size = 'regular' }) {

    return (
        <p class={`paragraph ${size}`}>
            {text}
        </p>
    );
}


export { Paragraph };
