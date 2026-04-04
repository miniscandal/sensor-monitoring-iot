import { useMqttClientProperties } from '@features/mqtt-client/hooks/use-properties';

import { Information } from '../../templates/information';

import './style.css';


function MqttClientPage() {
    const { connected, ...properties } = useMqttClientProperties();


    return (
        <Information connected={connected} properties={properties} />
    );
}

export { MqttClientPage };
