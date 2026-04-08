import { TopicsPublishCount } from '../../organisms/topics-publish-count';
import { TopicsPublishExplorer } from '../../organisms/topics-publish-explorer';

import './style.css';


function TopicsPublishes({ count, topics }) {

    return (
        <article class="topics-publishes">
            <TopicsPublishCount count={count} />
            <TopicsPublishExplorer topics={topics} />
        </article>
    );
}

export { TopicsPublishes };
