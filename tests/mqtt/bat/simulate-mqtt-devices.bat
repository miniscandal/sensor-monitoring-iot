@echo off
setlocal enabledelayedexpansion

:: Configuration
set HOST=localhost
set PORT=1883
set TOPIC=web-iot-control-panel
set STATUS_CODE=101
set LOG_FILE=logs\mqtt_simulation.log

:: Create logs folder if it doesn't exist
if not exist logs (
  mkdir logs
)

echo Starting MQTT simulation... > %LOG_FILE%

:: Send simulated messages
for /L %%i in (1,1,20) do (
  set "id=0%%i"
  set "id=!id:~-2!"
  set "payload={\"deviceId\": \"!id!\", \"statusCode\": %STATUS_CODE%}"

  echo Sending to device !id!: !payload! >> %LOG_FILE%
  mosquitto_pub.exe -h %HOST% -p %PORT% -t "%TOPIC%" -m "!payload!"

  timeout /t 1 >nul
)

echo Simulation completed. >> %LOG_FILE%
endlocal
