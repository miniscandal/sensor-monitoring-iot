# MQTT Broker Configuration (Mosquitto)

## Archivo de contraseñas (`passwd`)
Crear usuarios con contraseñas cifradas:

```bash
mosquitto_passwd -c /etc/mosquitto/passwd hub01
mosquitto_passwd /etc/mosquitto/passwd panel01
mosquitto_passwd /etc/mosquitto/passwd panelMain


# --- Device Hub ---
user hub01
topic write acme/ind/planta-norte/linea-1/hub/00a1/data
topic write acme/ind/planta-norte/linea-1/hub/00a1/status
topic write acme/ind/planta-norte/linea-1/hub/00a1/metadata
topic read acme/ind/planta-norte/linea-1/hub/00a1/operation

# --- Control Panel normal ---
user panel01
topic read acme/ind/+/+/+/hub/+/data
topic read acme/ind/+/+/+/hub/+/status
topic read acme/ind/+/+/+/hub/+/metadata
topic write acme/ind/+/+/+/hub/+/operation

# --- Control Panel main (modo dios) ---
user panelMain
topic read acme/ind/#
topic write acme/ind/+/+/+/hub/+/operation
topic write acme/ind/planta-centra/control-panel/+/operation


allow_anonymous false
password_file /etc/mosquitto/passwd
acl_file /etc/mosquitto/acl
