/**
 * Module responsibility
 *
 */

import { useConnectedDeviceCount } from '@shared-custom-hooks/use-connected-device-count';
import { PropertyItem } from '@shared-components/molecules/property-item';

import countSensorDevice from '@assets/images/mqtt-icons/count-sensor-device.svg';

import './style.css';


function ConnectedDeviceCount() {
    const count = useConnectedDeviceCount();

    const parameter = {
        name: 'subscribe',
        label: 'Sensors',
        svgIcon: countSensorDevice,
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
