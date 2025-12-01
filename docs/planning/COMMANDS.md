bash ./tests/mqtt/iot-device/bash/simulate-mqtt-iot-devices.sh

mosquitto_pub.exe -h localhost -p 1883 -t "web-iot-control-panel" -f \src\mocks\iot-device\connected.json

.\tests\mqtt\iot-device\ps1\simulate-mqtt-iot-device.ps1 -deviceId 02 -statusCode 102
