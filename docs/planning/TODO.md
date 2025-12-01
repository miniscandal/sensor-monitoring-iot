# (ง •̀_•́)ง To-Do List

This file tracks pending tasks, planned changes, and technical cleanups.  
It is organized by module or topic to guide ongoing development and prioritization.

✰ Rename the `message` parameter in the `notify` method of **mqtt-client-observer-manager**, since it does not represent an actual MQTT message.  
✰ Rename the `notifyStatusCode` method and update its behavior. It should no longer be limited to status codes but instead handle any MQTT message in **mqtt-client-observer-manager**.  
✰ Rename `useMqttClientMessageTracking`.  
✰ Refactor `FeatMqttClientStatus` to follow the **Domain + Action + Level** convention (`MqttClientStatusFeature`).  
✰ In the **IoTDeviceCard** component, implement constants for IoT device states with the following status values: `active`, `alert`, `idle`, `urgent`.
✰ Refactor the useDeviceSensorReadings hook to migrate statusCode from context-based state updates into a dedicated signal, ensuring granular reactivity and avoiding unnecessary global re-renders."


✰ In the IoTDeviceCard component, define and apply state mappings that associate each statusCode with the corresponding svgIconName and statusColor.
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
    
