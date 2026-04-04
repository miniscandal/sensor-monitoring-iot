import { SubscribedTopicsCount } from '../../organisms/subscribed-topics-count';
import { SubscribedTopicsDetails } from '../../organisms/subscribed-topics-details';

import './style.css';


function SubscribedTopics() {

    return (
        <article class="subscribed-topics">
            <SubscribedTopicsCount />
            <SubscribedTopicsDetails />
        </article>
    );
}

export { SubscribedTopics };
