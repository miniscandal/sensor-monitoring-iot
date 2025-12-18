# (ง •̀_•́)ง To-Do List

This file tracks pending tasks, planned changes, and technical cleanups.  
It is organized by module or topic to guide ongoing development and prioritization.

✰ Rename the `notifyStatusCode` method and update its behavior. It should no longer be limited to status codes but instead handle any MQTT message in **mqtt-client-observer-manager**.  
✰ Refactor the useDeviceSensorReadings hook to migrate statusCode from context-based state updates into a dedicated signal, ensuring granular reactivity and avoiding unnecessary global re-renders."    
✰ Restrict selection when disconnected: An IoT device card cannot be selected if the device is in disconnected mode.
