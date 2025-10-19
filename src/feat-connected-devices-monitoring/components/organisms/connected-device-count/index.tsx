/**
 * Module responsibility
 *
 */

import { PropertyItem } from '@shared-components/molecules/property-item';

import countSensorDevice from '@assets/images/mqtt-icons/count-sensor-device.svg';

import './style.css';


function ConnectedDeviceCount() {

    const parameter = {
        name: 'subscribe',
        label: 'Sensors',
        svgIcon: countSensorDevice,
        value: 0,
        size: 'regular',
    };


    return (
        <section class="connected_device_count">
            <PropertyItem {...parameter} />
        </section>
    );
}

export { ConnectedDeviceCount };
