import { SvgIcon } from '@shared-components/atoms/svg-icon';

import './style.css';


function IoTDeviceControlPanel({ iotDeviceState = {} }) {
    const { isActive = true } = iotDeviceState;

    return (
        <ul class="iot-device-control-panel">
            <li class={`item-terminal`} data-action="terminal">
                <SvgIcon name="terminal" size="small" enableHover={true} />
            </li>
            <li class={`item-mode-active-paused ${isActive ? 'active' : 'paused'}`} data-action="modeOffOn">
                <SvgIcon name="modeOffOn" size="small" enableHover={true} />
            </li>
            <li class={`item-analytics`}>
                <SvgIcon name="analytics" size="small" enableHover={true} />
            </li>
        </ul>
    );
}

export { IoTDeviceControlPanel };
