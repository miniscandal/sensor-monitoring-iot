import { LiveMqttMessageFeed } from '../../organisms/live-mqtt-message-feed';

import './style.css';


function LiveDataFeed() {

    return (
        <article class="live-data-feed">
            <LiveMqttMessageFeed />
        </article>
    );
}

export { LiveDataFeed };
