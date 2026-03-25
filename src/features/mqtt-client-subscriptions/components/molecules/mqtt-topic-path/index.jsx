import { MqttTopicBreadcrumb } from '../../atoms/mqtt-topic-breadcrumb';

import './style.css';


function MqttTopicPath({ topic }) {
    const parts = topic.split('/');
    const itemsComponents = parts.map((item, index) => (
        <MqttTopicBreadcrumb
            key={`${topic}-${item}`}
            text={item}
            isLast={index === parts.length - 1}
        />
    ));


    return (
        <p class="mqtt-topic-path">
            {itemsComponents}
        </p>
    );
}

export { MqttTopicPath };
