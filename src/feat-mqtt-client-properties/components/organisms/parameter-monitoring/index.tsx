/**
 * Module responsibility
 * 
 */

import { useMqttClientProperties } from '@shared-custom-hooks/use-mqtt-client-properties';

import { Parameter } from '@shared-components/molecules/parameter';

import './style.css';


function ParameterMonitoring() {
    const { connected, ...properties } = useMqttClientProperties();

    const parameters = [
        {
            name: 'clientMqtt',
            text: 'Client MQTT Status',
            icon: 'mqttClientStatus',
        },
        {
            name: 'host',
            text: 'Host',
            icon: 'host',
        },
        {
            name: 'port',
            text: 'Port',
            icon: 'port',
        },
        {
            name: 'protocol',
            text: 'Protocol',
            icon: 'protocol',
        },
        {
            name: 'clientId',
            text: 'ID',
            icon: 'clientId',
        },
        {
            name: 'subscribe',
            text: 'Topic Subscribe',
            icon: 'topicSubscribe',
        },
    ];

    const parameterComponents = parameters.map(parameter => (
        <Parameter {...parameter} value={connected ? properties[parameter.name] : 'disconnected'} />
    ));


    return (
        <section class="parameters_monitoring">
            {parameterComponents}
        </section>
    );
}

export { ParameterMonitoring };
