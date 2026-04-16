import { MetricItem } from '../metric-item';

import './style.css';


function SensorReadingsPanel({ humidityValue, temperatureValue, nodeStatusCode }) {

    return (
        <section class="sensor-readings-panel" data-status-code={nodeStatusCode}>
            <MetricItem
                svgIconName="humidity"
                value={humidityValue}
                unit={humidityValue != null ? '%' : ''}
            />
            <MetricItem
                svgIconName="temperature"
                value={temperatureValue}
                unit={humidityValue != null ? '°C' : ''}
            />
        </section>
    );
}

export { SensorReadingsPanel };
