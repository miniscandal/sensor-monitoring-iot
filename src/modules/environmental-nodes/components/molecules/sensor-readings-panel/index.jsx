import { useContext } from 'preact/hooks';
import { useComputed } from '@preact/signals';

import { EnvironmentalNodeContext } from '@modules/environmental-nodes/contexts/environmental-node-provider';

import { MetricItem } from '../metric-item';

import {
    HUMIDITY_SENSOR_CONFIG,
    TEMPERATURE_SENSOR_CONFIG,
} from './variants';

import './style.css';


function SensorReadingsPanel() {
    const { nodeProperties: { nodeStateCode, data } } = useContext(EnvironmentalNodeContext);
    const { sensorReadings: { humidity, temperature } } = data;
    const safeHumidity = useComputed(() => humidity.value ?? 'N/A');
    const safeTemperature = useComputed(() => temperature.value ?? 'N/A');


    return (
        <section class="sensor-readings-panel" data-node-state-code={nodeStateCode}>
            <MetricItem
                svgIconName={HUMIDITY_SENSOR_CONFIG.svgIconName}
                value={safeHumidity}
                unit={HUMIDITY_SENSOR_CONFIG.unit}
            />
            <MetricItem
                svgIconName={TEMPERATURE_SENSOR_CONFIG.svgIconName}
                value={safeTemperature}
                unit={TEMPERATURE_SENSOR_CONFIG.unit}
            />
        </section>
    );
}

export { SensorReadingsPanel };
