import { useContext } from 'preact/hooks';

import { EnvironmentalNodeContext } from '@modules/environmental-nodes/contexts/environmental-node-provider';

import { MetricItem } from '../metric-item';

import { safeRound } from '@shared-utils/safe-round';

import './style.css';


function SensorReadingsPanel() {
    const { nodeStateCode, data } = useContext(EnvironmentalNodeContext);
    const { sensorReadings } = data;
    const { humidity, temperature } = sensorReadings;

    const humidityValue = safeRound(humidity.value);
    const temperatureValue = safeRound(temperature.value);


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
