/**
 * Module responsibility
 *
 */
import { useDeviceRegistry } from '@shared-custom-hooks/device/onboarding/device-registry';
import { Device } from '../device';

import './style.css';


function ConnectedDeviceList() {
    const devices = useDeviceRegistry();

    const deviceElements = devices.map(device => {
        const { deviceId } = device;


        return (
            <Device deviceId={deviceId} />
        );
    });


    return (
        <section class="connected_device_view">
            {deviceElements}
        </section>
    );
}

export { ConnectedDeviceList };
