import { ActionsToolbar } from '../../molecules/actions-toolbar';
import { IdentityInfoPanel } from '../../molecules/identity-info-panel';
import { SensorReadingsPanel } from '../../molecules/sensor-readings-panel';

import { SvgIcon } from '@shared-components/atoms/svg-icon';

import { safeRound } from '@shared-utils/safe-round';

import {
    NODE_STATUS_LOGGED_IN,
    NODE_STATUS_IDLE,
    NODE_STATUS_STREAMING_SENSOR_DATA,
} from '@shared-constants/node-status-codes';

import './style.css';


function NodeCard({ nodeId = 'N/A', sensorReadings = {}, selectionStatus = false, statusCode = 205 }) {
    const humidity = safeRound(sensorReadings.humidity?.value);
    const temperature = safeRound(sensorReadings.temperature?.value);

    /*
        NODE_STATUS_IDLE: 
        The node has completed its full initialization process. Concurrently, 
        the Web IoT control panel has successfully retrieved and loaded all 
        necessary data from the database. The node is now in an 'Idle' state, 
        ready for action or command reception.
    */

    const dataTransmissionIcon = {
        [NODE_STATUS_LOGGED_IN]: 'sensorsOff',
        [NODE_STATUS_IDLE]: 'sensorsOff',
        [NODE_STATUS_STREAMING_SENSOR_DATA]: 'sensors',
    }[statusCode];

    const svgIconName = {
        [NODE_STATUS_LOGGED_IN]: 'motionSensorActive',
        [NODE_STATUS_IDLE]: 'motionSensorIdle',
        [NODE_STATUS_STREAMING_SENSOR_DATA]: 'motionSensorActive',
    }[statusCode];


    return (
        <li class="node-card"
            data-node-id={nodeId}
            data-selection-status={selectionStatus}
            data-status-code={statusCode}
        >
            <header>
                <SvgIcon name={dataTransmissionIcon} size="tiny" />
            </header>
            <IdentityInfoPanel
                nodeId={nodeId} nodeStatusCode={statusCode} svgIconName={svgIconName}
            />
            <SensorReadingsPanel
                humidityValue={humidity} temperatureValue={temperature} nodeStatusCode={statusCode}
            />
            <ActionsToolbar nodeStatusCode={statusCode} selectionStatus={selectionStatus} />
        </li>
    );
}

export { NodeCard };
