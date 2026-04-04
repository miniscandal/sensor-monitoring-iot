import { IconStat } from '@shared-components/molecules/icon-stat';

import { TOPICS_PUBLISHES_COUNT } from '@features/mqtt-client-publishes/constants/Topics-publishes';

import './style.css';


function TopicsPublishCount() {
    const iconStat = {
        label: 'Publishing Topics',
        value: `Available (${TOPICS_PUBLISHES_COUNT})`,
        svgIconName: 'topicSubscribe',
    };


    return (
        <section class="topics-publish-count">
            <IconStat {...iconStat} />
        </section>
    );
}

export { TopicsPublishCount };
