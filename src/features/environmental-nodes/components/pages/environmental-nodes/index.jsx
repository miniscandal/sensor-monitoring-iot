import { EnvironmentalNodesProvider } from '@shared-contexts/environmental-nodes-provider';

import { useConnectedNodesCount } from '@features/environmental-nodes/hooks/use-connected-nodes-count';

import { NodesManagement } from '../../templates/management';

import './style.css';


function EnvironmentalNodesPage() {
    const count = useConnectedNodesCount();


    return (
        <EnvironmentalNodesProvider>
            <NodesManagement count={count} />
        </EnvironmentalNodesProvider>

    );
}

export { EnvironmentalNodesPage };
