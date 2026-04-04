import { StatItem } from '@shared-components/molecules/stat-item';
import { SvgIcon } from '@shared-components/atoms/svg-icon';

import './style.css';


function IoTDeviceDetails({ iotDeviceId, iotDeviceStatusCode, svgIconName }) {

    return (
        <section class="iot-device-details" data-status-code={iotDeviceStatusCode}>
            <SvgIcon name={svgIconName} size="regular" />
            <div>
                <StatItem label="Device ID:" value={`\u00A0 ${iotDeviceId}`} />
                <SvgIcon name="qrCode" size="tiny" />
            </div>
        </section>
    );
}

export { IoTDeviceDetails };
