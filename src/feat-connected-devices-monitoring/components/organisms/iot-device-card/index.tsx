import { MetricItem } from '../../molecules/metric-item';
import { IoTDeviceControlPanel } from '../../molecules/iot-device-control-panel';

import { StatItem } from '@shared-components/molecules/stat-item';
import { SvgIcon } from '@shared-components/atoms/svg-icon';

import './style.css';


function IoTDeviceCard({ deviceId, humidity, temperature }) {

    return (
        <li class="iot-device-card" data-device-id={deviceId}>
            <header>
                <SvgIcon name="transmit" size="small" />
            </header>
            <section class="iot-device-card__device-id">
                <SvgIcon name="motionSensorActive" size="small" />
                <StatItem label="Device ID:" value={deviceId} />
            </section>
            <section class="iot-device-card__sensor-readings">
                <MetricItem svgIconName="humidity" value={humidity} />
                <MetricItem svgIconName="temperature" value={temperature} />
            </section>
            <footer class="iot-device-card__footer">
                <IoTDeviceControlPanel />
            </footer>
        </li>
    );
}

export { IoTDeviceCard };
