import { SvgIcon } from '@shared-components/atoms/svg-icon';

import './style.css';


function IoTDeviceControlPanel({ isActive = !true, isSelected = true }) {
    const iconStatus = isActive ? 'stopCircle' : 'playCircle';
    const classStatus = isActive ? 'active' : 'paused';
    const transmission = isActive ? 'pause' : 'activate';


    return (
        <ul class={`iot-device-control-panel ${isSelected ? "selected" : "unselected"}`}>
            <li class={`item-terminal`} data-action="terminal">
                <SvgIcon name="terminal" size="small" enableHover={true} />
            </li>
            <li class={`item-mode-active-paused ${classStatus}`} data-action={transmission}>
                <SvgIcon name={iconStatus} size="small" enableHover={true} />
            </li>
            <li class={`item-analytics`} data-action="analytics">
                <SvgIcon name="analytics" size="small" enableHover={true} />
            </li>
        </ul >
    );
}

export { IoTDeviceControlPanel };
