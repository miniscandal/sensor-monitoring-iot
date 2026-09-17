import './style.css';

import { SvgIcon } from '@shared-components/atoms/svg-icon';


function ButtonSvgIcon({ name, size, handleClick = () => { } }) {


    return (
        <button class="button-svg-icon" onClick={handleClick}>
            <SvgIcon name={name} size={size} />
        </button>
    );
}

export { ButtonSvgIcon };
