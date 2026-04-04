import { Details } from '@shared-components/organisms/details';
import { TopicsList } from '@shared-components/molecules/topics-list';

import './style.css';


function TopicsPublishDetails({ topics }) {

    return (
        <div class="topics-publish-details">
            <Details summary="Publishing Details">
                <TopicsList topics={topics} emptyMessage="No publish topics" />
            </Details>
        </div>
    );
}

export { TopicsPublishDetails };
