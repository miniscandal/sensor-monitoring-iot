import { MqttClientPropertiesPanel } from '../../organisms/mqtt-client-properties-panel';

import './style.css';


function MqttClientStatus() {

    return (
        <article class="mqtt-client-status">
            <MqttClientPropertiesPanel />
        </article>
    );
}

export { MqttClientStatus };
