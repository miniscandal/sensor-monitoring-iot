import { EnvironmentalNodesProvider } from '@shared-contexts/environmental-nodes-provider';

import { useIoTDeviceSessionCount } from '@features/environmental-nodes/hooks/use-session-count';

import { NodesManagement } from '../../templates/management';

import './style.css';


function EnvironmentalNodesPage() {
    const count = useIoTDeviceSessionCount();


    return (
        <EnvironmentalNodesProvider>
            <NodesManagement count={count} />
        </EnvironmentalNodesProvider>

    );
}

export { EnvironmentalNodesPage };
