import { USE_ENVIRONMENTAL_NODE_MOCK } from '@shared-constants/mqtt-client-config';

import { environmentalNodesMockProvider } from '@mocks/environmental-nodes/providers/nodes';
import { environmentalNodesProvider } from '@infrastructure/environmental-nodes/providers/nodes';


function environmentalNodesProviderFactory(useMock = USE_ENVIRONMENTAL_NODE_MOCK) {

    return useMock ? environmentalNodesMockProvider : environmentalNodesProvider;
}

export { environmentalNodesProviderFactory };
