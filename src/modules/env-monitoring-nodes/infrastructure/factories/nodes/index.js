import { USE_ENV_NODE_MOCK } from '@core/mqtt-client/constants/client-config';

import { envMonitoringNodesMockProvider } from '@mocks/env-monitoring-nodes/providers/nodes';
import { envMonitoringNodesProvider } from '../../providers/nodes';


function envMonitoringNodesProviderFactory(useMock = USE_ENV_NODE_MOCK) {

    return useMock ? envMonitoringNodesMockProvider : envMonitoringNodesProvider;
}

export { envMonitoringNodesProviderFactory };
