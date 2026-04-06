import { useMqttClientProperties } from '@features/mqtt-client/hooks/use-properties';

import { ClientDetails } from '../../templates/client-details';

import './style.css';


function MqttClientPage() {
    const { connected, ...properties } = useMqttClientProperties();


    return (
        <ClientDetails connected={connected} properties={properties} />
    );
}

export { MqttClientPage };
