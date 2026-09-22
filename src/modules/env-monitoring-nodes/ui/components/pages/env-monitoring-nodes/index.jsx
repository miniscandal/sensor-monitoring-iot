import { EnvironmentalNodesProvider } from '@modules/env-monitoring-nodes/ui/contexts/environmental-nodes-provider';

import { EnvMonitoringNodesTemplate } from '../../templates/env-monitoring-nodes';

import './style.css';


function EnvMonitoringNodesPage() {

    return (
        <EnvironmentalNodesProvider>
            <EnvMonitoringNodesTemplate />
        </EnvironmentalNodesProvider>
    );
}

export { EnvMonitoringNodesPage };
