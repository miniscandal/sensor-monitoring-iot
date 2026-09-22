import { Properties } from '../../organisms/properties';

import './style.css';


function MqttClientAttributesTemplate({ connected, properties }) {

    return (
        <article class="mqtt-client-attributes">
            <Properties connected={connected} properties={properties} />
        </article>
    );
}

export { MqttClientAttributesTemplate };
