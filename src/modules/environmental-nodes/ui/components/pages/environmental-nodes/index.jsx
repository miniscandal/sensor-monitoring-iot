import { EnvironmentalNodesProvider } from '@modules/environmental-nodes/ui/contexts/environmental-nodes-provider';

import { EnvNodesManagement } from '../../templates/management';

import './style.css';


function EnvironmentalNodes() {

    return (
        <EnvironmentalNodesProvider>
            <EnvNodesManagement />
        </EnvironmentalNodesProvider>
    );
}

export { EnvironmentalNodes };
