import { TopicsPublishes } from '../../templates/topics-publishes';

import { PUBLISHES_TOPICS } from '@features/mqtt-client-publishes/constants/topics-publishes';

import './style.css';


function MqttClientPublishesPage() {

    return (
        <TopicsPublishes count={PUBLISHES_TOPICS.length} topics={PUBLISHES_TOPICS} />
    );
}

export { MqttClientPublishesPage };
