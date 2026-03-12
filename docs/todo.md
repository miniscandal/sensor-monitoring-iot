# TODO

✰ Renombrar los archivos de las constante mqtt-clint, el topic web-iot-control-panel a sensor-monitor-controller
✰ Renombrar el topic iot-devices  a device-hubs
✰ Rename the 'notifyStatusCode' method and update its behavior. It should no longer be limited to status codes but instead handle any MQTT message in mqtt-client-observer-manager.  
✰ Refactor the useDeviceSensorReadings hook to migrate statusCode from context-based state updates into a dedicated signal, ensuring granular reactivity and avoiding unnecessary global re-renders.
✰ Restrict selection when disconnected: An IoT device card cannot be selected if the device is in disconnected mode.

/** ************************************************************************ **/

           __-----_.                        ________
          /  \      \           o  O  O   _(        )__
         /    |  |   \_---_   o._.      _(             )_
        |     |            \   | |""""(_   Hello World!  )
        |     |             |@ | |    (_               _)
         \___/   ___       /   | |      (__          _)
           \____(____\___/     | |         (________)
           |__|                | |          |
           /   \-_             | |         |'
         /      \_ "__ _       !_!--v---v--"
        /         "|  |>)      |""""""""|
       |          _|  | ._--""||        |
       _\_____________|_|_____||________|_
      /                                   \
     /_____________________________________\
     /                                     \
    /_______________________________________\
    /                                       \
   /_________________________________________\
        {                               }
        <_______________________________|
        |                               >
        {_______________________________|               ________
        <                               }              / MINIMI \
        |_______________________________|             /__________\
\|/       \\/             \||//           |//                       \|/    |/

/** ************************************************************************ **/
