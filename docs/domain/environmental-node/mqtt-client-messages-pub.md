mosquitto_pub -h localhost -p 1883 \
  -u "a001" -P "jwt_token" \
  -t "acme/ind/norte/l1/env-node/a001/state/birth" \
  -m '{"ts":1711749061,"ver":"1.3.0","st":"online","loc":"L3-WELD-01"}' \
  -r \
  -q 1 \
  --will-topic "acme/ind/norte/l1/env-node/a001/state/death" \
  --will-payload '{"st":"offline","res":"lost_conn"}' \
  --will-qos 1 \
  --will-retain


mosquitto_pub -h localhost -p 1883 \
  -u "a001" -P "jwt_token" \
  -t "acme/ind/norte/l1/env-node/a001/state/death" \
  -m '{"ts":1711755000,"st":"offline","res":"shutdown"}' \
  -q 1 -r


mosquitto_pub -h localhost -p 1883 \
  -u "a001" -P "jwt_token" \
  -t "acme/ind/norte/l1/env-node/a001/data/sensor/all" \
  -m '{"ts":1711749100, "seq": 1, "val":{"temp":56.2, "hum":25.4}}' \
  -q 1
