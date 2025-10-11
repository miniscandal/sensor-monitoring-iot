/**
 * Module responsibility
 * 
 */

import { useMqttClientProperties } from '@shared-custom-hooks/use-mqtt-client-properties';
import { Parameter } from '../../parameter';

import './style.css';


function ParameterMonitoring() {
    const { connected, ...properties } = useMqttClientProperties();

    const parameters = [
        {
            name: 'clientMqtt',
            text: 'Client MQTT Status',
            icon: 'mqttClientStatus',
            value: 'disconnected',
            size: undefined,

        },
        {
            name: 'host',
            text: 'Host',
            icon: 'host',
            value: 'disconnected',
            size: undefined,
        },
        {
            name: 'port',
            text: 'Port',
            icon: 'port',
            value: 'disconnected',
            size: undefined,
        },
        {
            name: 'protocol',
            text: 'Protocol',
            icon: 'protocol',
            value: 'disconnected',
            size: undefined,
        },
        {
            name: 'clientId',
            text: 'ID',
            icon: 'clientId',
            value: 'disconnected',
            size: undefined,
        },
        {
            name: 'subscribe',
            text: 'Topic Subscribe',
            icon: 'topicSubscribe',
            value: 'disconnected',
            size: undefined,
        },
    ];

    const elements = parameters.map(value => {

        return <Parameter {...value} value={connected ? properties[value.name] : value.value} />;
    });


    return (
        <section class="parameters_monitoring">
            {elements}
        </section>
    );
}

export { ParameterMonitoring };
