import { useDeviceParametersReading } from '@shared-custom-hooks/use-device-parameters-reading';

import { FontIcon } from '@shared-components/atoms/font-icon';
import { PropertyWithValue } from '@shared-components/molecules/property-with-value';
import { sensors } from '@shared-components/atoms/font-icon/variants';
import { sensorActive } from '@shared-components/atoms/font-icon/variants';

import { IconWithValue } from '../../molecules/icon-with-value';
import { ButtonPanel } from '../../molecules/button-panel';
import { iconWithValueHumidity } from '../../molecules/icon-with-value/variants';
import { iconWithValueTemperature } from '../../molecules/icon-with-value/variants';

import './style.css';

function Device({ deviceId }) {
	const { humidity, temperature } = useDeviceParametersReading(deviceId);

	return (
		<section class="device">
			<header class="device__connected">
				<FontIcon name={sensors} size="small" color="successful" />
			</header>
			<section>
				<FontIcon name={sensorActive} size="medium" color="symbol" />
				<PropertyWithValue property="Device ID:" value={deviceId} />
			</section>
			<section class="device__values">
				<IconWithValue {...iconWithValueHumidity} value={humidity.value} />
				<IconWithValue {...iconWithValueTemperature} value={temperature.value} />
			</section>
			<footer class="device__footer">
				<ButtonPanel />
			</footer>
		</section>
	);
}

export { Device };
