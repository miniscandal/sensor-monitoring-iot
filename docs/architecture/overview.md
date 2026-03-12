# MQTT Topic

este es para monitorear la data de todos los dispositivos hub , la data tendrá el identificador único del dispositivo hub, el estado y los datos de los sensores
'device-hub/monitor/all'

este es para controlar el estado de todos los dispositivos hub, serán instrucciones en general, ejemplo reiniciarse todos 
'device-hub/controller/all'

este es para controlar el estado de manera individual por dispositivo hub, dispositivo hub tendrá que subscribirse a un topic privado por ejemplo device-hub/controller/a013
'device-hub/controller/${device_hub_id}'
