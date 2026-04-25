import { MetricItem } from '../metric-item';

import './style.css';


function SensorReadingsPanel({ humidityValue, temperatureValue, nodeStateCode }) {

    return (
        <section class="sensor-readings-panel" data-node-state-code={nodeStateCode}>
            <MetricItem
                svgIconName="humidity"
                value={humidityValue}
                unit={humidityValue != null ? '%' : ''}
            />
            <MetricItem
                svgIconName="temperature"
                value={temperatureValue}
                unit={temperatureValue != null ? '°C' : ''}
            />
        </section>
    );
}

export { SensorReadingsPanel };
