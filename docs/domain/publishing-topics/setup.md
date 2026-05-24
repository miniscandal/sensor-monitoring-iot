# MQTT Topics

## Topics Subscribe

- topic: acme/ind/+/+/env-node/+/state/birth
- sample: acme/ind/norte/l1/env-node/a001/state/birth

- topic: acme/ind/+/+/env-node/+/state/death
- sample: acme/ind/norte/l1/env-node/a001/state/death

- topic: acme/ind/+/+/env-node/+/data/sensor/all
- sample: acme/ind/norte/l1/env-node/a001/data/sensor/all

- topic: acme/ind/+/+/env-node/+/metadata
- sample: acme/ind/norte/l1/env-node/a001/metadata

- topic: acme/ind/+/+/env-node/+/state-code
- sample: acme/ind/norte/l1/env-node/a001/state-code
  
- topic: acme/ind/+/+/env-node/+/op-res-code
- sample: acme/ind/norte/l1/env-node/a001/op-res-code

## Topics Publish

-topic: acme/ind/{plant}/{line}/env-node/{id}/command
-sample: acme/ind/norte/l1/env-node/a001/command

-topic: acme/ind/all/all/env-node/all/command
-sample: acme/ind/norte/l1/env-node/all/command
