/**
 * Module responsibility
 *
 */

import { useConnectedDevices } from '@shared-custom-hooks/use-connected-devices';

import { Parameter } from '@shared-components/molecules/parameter';

import './style.css';


function ConnectedDeviceCount() {
    const { countDevice } = useConnectedDevices();

    const parameter = {
        name: 'subscribe',
        text: 'Sensors',
        icon: 'countSensorDevice',
        value: countDevice.toString(),
        size: 'regular',
    };


    return (
        <section class="connected_device_count">
            <Parameter {...parameter} />
        </section>
    );
}

export { ConnectedDeviceCount };
