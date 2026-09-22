import { useMqttClientProperties } from '@modules/mqtt-client-attributes/ui/hooks/use-properties';

import { MqttClientAttributesTemplate } from '../../templates/mqtt-client-attributes';

import './style.css';


function MqttClientAttributesPage() {
    const { connected, ...properties } = useMqttClientProperties();


    return (
        <MqttClientAttributesTemplate connected={connected} properties={properties} />
    );
}

export { MqttClientAttributesPage };
