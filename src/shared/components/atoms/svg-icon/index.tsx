import svgCat from '@assets/images/icons/cat.svg';

import './style.css';


function SvgIcon({ size = 'small', svg = svgCat }) {
    const classList = [
        'icon',
        size,
    ];


    return (
        <div class={classList.join(' ')}>
            <img src={svg} alt="icon" />
        </div>
    );
}

export { SvgIcon };
