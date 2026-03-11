/**
 * Module responsibility
 * 
 */

import { useMqttClientProperties } from '@shared-hooks/mqtt-client/use-properties';

import { IconStat } from '@shared-components/molecules/icon-stat';

import './style.css';


function MqttClientPropertiesPanel() {
    const { connected, ...properties } = useMqttClientProperties();

    const propertyDefinitions = [
        {
            name: 'clientMqtt',
            label: 'MQTT Client Status',
            svgIconName: 'mqttClientStatus',
        },
        {
            name: 'host',
            label: 'Host',
            svgIconName: 'host',
        },
        {
            name: 'port',
            label: 'Port',
            svgIconName: 'port',
        },
        {
            name: 'protocol',
            label: 'Protocol',
            svgIconName: 'protocol',
        },
        {
            name: 'clientId',
            label: 'ID',
            svgIconName: 'clientId',
        },
    ];

    const iconStatComponents = propertyDefinitions.map(property => (
        <IconStat {...property} value={connected ? properties[property.name] : 'N/A'} />
    ));


    return (
        <section class="mqtt-client-properties-panel">
            {iconStatComponents}
        </section>
    );
}

export { MqttClientPropertiesPanel };
