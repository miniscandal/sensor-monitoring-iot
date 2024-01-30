import { useMqttClientProperties } from '@shared-custom-hooks/useMqttClientProperties';

import { MonitoringProperty } from '@shared-components/molecules/monitoring-property';
import { clientMqtt } from '@shared-components/molecules/monitoring-property/variants';
import { host } from '@shared-components/molecules/monitoring-property/variants';
import { port } from '@shared-components/molecules/monitoring-property/variants';
import { protocol } from '@shared-components/molecules/monitoring-property/variants';
import { subscribe } from '@shared-components/molecules/monitoring-property/variants';
import { clientId } from '@shared-components/molecules/monitoring-property/variants';

import './style.css';

function ConnectionMonitoringProperties() {
	const [{ connected, ...properties }] = useMqttClientProperties();
	const monitoringProperties = {
		clientId,
		clientMqtt,
		host,
		port,
		protocol,
		subscribe
	};
	const elements = Object.keys(properties).map(key => {
		const monitoringProperty = {
			...monitoringProperties[key],
			value: connected ? properties[key] : monitoringProperties[key].value
		};

		return <MonitoringProperty {...monitoringProperty} />;
	});

	return (
		<section class="connection_monitoring_properties">
			{elements}
		</section>
	);
}

export { ConnectionMonitoringProperties };
