import { TopicsPublishCount } from '../../organisms/topics-publish-count';
import { TopicsPublishDetails } from '../../organisms/topics-publish-details';

import './style.css';


function TopicsPublishes() {

    return (
        <article class="topics-publishes">
            <TopicsPublishCount />
            <TopicsPublishDetails />
        </article>
    );
}

export { TopicsPublishes };
