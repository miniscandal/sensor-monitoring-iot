import { useReadingSensorParameters } from '@shared-custom-hooks/useReadingSensorParameters';

import { FontIcon } from '@shared-components/atoms/font-icon';
import { PropertyWithValue } from '@shared-components/molecules/property-with-value';

import { sensors, sensorActive } from '@shared-components/atoms/font-icon/variants';

import { IconWithValue } from '../../molecules/icon-with-value';
import { ButtonPanel } from '../../molecules/button-panel';

import { iconWithValueHumidity } from '../../molecules/icon-with-value/variants';
import { iconWithValueTemperature } from '../../molecules/icon-with-value/variants';

import './style.css';

function Sensor({ sensorId = '0' }) {
	const { humidity, temperature } = useReadingSensorParameters({ sensorId });

	return (
		<section class="sensor">
			<header class="sensor__connected">
				<FontIcon name={sensors} size="small" color="successful" />
			</header>
			<section>
				<FontIcon name={sensorActive} size="medium" color="symbol" />
				<PropertyWithValue property="Sensor ID:" value={sensorId} />
			</section>
			<section class="sensor__values">
				<IconWithValue {...iconWithValueHumidity} value={humidity.value} />
				<IconWithValue {...iconWithValueTemperature} value={temperature.value} />
			</section>
			<footer class="sensor__footer">
				<ButtonPanel />
			</footer>
		</section>
	);
}

export { Sensor };
