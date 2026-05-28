import { deepCamel } from '@shared-utils/deep-camel';

import envNodeCollection from '@mocks/environmental-nodes/data/env-node-collection.json';


const nodes = envNodeCollection.map(deepCamel);

const environmentalNodesMockProvider = {
    nodes: nodes.map(node => [node.metadata.nodeId, node]),
    nodeIds: nodes.map(node => node.metadata.nodeId),
};

export { environmentalNodesMockProvider };
