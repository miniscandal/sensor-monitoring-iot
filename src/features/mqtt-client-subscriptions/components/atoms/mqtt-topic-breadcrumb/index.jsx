import './style.css';


function MqttTopicBreadcrumb({ text, isLast }) {

    return (
        <span class="mqtt-topic-breadcrumb">
            {`${text} \u000A`}{isLast || '/'}
        </span>
    );
}

export { MqttTopicBreadcrumb };
