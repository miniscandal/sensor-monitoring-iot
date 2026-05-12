import { useContext } from 'preact/hooks';

import { EnvironmentalNodeContext } from '@modules/environmental-nodes/contexts/environmental-node-provider';

import { SvgIcon } from '@shared-components/atoms/svg-icon';

import {
    NODE_STATE_LOGGED_IN,
    NODE_STATE_IDLE,
    NODE_STATE_STREAMING_SENSORS,
} from '@infrastructure/environmental-nodes/constants/node-state-codes';

import './style.css';


function StateInfoHeader() {
    const { nodeProperties: { nodeStateCode } } = useContext(EnvironmentalNodeContext);

    const svgIconProps = {
        [NODE_STATE_LOGGED_IN]: 'wirelessSignal',
        [NODE_STATE_STREAMING_SENSORS]: 'wirelessSignal',
        [NODE_STATE_IDLE]: 'sensorsOff',
    }[nodeStateCode];

    return (
        <header class="state-info-header">
            <SvgIcon name="ecg" size="tiny" />
            <SvgIcon name={svgIconProps} size="tiny" />
        </header>
    );
}

export { StateInfoHeader };
