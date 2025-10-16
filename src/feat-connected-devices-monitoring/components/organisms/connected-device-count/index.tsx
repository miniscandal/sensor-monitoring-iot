/**
 * Module responsibility
 *
 */

import { Parameter } from '@shared-components/molecules/parameter';

import './style.css';


function ConnectedDeviceCount() {

    const parameter = {
        name: 'subscribe',
        text: 'Sensors',
        icon: 'countSensorDevice',
        value: 0,
        size: 'regular',
    };


    return (
        <section class="connected_device_count">
            <Parameter {...parameter} />
        </section>
    );
}

export { ConnectedDeviceCount };
