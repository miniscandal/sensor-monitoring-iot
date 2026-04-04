import { PublishTopicsList } from '../../organisms/publish-topics-list';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function TopicsPublishes() {
    const topics = [
        import.meta.env.VITE_TOPIC_HUB_OPERATION,
        import.meta.env.VITE_TOPIC_HUB_OPERATION_ALL,
    ];
    const iconStat = {
        label: 'Publishing Topics',
        value: `Available (${topics.length})`,
        svgIconName: 'topicSubscribe',
    };


    return (
        <article class="topics-publishes">
            <IconStat {...iconStat} />
            <PublishTopicsList topics={topics} />
        </article>
    );
}

export { TopicsPublishes };
