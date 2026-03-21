# MQTT Topic Design Standards

## Principio general
El topic describe el **destino**, no el origen.

### Ejemplos correctos
- `acme/ind/planta-norte/linea-1/hub/00a1/data`
- `acme/ind/planta-norte/linea-1/hub/00a1/operation`

### Ejemplo incorrecto
- `acme/ind/planta-centra/control-panel-00a1/operation-code`  
  (describe al emisor, no al receptor)

---

## Roles y dominios
- `hub/` → dispositivos
- `control-panel/` → paneles

Esto asegura jerarquía semántica y extensible.

---

## Tipos de mensajes por sufijo
- `.../data` → Telemetría (ej. temperatura, humedad)
- `.../status` → Estado operativo
- `.../metadata` → Información descriptiva/configuración
- `.../operation` → Comandos hacia el dispositivo/panel

---

## Jerarquía consistente
Formato:  
`empresa/entorno/planta/linea/rol/id/tipo`

Ejemplo completo:
- `acme/ind/planta-norte/linea-1/hub/00a1/data`
- `acme/ind/planta-norte/linea-1/hub/00a1/status`
- `acme/ind/planta-norte/linea-1/hub/00a1/operation`
- `acme/ind/planta-centra/control-panel/00a1/operation`

---

## ACLs alineadas con roles
- Solo los hubs pueden publicar en `hub/*/data`
- Solo los paneles pueden publicar en `hub/*/operation`
