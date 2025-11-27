# (ง •̀_•́)ง To-Do List

This file tracks pending tasks, planned changes, and technical cleanups.  
It is organized by module or topic to guide ongoing development and prioritization.

✰ Rename the `message` parameter in the `notify` method of **mqtt-client-observer-manager**, since it does not represent an actual MQTT message.  
✰ Rename the `notifyStatusCode` method and update its behavior. It should no longer be limited to status codes but instead handle any MQTT message in **mqtt-client-observer-manager**.  
✰ Rename `useMqttClientMessageTracking`.  
✰ Refactor `FeatMqttClientStatus` to follow the **Domain + Action + Level** convention (`MqttClientStatusFeature`).  
✰ In the **IoTDeviceCard** component, implement constants for IoT device states with the following status values: `active`, `alert`, `idle`, `urgent`.
