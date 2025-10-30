import { SvgIcon } from '@shared-components/atoms/svg-icon';

import './style.css';


function ButtonPanel() {

    return (
        <ul class="button_panel">
            <li><SvgIcon name="terminal" size="small" /></li>
            <li><SvgIcon name="modeOffOn" size="small" /></li>
            <li><SvgIcon name="analytics" size="small" /></li>
        </ul>
    );
}

export { ButtonPanel };
