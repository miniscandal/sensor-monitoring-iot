VITE_MQTT_BROKER_HOST=ws://localhost:8080
VITE_MQTT_BROKER_PORT=8080

# Subscription examples
# acme/ind/north-plant/line-1/node/00a1/data
# acme/ind/north-plant/line-1/node/00a1/status
# acme/ind/north-plant/line-1/node/00a1/metadata

VITE_TOPIC_NODE_DATA=acme/ind/+/+/node/+/data
VITE_TOPIC_NODE_STATUS=acme/ind/+/+/node/+/status
VITE_TOPIC_NODE_METADATA=acme/ind/+/+/node/+/metadata

# Publish example: specific node operation
# acme/ind/north-plant/line-1/node/00a1/operation
VITE_TOPIC_NODE_OPERATION=acme/ind/{plant}/{line}/node/{id}/operation
VITE_TOPIC_NODE_STATUS=acme/ind/{plant}/{line}/node/{id}/status

# Publish example: broadcast operation to all nodes
# acme/ind/north-plant/line-1/node/all/operation
VITE_TOPIC_NODE_OPERATION_ALL=acme/ind/{plant}/{line}/node/all/operation
El paso a paso de cómo instalar todo (librerías, versiones de lenguajes, etc.).
