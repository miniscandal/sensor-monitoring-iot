import './style.css';


function Title({ text = 'Title' }) {

    return (
        <h1 class="title">{text}</h1>
    );
}

export { Title };
