import { Details } from '@shared-components/organisms/details';
import { TopicsList } from '@shared-components/molecules/topics-list';

import './style.css';


function PublishTopicsList() {
    const topics = [
        import.meta.env.VITE_TOPIC_HUB_OPERATION,
        import.meta.env.VITE_TOPIC_HUB_OPERATION_ALL,
    ];


    return (
        <div class="publish-topics-list">
            <Details summary="Publish topics list">
                <TopicsList topics={topics} emptyMessage="No publish topics" />
            </Details>
        </div>
    );
}

export { PublishTopicsList };
