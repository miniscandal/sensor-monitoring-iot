/**
 * Module responsibility
 * 
 */

import { useMqttClientProperties } from '@shared-custom-hooks/use-mqtt-client-properties';

import { MonitoringPropertyType } from '@shared-components/molecules/monitoring-property/type';

import { MonitoringProperty } from '@shared-components/molecules/monitoring-property';

import { clientMqtt } from '@shared-components/molecules/monitoring-property/variants';
import { clientId } from '@shared-components/molecules/monitoring-property/variants';
import { host } from '@shared-components/molecules/monitoring-property/variants';
import { port } from '@shared-components/molecules/monitoring-property/variants';
import { protocol } from '@shared-components/molecules/monitoring-property/variants';
import { subscribe } from '@shared-components/molecules/monitoring-property/variants';

import './style.css';

function PropertiesMonitoring() {
    const { connected, ...properties } = useMqttClientProperties();
    const monitoringProperties: { [key: string]: MonitoringPropertyType } = {
        clientMqtt,
        clientId,
        host,
        protocol,
        port,
        subscribe,
    };

    const elements = Object.keys(properties).map(key => {
        const monitoringProperty: MonitoringPropertyType = {
            ...monitoringProperties[key],
            value: connected ? properties[key] : monitoringProperties[key].value,
        };

        return <MonitoringProperty {...monitoringProperty} />;
    });

    return (
        <section class="properties_monitoring">
            {elements}
        </section>
    );
}

export { PropertiesMonitoring };
