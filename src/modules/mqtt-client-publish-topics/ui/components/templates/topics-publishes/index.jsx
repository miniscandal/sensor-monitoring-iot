import { TopicsPublishCount } from '../../organisms/topics-publish-count';
import { TopicsPublishExplorer } from '../../organisms/topics-publish-explorer';

import './style.css';


function TopicsPublishes({ topics }) {

    return (
        <article class="topics-publishes">
            <TopicsPublishCount count={topics.length} />
            <TopicsPublishExplorer topics={topics} />
        </article>
    );
}

export { TopicsPublishes };
