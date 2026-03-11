import { MetricItem } from '../metric-item';

import './style.css';


function IoTDeviceSensorReadings({ humidityValue, temperatureValue, iotDeviceStatusCode }) {

    return (
        <section class="iot-device-sensor-readings" data-status-code={iotDeviceStatusCode}>
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

export { IoTDeviceSensorReadings };
