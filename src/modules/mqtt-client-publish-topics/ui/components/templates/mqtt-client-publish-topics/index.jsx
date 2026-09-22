import { TopicsPublishCount } from '../../organisms/topics-publish-count';
import { TopicsPublishExplorer } from '../../organisms/topics-publish-explorer';

import './style.css';


function MqttClientPublishTopicsTemplate({ topics }) {

    return (
        <article class="mqtt-client-publish-topics">
            <TopicsPublishCount count={topics.length} />
            <TopicsPublishExplorer topics={topics} />
        </article>
    );
}

export { MqttClientPublishTopicsTemplate };
