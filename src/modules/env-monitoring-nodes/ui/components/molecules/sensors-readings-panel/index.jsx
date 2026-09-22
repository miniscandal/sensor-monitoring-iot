import { useContext } from 'preact/hooks';
import { useComputed } from '@preact/signals';

import { EnvMonitoringNodeContext } from '@modules/env-monitoring-nodes/ui/contexts/env-monitoring-node-provider';

import { MetricItem } from '../metric-item';

import {
    HUMIDITY_SENSOR_CONFIG,
    TEMPERATURE_SENSOR_CONFIG,
} from './variants';

import './style.css';


function SensorsReadingsPanel() {
    const { nodeProperties: { nodeStateCode, data } } = useContext(EnvMonitoringNodeContext);
    const { sensorsReadings: { humidity, temperature } } = data;
    const safeHumidity = useComputed(() => humidity?.value ?? 'N/A');
    const safeTemperature = useComputed(() => temperature?.value ?? 'N/A');


    return (
        <section class="sensors-readings-panel" data-node-state-code={nodeStateCode}>
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

export { SensorsReadingsPanel };
