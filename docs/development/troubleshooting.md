# Versión Bash (Linux/macOS/Git Bash)
✰ bash ./tests/iot-device/bash/simulate-iot-devices-connected-v1.sh


# Requiere mosquitto_clients instalado
✰ mosquitto_pub.exe -h localhost -p 1883 -t "web-iot-control-panel" -f \src\mocks\iot-device\connected.json


# Versión PowerShell (Windows)
✰ ./tests/iot-device/ps1/emulate-iot-devices.ps1 -deviceId 02 -statusCode 205
