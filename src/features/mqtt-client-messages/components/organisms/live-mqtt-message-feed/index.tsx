import { useMqttClientMessages } from '@shared-custom-hooks/mqtt-client/use-mqtt-client-message-tracking';

import './style.css';


function LiveMqttMessageFeed() {
    const messages = useMqttClientMessages();

    const data = messages.map(message => JSON.stringify(message));


    return (
        <section class="live-mqtt-message-feed">
            <div class="live-mqtt-message-feed__div">
                {data}
            </div>
        </section>
    );
}

export { LiveMqttMessageFeed };
