import { Details } from '@shared-components/organisms/details';
import { TopicsList } from '@shared-components/molecules/topics-list';

import './style.css';


function PublishTopicsList({ topics }) {

    return (
        <div class="publish-topics-list">
            <Details summary="Publishing Details">
                <TopicsList topics={topics} emptyMessage="No publish topics" />
            </Details>
        </div>
    );
}

export { PublishTopicsList };
