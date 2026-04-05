# Requirements

✰ In the NodeCard component, define and apply state mappings that associate each statusCode with the corresponding svgIconName and statusColor.
Example: const svgIconName = {
        101: 'motionSensorActive',
        202: 'motionSensorActive',
        alert: 'motionSensorAlert',
        idle: 'motionSensorIdle',
        urgent: 'motionSensorUrgent',
    }[statusCode];

    const statusColor = {
        101: 'registered',
        202: 'active',
        103: 'alert',
        104: 'idle',
        105: 'urgent',
    }[statusCode];
✰ El iot nodo solo puede ser seleccionado si su código de estado es idle o sensor data sent ok

✰ Replantear si sensor data sent ok es un estado o una confirmación para determinar la lógica y estilos de iot nodo card
