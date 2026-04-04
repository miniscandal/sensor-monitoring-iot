import { SubscribedTopicsCount } from '../../organisms/subscribed-topics-count';
import { SubscribedTopicsDetails } from '../../organisms/subscribed-topics-details';

import './style.css';


function SubscribedTopics({ topics }) {

    return (
        <article class="subscribed-topics">
            <SubscribedTopicsCount topicsLength={topics.length} />
            <SubscribedTopicsDetails topics={topics} />
        </article>
    );
}

export { SubscribedTopics };
