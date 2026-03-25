# TODO

✰ Refactor the useDeviceSensorReadings hook to migrate statusCode from context-based state updates into a dedicated signal, ensuring granular reactivity and avoiding unnecessary global re-renders.
✰ Restrict selection when disconnected: An IoT device card cannot be selected if the device is in disconnected mode.
✰ Implement Guard Clauses across all MQTT observers to prevent errors from null or undefined messages (e.g., if (!message) return;).
✰ Rename OnTopicDeviceHubMonitorSubscribedObserver function, improve semantic
<!--
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
 -->
