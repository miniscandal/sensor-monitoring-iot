import { EnvironmentalNodesProvider } from '@modules/environmental-nodes/ui/contexts/environmental-nodes-provider';

import { EnvironmentalNodesTemplate } from '../../templates/environmental-nodes';

import './style.css';


function EnvironmentalNodesPage() {

    return (
        <EnvironmentalNodesProvider>
            <EnvironmentalNodesTemplate />
        </EnvironmentalNodesProvider>
    );
}

export { EnvironmentalNodesPage };
