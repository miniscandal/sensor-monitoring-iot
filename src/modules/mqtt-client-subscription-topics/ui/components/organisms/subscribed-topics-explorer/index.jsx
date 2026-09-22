import { Details } from '@shared-components/organisms/details';
import { TopicsList } from '@shared-components/molecules/topics-list';

import './style.css';


function SubscribedTopicsExplorer({ topics }) {

    return (
        <div class="subscribed-topics-explorer">
            <Details summary="Subscribed Topic Paths">
                <TopicsList topics={topics} emptyMessage="No subscribed topics" />
            </Details>
        </div>
    );
}

export { SubscribedTopicsExplorer };
