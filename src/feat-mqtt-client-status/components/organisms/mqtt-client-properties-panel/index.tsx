/**
 * Module responsibility
 * 
 */

import { useMqttClientProperties } from '@shared-custom-hooks/use-mqtt-client-properties';

import { PropertyItem } from '@shared-components/molecules/property-item';

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

    const propertyItemComponents = propertyDefinitions.map(property => (
        <PropertyItem {...property} value={connected ? properties[property.name] : 'N/A'} />
    ));


    return (
        <section class="parameters_monitoring">
            {propertyItemComponents}
        </section>
    );
}

export { MqttClientPropertiesPanel };
