import { useConnectedSensors } from '@shared-custom-hooks/useConnectedSensors';

import { MonitoringProperty } from '@shared-components/molecules/monitoring-property';
import { sensors as monitoringProperty } from '@shared-components/molecules/monitoring-property/variants';

import { Sensor } from '../sensor';

import './style.css';

function ConnectedSensoresList() {
	const [connectedSensors] = useConnectedSensors();

	const sensorElements = connectedSensors.map(sensor => {
		const { sensorId } = sensor;

		return (
			<Sensor sensorId={sensorId} />
		);
	});

	return (
		<section class="connected_sensors_list">
			<div class="connected_sensors_list__property">
				<MonitoringProperty
					{...monitoringProperty}
					value={connectedSensors.length}
					size="regular"
				/>
			</div>
			<div class="connected_sensors_list__items">
				{sensorElements}
			</div>
		</section>
	);
}

export { ConnectedSensoresList };
