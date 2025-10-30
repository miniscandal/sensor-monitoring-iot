import { IconWithValue } from '../../molecules/icon-with-value';
import { ButtonPanel } from '../../molecules/button-panel';

import { LabelValue } from '@shared-components/molecules/label-value';
import { SvgIcon } from '@shared-components/atoms/svg-icon';

import './style.css';


function Device({ deviceId }: { deviceId: string }) {

    return (
        <section class="device">
            <header class="device__connected">
                <SvgIcon name="transmit" size="small" />
            </header>
            <section>
                <SvgIcon name="motionSensorActive" size="small" />
                <LabelValue label="Device ID:" value={deviceId} />
            </section>
            <section class="device__values">
                <IconWithValue svgIconName="humidityPercentage" value="12" />
                <IconWithValue svgIconName="deviceThermostat" value="5" />
            </section>
            <footer class="device__footer">
                <ButtonPanel />
            </footer>
        </section>
    );
}

export { Device };
