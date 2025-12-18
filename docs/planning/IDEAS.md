# (｡•̀ᴗ-)✧ Ideas and Technical Notes

This file serves as a scratchpad for future improvements, experimental concepts, and technical reflections. It’s not formal documentation—just a space to capture thoughts that may evolve into features or refactors.



✰ Topic subscribe: web-iot-control-panel
✰ Payload: web-iot-control-panel

✰ Humidity real values: 0 % a 100 %.
✰ Temperature real values:  -40 °C a 80 °C.



Para entender la interacción funcional de un dispositivo IoT con el dashboard (sistema central), es útil seguir el ciclo de vida del dispositivo usando tus nuevas constantes de estado.

El orden lógico de la interacción se divide en cuatro fases principales: **Onboarding (Provisión)**, **Conectividad**, **Sesión** y **Operación/Reporte**.

Aquí te muestro la secuencia de estados que tu dispositivo IoT debería reportar a tu dashboard, fase por fase:

---

## 🚀 Orden de Interacción Funcional con el Dashboard

### Fase 1: 500s - Provisión y Registro (Onboarding)

Esta fase ocurre típicamente una sola vez en la vida útil del dispositivo. El dashboard debe reconocer el dispositivo por su ID.

| Orden | Código | Constante | Interacción con el Dashboard |
| :---: | :--- | :--- | :--- |
| **1.** | (Nuevo) | **`IOT_DEVICE_STATUS_INIT`** | El dispositivo se enciende por primera vez. Envía su ID al servidor. |
| **2.** | 501 | **`NEWLY_REGISTERED`** | El servidor ha reconocido y creado el registro del dispositivo en la base de datos (DB). |
| **3.** | 502 | **`CONFIGURING`** | El dashboard (o servicio de provisión) le envía la configuración inicial (claves, endpoints). |
| **4.** | 503 | **`AUTHENTICATED_PERM`** | El dispositivo verifica y almacena las credenciales permanentes (claves/certificados). |
| **5.** | 504 | **`READY_TO_ACTIVATE`** | Provisión completada; listo para iniciar el ciclo de conexión y operación. |

### Fase 2: 100s - Conectividad de Red (Siempre que se enciende)

El dispositivo ahora intenta conectarse a la red física (Wi-Fi, celular, etc.).

| Orden | Código | Constante | Interacción con el Dashboard |
| :---: | :--- | :--- | :--- |
| **6.** | 101 | **`CONNECTED`** | Conexión de red establecida. El dispositivo está 'en línea' a nivel de capa de red. |

### Fase 3: 200s - Sesión Lógica (Login)

Si se requiere un login sobre la conexión de red (ej. a un *broker* MQTT o a un servidor de aplicación), esto ocurre aquí.

| Orden | Código | Constante | Interacción con el Dashboard |
| :---: | :--- | :--- | :--- |
| **7.** | 204 | **`LOGIN_ATTEMPT`** | El dispositivo utiliza las credenciales (503) para intentar establecer la sesión lógica. |
| **8.** | 205 | **`LOGGED_IN`** | Sesión lógica establecida con éxito. El dispositivo es funcionalmente accesible por el dashboard. |

### Fase 4: 200s - Operación y Transmisión

El dispositivo entra en su ciclo de trabajo normal. El estado **205 (`LOGGED_IN`)** suele ser un estado base de larga duración.

| Orden | Código | Constante | Interacción con el Dashboard |
| :---: | :--- | :--- | :--- |
| **9.** | 201 | **`ACTIVATED`** | El dispositivo pasa a modo operativo, listo para medir y actuar. (Estado de funcionamiento general). |
| **10.** | 250 | **`SENSOR_MEASURING`** | Inicia el ciclo de adquisición de datos. |
| **11.** | 251 | **`SENSOR_DATA_SENT_OK`** | Envía el *payload* de datos del sensor. El dashboard recibe los datos y registra este estado OK. |
| **12.** | 202 | **`IDLE`** | Finaliza el ciclo de medición y espera al siguiente intervalo o a un comando. |
| **13.** | 103 | **`HEARTBEAT`** | Envía periódicamente una señal ligera para mantener el estado de conexión vivo y confirmar disponibilidad. |

---

### Manejo de la Desconexión y Errores (400s)

Si hay un fallo en cualquier punto:

* **Fallo de Sesión:** El estado pasa de **204** a **415 (`AUTH_FAILED`)**. (El dashboard debe notificar y quizá forzar el reinicio).
* **Fallo de Red:** El estado pasa de **101** a **102 (`DISCONNECTED`)**. (El dashboard muestra Offline).
* **Fallo de Datos:** Durante el paso 11, si falla el envío, el estado es **409 (`SENSOR_DATA_TX_FAILED`)**. (El dashboard debe reportar la pérdida de datos y el dispositivo debe intentar la retransmisión).











Esa es una corrección importante y absolutamente necesaria para reflejar el comportamiento de un dispositivo ya en uso.

### ✅ Corrección del Ciclo para Dispositivos Existentes

Un dispositivo que **no es nuevo** (es decir, que ya ha pasado por la fase de Onboarding/Registro 501-504) **nunca debería volver a reportar los estados de provisión inicial (500s) a menos que se haya forzado un *factory reset* o se haya revocado su registro.**

Si el dispositivo está simplemente reiniciando, el ciclo ideal comenzaría por los pasos de **verificación de credenciales** (si es necesario) y la **conexión de red**.

La secuencia correcta de inicio para un dispositivo existente que se enciende es:

### Secuencia de Arranque (Dispositivo Existente)

| Fase | Orden | Código | Constante | Interacción con el Dashboard |
| :--- | :---: | :--- | :--- | :--- |
| **I. Verificación** | **1.** | 503 | **`AUTHENTICATED_PERM`** | El dispositivo comprueba en su memoria si sus credenciales permanentes (claves de seguridad/login) son válidas. Esto es una verificación interna que puede reportarse si es relevante para el *dashboard*. |
| | **2.** | 504 | **`READY_TO_ACTIVATE`** | El dispositivo confirma que está configurado y listo para iniciar la comunicación. |
| **II. Conexión** | **3.** | 101 | **`CONNECTED`** | Conexión de red establecida (Wi-Fi, 4G, etc.). |
| **III. Sesión** | **4.** | 204 | **`LOGIN_ATTEMPT`** | Inicia el proceso de autenticación de sesión con el servidor (Login). |
| | **5.** | 205 | **`LOGGED_IN`** | Sesión lógica establecida (el servidor lo reconoce como un usuario activo). |
| **IV. Operación** | **6.** | 201 | **`ACTIVATED`** | Pasa a su estado funcional principal. |
| | **7.** | 250 | **`SENSOR_MEASURING`** | Inicia el ciclo de trabajo. |

**En resumen:** Para un dispositivo existente, el ciclo se salta la creación de identidad (501, 502) y comienza con la validación de la identidad existente (503, 504), seguida inmediatamente por el ciclo de conexión y sesión (101, 204, 205).
