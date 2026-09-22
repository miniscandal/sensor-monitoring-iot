import { EnvMonitoringNodesProvider } from '@modules/env-monitoring-nodes/ui/contexts/env-monitoring-nodes-provider';

import { EnvMonitoringNodesTemplate } from '../../templates/env-monitoring-nodes';

import './style.css';


function EnvMonitoringNodesPage() {

    return (
        <EnvMonitoringNodesProvider>
            <EnvMonitoringNodesTemplate />
        </EnvMonitoringNodesProvider>
    );
}

export { EnvMonitoringNodesPage };
