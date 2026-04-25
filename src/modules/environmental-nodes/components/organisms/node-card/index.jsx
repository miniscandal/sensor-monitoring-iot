import { ActionsToolbar } from '../../molecules/actions-toolbar';
import { IdentityInfoPanel } from '../../molecules/identity-info-panel';
import { SensorReadingsPanel } from '../../molecules/sensor-readings-panel';

import { SvgIcon } from '@shared-components/atoms/svg-icon';

import { safeRound } from '@shared-utils/safe-round';
import { classNames } from '@shared-utils/class-names';

import {
    NODE_STATE_LOGGED_IN,
    NODE_STATE_IDLE,
    NODE_STATE_STREAMING_SENSORS,
} from '@infrastructure/environmental-nodes/constants/node-state-codes';

import './style.css';


function NodeCard({
    isSelected = false,
    nodeStateCode = 201,
    // operationResult = null,
    metadata: {
        nodeId = 'a001',
        // timestamp = "2026-03-29T21:51:01Z",
        // firmwareVersion = "1.3.0",
        // location: {
        //     lat = 20.5244,
        //     lng = -99.8956,
        //     zone = 'assembly',
        //     line = '3',
        //     station = 'welding robot',
        // } = {},
    } = {},
    // connection: { state = 'online', reason = 'boot' } = {},
    data: {
        sensorReadings: {
            humidity: { value: humidityValue = null } = {},
            temperature: { value: temperatureValue = null } = {},
        } = {},
    } = {},
}) {
    const sensorHumidity = safeRound(humidityValue);
    const sensorTemperature = safeRound(temperatureValue);

    const svgIconProps = {
        [NODE_STATE_LOGGED_IN]: 'wirelessSignal',
        [NODE_STATE_STREAMING_SENSORS]: 'wirelessSignal',
        [NODE_STATE_IDLE]: 'sensorsOff',
    }[nodeStateCode];

    const svgIconName = {
        [NODE_STATE_LOGGED_IN]: 'motionSensorActive',
        [NODE_STATE_STREAMING_SENSORS]: 'motionSensorActive',
        [NODE_STATE_IDLE]: 'motionSensorIdle',
    }[nodeStateCode];


    return (
        <li
            class={classNames('node-card', isSelected && 'selected')}
            data-node-id={nodeId}
            data-is-selected={isSelected}
            data-node-state-code={nodeStateCode}
        >
            <header>
                <SvgIcon name={svgIconProps} size="tiny" />
            </header>
            <IdentityInfoPanel
                nodeId={nodeId}
                nodeStateCode={nodeStateCode}
                svgIconName={svgIconName}
            />
            <SensorReadingsPanel
                humidityValue={sensorHumidity}
                temperatureValue={sensorTemperature}
                nodeStateCode={nodeStateCode}
            />
            <ActionsToolbar nodeStateCode={nodeStateCode} isSelected={isSelected} />
        </li>
    );
}

export { NodeCard };
