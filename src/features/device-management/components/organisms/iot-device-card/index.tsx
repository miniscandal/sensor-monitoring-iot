import { MetricItem } from '../../molecules/metric-item';
import { IoTDeviceControlPanel } from '../../molecules/iot-device-control-panel';

import { StatItem } from '@shared-components/molecules/stat-item';
import { SvgIcon } from '@shared-components/atoms/svg-icon';

import './style.css';


function IoTDeviceCard({ deviceId = 'N/A', readings = {}, isSelected, status = 'active' }) {
    const { humidity, temperature } = readings;
    const iconStatus = {
        active: 'motionSensorActive',
        alert: 'motionSensorAlert',
        idle: 'motionSensorIdle',
        urgent: 'motionSensorUrgent',
    }[status];

    return (
        <li class={`iot-device-card ${isSelected ? "selected" : ""}`} data-device-id={deviceId} data-selected={isSelected}>
            <header class={status === 'active' ? "sensors" : "sensors-off"}>
                <SvgIcon name={status === 'active' ? "sensors" : "sensorsOff"} size="tiny" />
            </header>
            <section class={`iot-device-card__device-id ${status}`}>
                <SvgIcon name={iconStatus} size="regular" />
                <div>
                    <StatItem label="Device ID:" value={`\u00A0 ${deviceId}`} />
                    <SvgIcon name="qrCode" size="tiny" />
                </div>
            </section>
            <section class="iot-device-card__sensor-readings">
                <MetricItem svgIconName="humidity" value={humidity} />
                <MetricItem svgIconName="temperature" value={temperature} />
            </section>
            <footer class="iot-device-card__footer">
                <IoTDeviceControlPanel isSelected={isSelected} />
            </footer>
        </li>
    );
}

export { IoTDeviceCard };
