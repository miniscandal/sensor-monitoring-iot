import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function TopicsPublishCount({ count }) {
    const iconStat = {
        label: 'Publishable Topics',
        value: `(${count} Available)`,
        svgIconName: 'topicSubscribe',
    };


    return (
        <section class="topics-publish-count">
            <IconStat {...iconStat} />
        </section>
    );
}

export { TopicsPublishCount };
