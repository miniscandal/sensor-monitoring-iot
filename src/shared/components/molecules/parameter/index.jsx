import { Icon } from "../../../../feat-mqtt-client-properties/components/atoms/icons";

import { PropertyWithValue } from "@shared-components/molecules/property-with-value";

import mqttClientStatusSvg from '@assets/images/mqtt-icons/mqtt-client-status.svg';
import hostSvg from '@assets/images/mqtt-icons/host.svg';
import portSvg from '@assets/images/mqtt-icons/port.svg';
import protocolSvg from '@assets/images/mqtt-icons/protocol.svg';
import clientIdSvg from '@assets/images/mqtt-icons/client-id.svg';
import topicSubscribeSvg from '@assets/images/mqtt-icons/topic-subscribe.svg';
import countSensorDeviceSvg from '@assets/images/mqtt-icons/count-sensor-device.svg';

import './style.css';


function Parameter({ text = 'parameter', icon = 'broadcast', value = '0', size = 'resizable' }) {
    const types = {
        mqttClientStatus: mqttClientStatusSvg,
        host: hostSvg,
        port: portSvg,
        protocol: protocolSvg,
        clientId: clientIdSvg,
        topicSubscribe: topicSubscribeSvg,
        countSensorDevice: countSensorDeviceSvg,
    };


    return (
        <section class="parameter" data-size={size}>
            <Icon type={types[icon]} />
            <PropertyWithValue property={text} value={value} direction="column" />
        </section>
    );
}

export { Parameter };
