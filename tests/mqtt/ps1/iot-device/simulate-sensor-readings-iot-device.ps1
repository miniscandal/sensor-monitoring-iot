mosquitto_pub.exe -h localhost -p 1883 -t "web-iot-control-panel" -m '{
    "deviceId": "01",
    "statusCode": 201,
    "sensorReadings": {
        "temperature": 25.3,
        "humidity": 60
    },
    "timestamp": "2025-10-18T14:32:00Z"
}'
