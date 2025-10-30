/**
 * Module responsibility
 *
 */

import { useConnectedDeviceCount } from '@shared-custom-hooks/device/status/connected-device-count';
import { PropertyItem } from '@shared-components/molecules/property-item';

import './style.css';


function ConnectedDeviceCount() {
    const count = useConnectedDeviceCount();

    const parameter = {
        name: 'subscribe',
        label: 'Sensors',
        svgIconName: 'sensorDeviceCounter',
        value: count,
        size: 'regular',
    };


    return (
        <section class="connected_device_count">
            <PropertyItem {...parameter} />
        </section>
    );
}

export { ConnectedDeviceCount };
