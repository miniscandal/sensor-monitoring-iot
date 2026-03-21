VITE_MQTT_BROKER_HOST=ws://localhost:8080
VITE_MQTT_BROKER_PORT=8080

# Subscription examples
# acme/ind/north-plant/line-1/hub/00a1/data
# acme/ind/north-plant/line-1/hub/00a1/status
# acme/ind/north-plant/line-1/hub/00a1/metadata

VITE_TOPIC_HUB_DATA=acme/ind/+/+/hub/+/data
VITE_TOPIC_HUB_STATUS=acme/ind/+/+/hub/+/status
VITE_TOPIC_HUB_METADATA=acme/ind/+/+/hub/+/metadata

# Publish example: specific hub operation
# acme/ind/north-plant/line-1/hub/00a1/operation
VITE_TOPIC_HUB_OPERATION=acme/ind/{plant}/{line}/hub/{id}/operation
VITE_TOPIC_HUB_STATUS=acme/ind/{plant}/{line}/hub/{id}/status

# Publish example: broadcast operation to all hubs
# acme/ind/north-plant/line-1/hub/all/operation
VITE_TOPIC_HUB_OPERATION_ALL=acme/ind/{plant}/{line}/hub/all/operation
El paso a paso de cómo instalar todo (librerías, versiones de lenguajes, etc.).
