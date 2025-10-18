/**
 * Module responsibility
 * 
 */

import { useMqttClientProperties } from '@shared-custom-hooks/use-mqtt-client-properties';

import { PropertyItem } from '@shared-components/molecules/property-item';

import mqttClientStatus from '@assets/images/mqtt-icons/mqtt-client-status.svg';
import host from '@assets/images/mqtt-icons/host.svg';
import port from '@assets/images/mqtt-icons/port.svg';
import protocol from '@assets/images/mqtt-icons/protocol.svg';
import clientId from '@assets/images/mqtt-icons/client-id.svg';

import './style.css';


function MqttClientPropertiesPanel() {
    const { connected, ...properties } = useMqttClientProperties();

    const propertyDefinitions = [
        {
            name: 'clientMqtt',
            label: 'MQTT Client Status',
            svgIcon: mqttClientStatus,
        },
        {
            name: 'host',
            label: 'Host',
            svgIcon: host,
        },
        {
            name: 'port',
            label: 'Port',
            svgIcon: port,
        },
        {
            name: 'protocol',
            label: 'Protocol',
            svgIcon: protocol,
        },
        {
            name: 'clientId',
            label: 'ID',
            svgIcon: clientId,
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
