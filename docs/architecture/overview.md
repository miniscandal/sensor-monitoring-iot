
# Arquitectura del Proyecto

✰ Este documento describe la organización de carpetas, convenciones de nombres y principios arquitectónicos del proyecto. Su objetivo es mantener consistencia, escalabilidad y claridad en el desarrollo.

---

## Capas principales

- **`domain/`**  
  Contiene entidades, eventos, repositorios y servicios. Define el **modelo de negocio** y contratos semánticos.  
  Ejemplo:

```text
  .\domain
  └── mqtt-message
      ├── entities
      ├── events
      ├── repositories
      └── services
```

- **`infrastructure/`**  
  Implementa adaptadores, factories, providers, dispatcher, singleton y subjects.  
  Encapsula la **conexión con sistemas externos** (MQTT client, nodos ambientales).  
  Ejemplo:

 ```text
 .\infrastructure
 └── mqtt-client
    ├── adapters
    ├── constants
    ├── dispatcher
    ├── factories
    ├── hooks
    ├── singleton
    └── subjects
```

- **`modules/`**  
  Cada módulo es un **slice autocontenido** con UI (atomic design), hooks, constants, observers y utils.  
  Ejemplo:

```text
.\modules
├── environmental-nodes
│   ├── components
│   ├── constants
│   ├── contexts
│   ├── hooks
│   └── observers
```

- **`shared/`**  
Recursos transversales reutilizables: componentes, constantes, contexts, hooks y utils.  
Ejemplo:

```text
.\shared
├── components
│   ├── atoms
│   ├── molecules
│   └── organisms
├── constants
│   ├── formatter.js
│   ├── iot-control-panel-operation-codes.js
│   └── observer-entities.js
├── contexts
├── hooks
└── utils
    ├── class-names
    ├── deep-camel
    └── safe-round
```

- **`mocks/`**  
Datos y providers simulados para pruebas.  
Ejemplo:

```text
.\mocks
├── environmental-nodes
│   ├── data
│   │   └── node-collection.json
│   └── providers
│       └── nodes
├── mqtt-client
│   └── adapters
│       └── client
└── mqtt-messages
    └── data
        ├── json-format
        └── plain-text
```

- **`assets/`**  
Recursos estáticos como fuentes e imágenes.
Ejemplo:

```text
.\assets
└── fonts
```

## Principios arquitectónicos

1. **Separación de capas**: dominio, infraestructura y módulos claramente diferenciados.  
2. **Autocontenidos**: cada módulo debe incluir todo lo necesario para su UI y lógica de aplicación.  
3. **Reutilización**: lo transversal vive en `shared`.  
4. **Consistencia**: pluralización uniforme y naming semántico.  
5. **Escalabilidad**: nuevos módulos pueden añadirse sin ambigüedad.  
6. **Testabilidad**: mocks reflejan la estructura real para facilitar pruebas aisladas.

---

## Alias configurados

- `'@domain'`: '/src/domain',
- `'@infrastructure'`: '/src/infrastructure',
- `'@modules`': '/src/modules',
- `'@assets'`: '/src/assets',
- `'@mocks':` '/src/mocks',
- `'@shared-components'`: '/src/shared/components',
- `'@shared-constants'`: '/src/shared/constants',
- `'@shared-contexts'`: '/src/shared/contexts',
- `'@shared-hooks'`: '/src/shared/hooks',
- `'@shared-utils'`: '/src/shared/utils',

---
