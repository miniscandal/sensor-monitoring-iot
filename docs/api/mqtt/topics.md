# MQTT Topics

This document defines the topics to which the IoT system subscribes in order to receive  
messages from the environmental nodes, and the topics used to publish instructions or data back to those nodes.  

Examples of complete topic paths are provided for clarity.

## Topics Subscribe

### Birth

- topic: acme/ind/+/+/env-node/+/state/birth
- sample: acme/ind/norte/l1/env-node/a001/state/birth

### Death

- topic: acme/ind/+/+/env-node/+/state/death
- sample: acme/ind/norte/l1/env-node/a001/state/death

### Sensors Readings

- topic: acme/ind/+/+/env-node/+/data/sensor/all
- sample: acme/ind/norte/l1/env-node/a001/data/sensor/all

### Metadata

- topic: acme/ind/+/+/env-node/+/metadata
- sample: acme/ind/norte/l1/env-node/a001/metadata

### Env Node State Code

- topic: acme/ind/+/+/env-node/+/state-code
- sample: acme/ind/norte/l1/env-node/a001/state-code
  
### Env Node Operation Result Code
  
- topic: acme/ind/+/+/env-node/+/op-res-code
- sample: acme/ind/norte/l1/env-node/a001/op-res-code

## Topics Publish

### Env Node Command

-topic: acme/ind/{plant}/{line}/env-node/{id}/command
-sample: acme/ind/norte/l1/env-node/a001/command

### Env Node All Command

-topic: acme/ind/all/all/env-node/all/command
-sample: acme/ind/norte/l1/env-node/all/command
