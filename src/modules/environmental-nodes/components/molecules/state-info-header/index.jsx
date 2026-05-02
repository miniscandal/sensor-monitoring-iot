import { SvgIcon } from '@shared-components/atoms/svg-icon';

import {
    NODE_STATE_LOGGED_IN,
    NODE_STATE_IDLE,
    NODE_STATE_STREAMING_SENSORS,
} from '@infrastructure/environmental-nodes/constants/node-state-codes';

import './style.css';


function StateInformationHeader({ nodeStateCode }) {
    const svgIconProps = {
        [NODE_STATE_LOGGED_IN]: 'wirelessSignal',
        [NODE_STATE_STREAMING_SENSORS]: 'wirelessSignal',
        [NODE_STATE_IDLE]: 'sensorsOff',
    }[nodeStateCode];

    return (
        <header class="state-information-header">
            <SvgIcon name="ecg" size="tiny" />
            <SvgIcon name={svgIconProps} size="tiny" />
        </header>
    );
}

export { StateInformationHeader };
