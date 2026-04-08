import { deepCamel } from '@shared-utils/deep-camel';

import nodes from '@mocks/environmental-nodes/data/node-collection.json';


const environmentalNodesMockProvider = {
    nodes: nodes.map(deepCamel).map(node => [node.metadata.nodeId, node]),
};

export { environmentalNodesMockProvider };
