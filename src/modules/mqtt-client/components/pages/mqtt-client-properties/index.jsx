import { useMqttClientProperties } from '@modules/mqtt-client/hooks/use-properties';

import { ClientDetails } from '../../templates/client-details';

import './style.css';


function MqttClientProperties() {
    const { connected, ...properties } = useMqttClientProperties();


    return (
        <ClientDetails connected={connected} properties={properties} />
    );
}

export { MqttClientProperties };
