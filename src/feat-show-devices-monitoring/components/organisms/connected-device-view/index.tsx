/**
 * Module responsibility
 *
 */

import { useConnectedDevices } from '@shared-custom-hooks/use-connected-devices';

import { ReceivedMessageByDeviceType } from '@core-services/mqtt-client/types/received-message-by-device';

import { Device } from '../device';

import './style.css';

function ConnectedDeviceView() {
	const { devices }: { devices: ReceivedMessageByDeviceType[] } = useConnectedDevices();

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

export { ConnectedDeviceView };
