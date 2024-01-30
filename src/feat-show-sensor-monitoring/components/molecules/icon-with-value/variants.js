import { humidityPorcentage } from "@shared-components/atoms/font-icon/variants";
import { temperaturePorcentage } from "@shared-components/atoms/font-icon/variants";

const iconWithValueHumidity = {
	icon: humidityPorcentage,
	color: 'water',
	value: 0
};

const iconWithValueTemperature = {
	icon: temperaturePorcentage,
	color: 'fire',
	value: 0
}

export { iconWithValueHumidity, iconWithValueTemperature };
