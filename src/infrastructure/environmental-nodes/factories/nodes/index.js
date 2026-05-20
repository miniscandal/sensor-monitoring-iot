import { USE_ENV_NODE_MOCK } from '@infrastructure/mqtt-client/constants/client-config';

import { environmentalNodesMockProvider } from '@mocks/environmental-nodes/providers/nodes';
import { environmentalNodesProvider } from '@infrastructure/environmental-nodes/providers/nodes';


function environmentalNodesProviderFactory(useMock = USE_ENV_NODE_MOCK) {

    return useMock ? environmentalNodesMockProvider : environmentalNodesProvider;
}

export { environmentalNodesProviderFactory };
