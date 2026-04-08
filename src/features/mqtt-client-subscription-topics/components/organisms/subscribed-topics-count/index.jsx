import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function SubscribedTopicsCount({ topicsLength }) {
    const iconStat = {
        label: 'Subscription Topics',
        value: `Active (${topicsLength})`,
        svgIconName: 'topicSubscribe',
    };


    return (
        <section class="subscribed-topics-count">
            <IconStat {...iconStat} />
        </section>
    );
}

export { SubscribedTopicsCount };
