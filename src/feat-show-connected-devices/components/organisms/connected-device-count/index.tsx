/**
 * Module responsibility
 *
 */

import { useConnectedDevices } from '@shared-custom-hooks/use-connected-devices';

import { MonitoringPropertyType } from '@shared-components/molecules/monitoring-property/type';

import { MonitoringProperty } from '@shared-components/molecules/monitoring-property';
import { sensors } from '@shared-components/molecules/monitoring-property/variants';

import './style.css';

function ConnectedDeviceCount() {
	const { countDevice } = useConnectedDevices();

	const monitoringProperty: MonitoringPropertyType = {
		...sensors,
		value: countDevice.toString(),
		size: "regular",
	};

	return (
		<section class="connected_device_count">
			<MonitoringProperty {...monitoringProperty} />
		</section>
	);
}

export { ConnectedDeviceCount };
