import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function SubscribedTopicsCount({ topicsLength }) {
    const iconStat = {
        label: 'Subscribed Topics',
        value: `(${topicsLength} Active)`,
        svgIconName: 'topicSubscribe',
    };


    return (
        <section class="subscribed-topics-count">
            <IconStat {...iconStat} />
        </section>
    );
}

export { SubscribedTopicsCount };
