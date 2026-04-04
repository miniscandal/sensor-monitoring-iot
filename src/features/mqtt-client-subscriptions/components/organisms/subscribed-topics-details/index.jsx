import { Details } from '@shared-components/organisms/details';
import { TopicsList } from '@shared-components/molecules/topics-list';

import './style.css';


function SubscribedTopicsDetails({ topics }) {

    return (
        <div class="subscribed-topics-details">
            <Details summary="Subscription Details">
                <TopicsList topics={topics} emptyMessage="No subscribed topics" />
            </Details>
        </div>
    );
}

export { SubscribedTopicsDetails };
