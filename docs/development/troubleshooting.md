# Troubleshooting

✰

## Commands PowerShell

```PowerShell
mosquitto_pub.exe -h localhost -p 1883 -t "device-hub/monitor/all" -f .\src\mocks\iot-devices\mqtt-messages\connected.json

./tests/iot-device/ps1/emulate-iot-devices.ps1 -deviceId 02 -statusCode 205

mosquitto_sub.exe -t 'device-hub/controller/all'

mosquitto_pub.exe -h localhost -p 1883 -t "device-hub/monitor/all" -m '{"deviceId": "0a2", "statusCode": 205}'
```

```bash
bash ./tests/iot-device/bash/simulate-iot-devices-connected-v1.sh
```

## LWT Example

```JavaScript
this.client = mqtt.connect(import.meta.env.VITE_MQTT_BROKER, {
    clientId: 'anime',
    will: {
        topic: import.meta.env.VITE_MQTT_TOPIC_MONITOR_ALL,
        payload: 'offline',
        qos: 1,
        retain: true,
    },
});
```

## MQTT Client CLI

mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/data" -m '{"statusCode": 205}'
mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/data" -m '{"statusCode": 206}'

mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/data" -m '{"statusCode": 205}'
mosquitto_pub.exe -h localhost -p 1883 -t "acme/ind/planta-norte/linea-1/hub/a001/data" -m '{"statusCode": 252, "sensorReadings": {"temperature": 2, "humidity": 21}}'
