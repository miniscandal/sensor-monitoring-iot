import { Details } from '@shared-components/organisms/details';
import { TopicsList } from '@shared-components/molecules/topics-list';

import { TOPICS_PUBLISHES } from '@features/mqtt-client-publishes/constants/topics-publishes';

import './style.css';


function TopicsPublishDetails() {

    return (
        <div class="topics-publish-details">
            <Details summary="Publishing Details">
                <TopicsList topics={TOPICS_PUBLISHES} emptyMessage="No publish topics" />
            </Details>
        </div>
    );
}

export { TopicsPublishDetails };
