import { SvgIcon } from '@shared-components/atoms/svg-icon';

import './style.css';


function IoTDeviceControlPanel() {

    return (
        <ul class="iot-device-control-panel">
            <li data-action="terminal">
                <SvgIcon name="terminal" size="small" />
            </li>
            <li data-action="modeOffOn">
                <SvgIcon name="modeOffOn" size="small" />
            </li>
            <li data-action="analytics">
                <SvgIcon name="analytics" size="small" />
            </li>
        </ul>
    );
}

export { IoTDeviceControlPanel };
