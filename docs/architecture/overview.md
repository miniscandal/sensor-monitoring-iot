# Arquitectura del Proyecto

Este documento describe la organización de carpetas, convenciones de nombres y principios arquitectónicos del proyecto. Su objetivo es mantener consistencia, escalabilidad y claridad en el desarrollo.

---

## 📂 Capas principales

- **`domain/`**  
  Contiene entidades, eventos, repositorios y servicios. Define el **modelo de negocio** y contratos semánticos.  
  Ejemplo: `domain/mqtt-message/entities`, `domain/mqtt-message/services`.

- **`infrastructure/`**  
  Implementa adaptadores, factories, providers, dispatcher, singleton y subjects.  
  Encapsula la **conexión con sistemas externos** (MQTT client, nodos ambientales).  
  Ejemplo: `infrastructure/mqtt-client/adapters/client`.

- **`modules/`**  
  Cada módulo es un **slice autocontenido** con UI (atomic design), hooks, constants, observers y utils.  
  Ejemplo:  
modules/environmental-nodes
├── components (atoms, molecules, organisms, pages, templates)
├── hooks
├── constants
├── observers
└── utils


- **`shared/`**  
Recursos transversales reutilizables: componentes, constantes, contexts, hooks y utils.  
Ejemplo: `shared/components/atoms/heading`, `shared/utils/deep-camel`.

- **`mocks/`**  
Datos y providers simulados para pruebas.  
Ejemplo: `mocks/environmental-nodes/data/node-collection.json`.

- **`assets/`**  
Recursos estáticos como fuentes e imágenes.

---

## 📑 Convenciones de nombres

- **Plural para contenedores**:  
`components`, `atoms`, `molecules`, `organisms`, `pages`, `templates`, `hooks`, `constants`, `observers`, `utils`, `factories`, `providers`, `adapters`, `subjects`.

- **Singular para entidades únicas**:  
Archivos específicos (`formatter.js`, `safe-round`, `extract-status`) o subcarpetas que representan un único tipo (`client` dentro de `adapters`).

- **Hooks**: siempre prefijados con `use` → `use-connected-nodes-count`, `use-properties`.  
- **Observers**: sufijo descriptivo → `node-monitor`, `node-presence/logged-in`.  
- **Constants**: nombres claros y semánticos → `mqtt-client-operation-codes.js`, `node-controls.js`.

---

## 🧩 Contexts

- Los **contexts transversales** viven en `shared/contexts`.  
- Los **contexts específicos de un módulo** deben residir dentro del propio módulo (`modules/<modulo>/contexts`).

---

## 🧪 Mocks

- Los mocks globales viven en `mocks/`.  
- Cada módulo puede tener mocks locales si son exclusivos de ese módulo.  
- Convención: mantener **simetría** con la estructura de `modules`.  
Ejemplo:  
modules/environmental-node-messages/hooks/use-messages
mocks/environmental-node-messages/hooks/use-messages.mock.js


---

## 🎯 Principios arquitectónicos

1. **Separación de capas**: dominio, infraestructura y módulos claramente diferenciados.  
2. **Autocontenidos**: cada módulo debe incluir todo lo necesario para su UI y lógica de aplicación.  
3. **Reutilización**: lo transversal vive en `shared`.  
4. **Consistencia**: pluralización uniforme y naming semántico.  
5. **Escalabilidad**: nuevos módulos pueden añadirse sin ambigüedad.  
6. **Testabilidad**: mocks reflejan la estructura real para facilitar pruebas aisladas.

---

## 📌 Alias configurados

- `@domain/*` → `./src/domain/*`  
- `@infrastructure/*` → `./src/infrastructure/*`  
- `@modules/*` → `./src/modules/*`  
- `@shared-*` → `./src/shared/*`  
- `@mocks/*` → `./src/mocks/*`  
- `@assets/*` → `./src/assets/*`

---

## ✅ Checklist rápido

- [ ] ¿El contenedor está en plural?  
- [ ] ¿Los hooks empiezan con `use`?  
- [ ] ¿Los observers tienen sufijo descriptivo?  
- [ ] ¿Los contexts están en el lugar correcto (shared vs módulo)?  
- [ ] ¿Los mocks reflejan la estructura del módulo?  
- [ ] ¿El alias corresponde a la capa correcta?
