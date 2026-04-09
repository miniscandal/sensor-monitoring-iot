import { deepCamel } from '@shared-utils/deep-camel';

import nodeCollection from '@mocks/environmental-nodes/data/node-collection.json';


const nodes = nodeCollection.map(deepCamel);

const environmentalNodesMockProvider = {
    nodes: nodes.map(node => [node.metadata.nodeId, node]),
    nodeIds: nodes.map(node => node.metadata.nodeId),
};

export { environmentalNodesMockProvider };
