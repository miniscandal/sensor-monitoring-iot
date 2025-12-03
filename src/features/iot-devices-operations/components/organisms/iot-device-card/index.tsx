import { MetricItem } from '../../molecules/metric-item';
import { IoTDeviceControlPanel } from '../../molecules/iot-device-control-panel';

import { StatItem } from '@shared-components/molecules/stat-item';
import { SvgIcon } from '@shared-components/atoms/svg-icon';

import './style.css';


function IoTDeviceCard({ deviceId = 'N/A', sensorReadings = {}, isSelected, statusCode }) {
    const safeRound = signal => (
        Number.isFinite(signal?.value) ? Math.round(signal.value) : undefined
    );

    const { humidity, temperature } = {
        humidity: safeRound(sensorReadings.humidity),
        temperature: safeRound(sensorReadings.temperature),
    };

    const deviceGeneralStatusIcon = {
        101: 'motionSensorActive',
        202: 'motionSensorActive',
    }[statusCode];

    const statusColor = {
        101: 'registered',
        202: 'active',
    }[statusCode];

    const dataTransmissionIcon = {
        101: 'sensorsOff',
        202: 'sensors',
    }[statusCode];


    return (
        <li class={`iot-device-card ${isSelected ? "selected" : ""}`} data-device-id={deviceId} data-selected={isSelected}>
            <header class={statusColor}>
                <SvgIcon name={dataTransmissionIcon} size="tiny" />
            </header>
            <section class={`iot-device-card__device-id ${statusColor}`}>
                <SvgIcon name={deviceGeneralStatusIcon} size="regular" />
                <div>
                    <StatItem label="Device ID:" value={`\u00A0 ${deviceId}`} />
                    <SvgIcon name="qrCode" size="tiny" />
                </div>
            </section>
            <section class="iot-device-card__sensor-readings">
                <MetricItem
                    svgIconName="humidity"
                    value={humidity}
                    unit={humidity != null ? '%' : ''}
                />
                <MetricItem
                    svgIconName="temperature"
                    value={temperature}
                    unit={humidity != null ? '°C' : ''}
                />
            </section>
            <footer class="iot-device-card__footer">
                <IoTDeviceControlPanel isSelected={isSelected} />
            </footer>
        </li>
    );
}

export { IoTDeviceCard };
