import { useContext } from 'preact/hooks';

import { EnvironmentalNodeContext } from '@modules/environmental-nodes/ui/contexts/environmental-node-provider';

import { ControlsToolbar } from '../../molecules/controls-toolbar';
import { IdentityInfoPanel } from '../../molecules/identity-info-panel';
import { SensorsReadingsPanel } from '../../molecules/sensors-readings-panel';
import { StateInfoHeader } from '../../molecules/state-info-header';

import { classNames } from '@shared-utils/class-names';

import './style.css';


function NodeCard() {
    const { isSelected, nodeProperties } = useContext(EnvironmentalNodeContext);
    const { nodeStateCode, metadata: { nodeId } } = nodeProperties;


    return (
        <li
            class={classNames('node-card', isSelected && 'selected')}
            data-node-id={nodeId}
            data-node-state-code={nodeStateCode}
        >
            <StateInfoHeader />
            <IdentityInfoPanel />
            <SensorsReadingsPanel />
            <ControlsToolbar />
        </li>
    );
}

export { NodeCard };
