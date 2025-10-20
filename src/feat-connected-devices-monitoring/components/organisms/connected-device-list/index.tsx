/**
 * Module responsibility
 *
 */
import { Device } from '../device';

import './style.css';


function ConnectedDeviceList() {
    const devices = [];
    const deviceElements = devices.map(device => {
        const { device_id } = device;

        return (
            <Device deviceId={device_id} />
        );
    });

    return (
        <section class="connected_device_view">
            {deviceElements}
        </section>
    );
}

export { ConnectedDeviceList };
