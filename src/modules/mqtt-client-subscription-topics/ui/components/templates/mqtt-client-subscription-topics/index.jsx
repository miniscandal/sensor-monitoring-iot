import { SubscribedTopicsCount } from '../../organisms/subscribed-topics-count';
import { SubscribedTopicsExplorer } from '../../organisms/subscribed-topics-explorer';

import './style.css';


function MqttClientSubscriptionTopicsTemplate({ topics }) {

    return (
        <article class="subscribed-topics">
            <SubscribedTopicsCount topicsLength={topics.length} />
            <SubscribedTopicsExplorer topics={topics} />
        </article>
    );
}

export { MqttClientSubscriptionTopicsTemplate };
