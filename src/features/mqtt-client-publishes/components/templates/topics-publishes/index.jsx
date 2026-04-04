import { TopicsPublishCount } from '../../organisms/topics-publish-count';
import { TopicsPublishDetails } from '../../organisms/topics-publish-details';

import './style.css';


function TopicsPublishes({ count, topics }) {

    return (
        <article class="topics-publishes">
            <TopicsPublishCount count={count} />
            <TopicsPublishDetails topics={topics} />
        </article>
    );
}

export { TopicsPublishes };
