import { MqttTopicBreadcrumb } from '../../atoms/mqtt-topic-breadcrumb';
import { MqttTopicBreadcrumbSeparator } from '../../atoms/mqtt-topic-breadcrumb-separator';

import './style.css';


function MqttTopicPath({ topic }) {
    const parts = topic.split('/');
    const itemsComponents = parts.flatMap((item, index) => {
        const mqttTopicBreadcrumb = (
            <MqttTopicBreadcrumb
                key={`${item}-${index}`}
                text={item}
            />
        );


        return index < parts.length - 1
            ? [mqttTopicBreadcrumb, <MqttTopicBreadcrumbSeparator key={`forward-slash-${index}`} />]
            : [mqttTopicBreadcrumb];
    });


    return (
        <p class="mqtt-topic-path">
            {itemsComponents}
        </p>
    );
}

export { MqttTopicPath };
