import { SubscribedTopicsPanel } from '../../organisms/subscribed-topics-panel';
import { SubscribedTopicsDetails } from '../../organisms/subscribed-topics-details';

import './style.css';


function TopicSubscription() {

    return (
        <article class="topic-subscription">
            <SubscribedTopicsPanel />
            <SubscribedTopicsDetails />
        </article>
    );
}

export { TopicSubscription };
