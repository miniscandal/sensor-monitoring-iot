import { EnvironmentalNodesProvider } from '@shared-contexts/environmental-nodes-provider';

import { NodesManagement } from '../../templates/management';

import './style.css';


function EnvironmentalNodes() {


    return (
        <EnvironmentalNodesProvider>
            <NodesManagement />
        </EnvironmentalNodesProvider>

    );
}

export { EnvironmentalNodes };
