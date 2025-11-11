import './style.css';

import { useMqttClientMessageTracking } from '@shared-custom-hooks/mqtt-client/use-mqtt-client-message-tracking';


function DataTracking() {
    const messages = useMqttClientMessageTracking();

    const data = messages.map(message => JSON.stringify(message));


    return (
        <section class="data_tracking">
            <div class="data_tracking__div">
                <div class="data_tracking__scroll">
                    {data}
                </div>
            </div>
        </section>
    );
}

export { DataTracking };
