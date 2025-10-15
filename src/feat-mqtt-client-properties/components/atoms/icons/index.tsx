import svgCat from '@assets/images/icons/cat.svg';

import './style.css';


function Icon({ size = 'small', type = svgCat }) {
    const classList = [
        'icon',
        size,
    ];


    return (
        <div class={classList.join(' ')}>
            <img src={type} alt="icon" />
        </div>
    );
}

export { Icon };
