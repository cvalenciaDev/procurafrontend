# Plan de Pruebas QA — ProcuraFrontend
> Generado: 2026-03-09 | Angular 17+ | Backend: http://localhost:8080/api

---

## CONVENCIONES

| Símbolo | Significado |
|---------|-------------|
| ✅ | Resultado esperado (PASS) |
| ❌ | Bug detectado (FAIL) |
| ⚠️ | Comportamiento inesperado / pendiente de análisis |
| 📝 | Nota u observación |

**Estados de prueba:** `PASS` / `FAIL` / `SKIP` / `BLOQUEADO`

---

## ÍNDICE DE MÓDULOS

1. [Autenticación (Auth)](#1-autenticación)
2. [Creación de Perfil](#2-creación-de-perfil)
3. [Recuperación de Contraseña](#3-recuperación-de-contraseña)
4. [Navbar y Navegación](#4-navbar-y-navegación)
5. [Listado de Proyectos (Job List)](#5-listado-de-proyectos)
6. [Detalle de Proyecto](#6-detalle-de-proyecto)
7. [Gestión de Proyectos (Empresa)](#7-gestión-de-proyectos-empresa)
8. [Postulaciones / Bids (Proveedor)](#8-postulaciones--bids-proveedor)
9. [Gestión de Bids (Empresa)](#9-gestión-de-bids-empresa)
10. [Perfil de Empresa](#10-perfil-de-empresa)
11. [Perfil de Proveedor](#11-perfil-de-proveedor)
12. [Listado de Empresas](#12-listado-de-empresas)
13. [Listado de Proveedores](#13-listado-de-proveedores)
14. [Páginas Informativas](#14-páginas-informativas)
15. [Flujos Combinados End-to-End](#15-flujos-combinados-end-to-end)
16. [Casos Límite y Seguridad](#16-casos-límite-y-seguridad)

---

## PREPARACIÓN DEL ENTORNO

### Prerrequisitos
- [ ] Backend corriendo en `http://localhost:8080/api`
- [ ] Base de datos limpia (o al menos sin datos del test anterior)
- [ ] Frontend corriendo en `http://localhost:4200`
- [ ] Navegador con DevTools abierto (consola + network tab)
- [ ] Al menos dos cuentas de prueba preparadas:
  - **Cuenta A:** usuario que se registrará en la sesión
  - **Cuenta B:** usuario pre-existente con ambos perfiles (COMPANY + PROVIDER)

### Cuentas de prueba sugeridas
| Cuenta | Email | Password | Estado inicial |
|--------|-------|----------|----------------|
| A-Nueva | test.nuevo@qa.com | Test1234! | No existe |
| B-Empresa | empresa@qa.com | Test1234! | Solo perfil COMPANY |
| C-Proveedor | proveedor@qa.com | Test1234! | Solo perfil PROVIDER |
| D-Ambos | ambos@qa.com | Test1234! | Ambos perfiles |
| E-Reset | reset@qa.com | Test1234! | Existe, para reset password |

---

## 1. AUTENTICACIÓN

### 1.1 — Registro de usuario

**URL:** `/signup`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 1.1.1 | Registro exitoso | 1. Ir a `/signup`<br>2. Ingresar firstName, lastName, username, email, phone, password válidos<br>3. Click en "Registrarse" | Token guardado en localStorage.<br>Redirect a `/create-profile` | | |
| 1.1.2 | Email ya registrado | Repetir registro con el mismo email | Mostrar mensaje de error "Email ya en uso" o similar | | |
| 1.1.3 | Password débil — solo letras | Ingresar password: `password` | Indicadores de fortaleza NO marcados (número, especial, mayúscula) | | |
| 1.1.4 | Password fuerte | Ingresar password: `Test1234!` | Todos los indicadores de fortaleza marcados (✓ 8 chars, ✓ min, ✓ mayús, ✓ número, ✓ especial) | | |
| 1.1.5 | Campos obligatorios vacíos | Click en "Registrarse" sin llenar nada | Validaciones de formulario visibles en todos los campos requeridos | | |
| 1.1.6 | Email con formato inválido | Email: `usuario@` | Validación de email inválido | | |
| 1.1.7 | Username con espacios | Username: `mi usuario` | Validación o trimming correcto | | |
| 1.1.8 | Link a Login | Click en "¿Ya tienes cuenta? Iniciar sesión" | Navega a `/login` | | |

---

### 1.2 — Login

**URL:** `/login`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 1.2.1 | Login exitoso — solo perfil COMPANY | Login con cuenta B-Empresa | `updateUserType('COMPANY')` → redirect a `/job-list-one` | | |
| 1.2.2 | Login exitoso — solo perfil PROVIDER | Login con cuenta C-Proveedor | `updateUserType('PROVIDER')` → redirect a `/job-list-one` | | |
| 1.2.3 | Login exitoso — ambos perfiles | Login con cuenta D-Ambos | `updateUserType('PROVIDER')` (prioridad) → redirect a `/job-list-one` | | |
| 1.2.4 | Login exitoso — sin perfiles | Login con cuenta recién registrada | Redirect a `/create-profile` | | |
| 1.2.5 | Credenciales incorrectas | Email correcto, password incorrecto | Mensaje de error visible. No navegar | | |
| 1.2.6 | Usuario inexistente | Email: `noexiste@qa.com` | Mensaje de error visible | | |
| 1.2.7 | Campos vacíos | Click "Iniciar sesión" sin llenar | Validaciones de formulario | | |
| 1.2.8 | Token guardado | Login exitoso | `localStorage['accessToken']` contiene el token JWT | | |
| 1.2.9 | Link a Registro | Click en "¿No tienes cuenta? Regístrate" | Navega a `/signup` | | |
| 1.2.10 | Link a Recuperar contraseña | Click en "¿Olvidaste tu contraseña?" | Navega a `/reset-password` | | |

---

### 1.3 — Logout

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 1.3.1 | Logout exitoso | Estar logueado → click en "Cerrar sesión" (navbar) | Token eliminado de localStorage. `currentUser$` = null. Redirect a `/login` | | |
| 1.3.2 | Navbar post-logout | Después de logout | Botones de "Login" y "Registro" visibles. Botones de perfil ocultos | | |
| 1.3.3 | Acceso post-logout | Después de logout, visitar `/my-projects` manualmente | Redirect a `/login` o `/error` (no debe mostrar datos) | | |

---

## 2. CREACIÓN DE PERFIL

**URL:** `/create-profile` y `/create-profile?type=COMPANY|PROVIDER`

### 2.1 — Selección de tipo de perfil

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 2.1.1 | Usuario sin perfiles ve selector | Login → redirect a `/create-profile` (sin query param) | Muestra pantalla de selección: "Soy Empresa" / "Soy Proveedor" | | |
| 2.1.2 | Query param `?type=COMPANY` | Navegar a `/create-profile?type=COMPANY` | Salta la selección y va directo al formulario de empresa | | |
| 2.1.3 | Query param `?type=PROVIDER` | Navegar a `/create-profile?type=PROVIDER` | Salta la selección y va directo al formulario de proveedor | | |
| 2.1.4 | Usuario con solo perfil COMPANY | Login con B-Empresa → navbar botón "Crear perfil de Proveedor" | Navega a `/create-profile?type=PROVIDER` con formulario de proveedor directo | | |
| 2.1.5 | Usuario con solo perfil PROVIDER | Login con C-Proveedor → navbar botón "Crear perfil de Empresa" | Navega a `/create-profile?type=COMPANY` con formulario de empresa directo | | |
| 2.1.6 | Usuario con ambos perfiles visita `/create-profile` | Login con D-Ambos → navegar a `/create-profile` | Muestra mensaje "ya tienes ambos perfiles" o redirect | | |

---

### 2.2 — Formulario de perfil de Empresa

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 2.2.1 | Crear perfil empresa exitoso | Llenar todos los campos requeridos → Submit | `POST /companies` exitoso. `PUT /users/me/type` → `GET /companies/my` + `/providers/my` → redirect `/job-list-one` | | |
| 2.2.2 | Campos obligatorios vacíos | Submit sin llenar nada | Validaciones visibles en todos los campos requeridos | | |
| 2.2.3 | Subir logo válido (< 2MB) | Seleccionar imagen < 2MB | Preview del logo visible. Logo enviado como base64 | | |
| 2.2.4 | Subir logo inválido (> 2MB) | Seleccionar imagen > 2MB | Mensaje de error "Imagen demasiado grande" o similar | | |
| 2.2.5 | Subir archivo no-imagen | Seleccionar un .pdf como logo | Validación rechaza el archivo | | |
| 2.2.6 | Año de fundación negativo | foundedYear: `-1` | Validación de valor mínimo | | |
| 2.2.7 | Email de contacto inválido | contactEmail: `invalido@` | Validación de formato email | | |
| 2.2.8 | Número de empleados = 0 | employeesCount: `0` | Aceptado o validación de mínimo 1 | | |
| 2.2.9 | Website con URL válida | `https://miempresa.com` | Campo aceptado sin error | | |
| 2.2.10 | Estado del navbar post-creación | Después de crear empresa | Si ya tenía perfil de proveedor → "Cambiar a Proveedor" visible. Si no → botón "Crear perfil de Proveedor" visible | | |

---

### 2.3 — Formulario de perfil de Proveedor

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 2.3.1 | Crear perfil proveedor exitoso | Llenar todos los campos requeridos → Submit | `POST /providers` exitoso → redirect `/job-list-one` | | |
| 2.3.2 | Campos obligatorios vacíos | Submit sin llenar nada | Validaciones visibles | | |
| 2.3.3 | Subir logo | Seleccionar imagen válida | Preview visible. Guardado como base64 | | |
| 2.3.4 | `isAvailable` toggle | Marcar/desmarcar checkbox de disponibilidad | Valor booleano correcto al enviar | | |
| 2.3.5 | hourlyRate con decimales | `25.50` | Valor aceptado y enviado correctamente | | |
| 2.3.6 | Número WhatsApp — formato | `+56912345678` | Campo aceptado | | |
| 2.3.7 | Servicios (comma-separated) | `Consultoría, Diseño, Implementación` | Guardado como string con comas | | |

---

## 3. RECUPERACIÓN DE CONTRASEÑA

### 3.1 — Solicitar reset (Forgot Password)

**URL:** `/reset-password`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 3.1.1 | Email válido registrado | Ingresar email de E-Reset → Submit | Mensaje de éxito "Revisa tu correo" o similar. `POST /auth/forgot-password` llamado | | |
| 3.1.2 | Email no registrado | Ingresar `noexiste@qa.com` → Submit | Mensaje de error o mensaje genérico por seguridad | | |
| 3.1.3 | Email con formato inválido | Ingresar `invalido` → Submit | Validación de formato de email | | |
| 3.1.4 | Campo vacío | Submit sin email | Validación de campo requerido | | |

---

### 3.2 — Nueva contraseña (Reset Password)

**URL:** `/new-password?token={token}`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 3.2.1 | Token válido — cambio exitoso | Abrir link del correo → ingresar nueva password → Submit | `POST /auth/reset-password` exitoso → redirect a `/login` | | |
| 3.2.2 | Passwords no coinciden | newPassword: `Test1234!`, confirmPassword: `Diferente1!` | Error "Las contraseñas no coinciden" | | |
| 3.2.3 | Password menor a 6 caracteres | newPassword: `abc` | Error de validación de longitud mínima | | |
| 3.2.4 | Token ausente o inválido | Navegar a `/new-password` sin token | Comportamiento definido (error, redirect a login, etc.) | | |
| 3.2.5 | Token expirado | Usar token de más de 24h (o el backend lo rechaza) | Mensaje de error "Token expirado" | | |

---

## 4. NAVBAR Y NAVEGACIÓN

### 4.1 — Estado sin sesión

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 4.1.1 | Navbar sin login | Visitar `/` sin sesión | Se ven botones "Iniciar Sesión" y "Registrarse". No aparecen menús de perfil | | |
| 4.1.2 | Links de navegación | Click en "Proyectos", "Empresas", "Candidatos" | Navega a las rutas correspondientes | | |
| 4.1.3 | Logo / Brand | Click en logo | Navega a `/` | | |

---

### 4.2 — Estado con sesión — un solo perfil

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 4.2.1 | Solo perfil COMPANY | Login con B-Empresa | Navbar muestra: botón "Crear perfil de Proveedor" + opciones de empresa (Mis Proyectos) | | |
| 4.2.2 | Solo perfil PROVIDER | Login con C-Proveedor | Navbar muestra: botón "Crear perfil de Empresa" + opciones de proveedor (Mis Bids) | | |
| 4.2.3 | Botón "Crear perfil de X" | Click en botón | Navega a `/create-profile?type=X` | | |

---

### 4.3 — Estado con sesión — ambos perfiles

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 4.3.1 | Botón "Cambiar a Empresa" | Login con D-Ambos (activeType=PROVIDER) | Dropdown/botón "Cambiar a Empresa" visible | | |
| 4.3.2 | Cambiar a Empresa | Click en "Cambiar a Empresa" | `PUT /users/me/type` con `COMPANY`. Navbar se actualiza con opciones de empresa | | |
| 4.3.3 | Botón "Cambiar a Proveedor" | Después de cambiar a Empresa | Dropdown/botón "Cambiar a Proveedor" visible | | |
| 4.3.4 | Cambiar a Proveedor | Click en "Cambiar a Proveedor" | `PUT /users/me/type` con `PROVIDER`. Navbar actualizado | | |
| 4.3.5 | Foto de perfil | Perfil con logo cargado | Navbar muestra logo del perfil activo (empresa o proveedor) | | |
| 4.3.6 | Nombre de usuario | Dropdown de perfil | Muestra nombre correcto del usuario logueado | | |

---

### 4.4 — Menú móvil / responsivo

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 4.4.1 | Hamburger en móvil | Viewport < 768px → click menú hamburger | Menú se despliega correctamente | | |
| 4.4.2 | Click fuera del menú | Menú abierto → click en contenido de la página | Menú se cierra | | |

---

## 5. LISTADO DE PROYECTOS

**URL:** `/job-list-one`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 5.1 | Carga inicial | Navegar a `/job-list-one` | Lista de proyectos con status PUBLISHED o IN_PROGRESS. `GET /projects` llamado | | |
| 5.2 | Proyectos DRAFT no visibles | Crear proyecto en DRAFT → verificar en lista | Proyectos en DRAFT no aparecen en el listado | | |
| 5.3 | Paginación — navegación | > 6 proyectos → click en página 2 | Muestra los siguientes 6 proyectos | | |
| 5.4 | Paginación — scroll | Click en página siguiente | Página hace scroll hacia arriba | | |
| 5.5 | Icono de categoría | Proyectos de CONSTRUCTION, MINING, AGROINDUSTRY, OTHER | Cada categoría muestra su ícono y color correspondiente | | |
| 5.6 | Label de status | Proyecto PUBLISHED, IN_PROGRESS | Labels con colores correctos | | |
| 5.7 | Click en tarjeta de proyecto | Click en un proyecto | Navega a `/job-detail-one/{id}` | | |
| 5.8 | Lista vacía | Backend sin proyectos publicados | Mensaje "No hay proyectos disponibles" o similar | | |
| 5.9 | Sin sesión | Acceder sin login | Proyectos visibles (acceso público) o redirect a login | | |

---

## 6. DETALLE DE PROYECTO

**URL:** `/job-detail-one/:id`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 6.1 | Carga de datos | Navegar a `/job-detail-one/{id}` válido | `GET /projects/{id}` → muestra todos los datos: título, descripción, presupuesto, deadline, ubicación, categoría, status, requerimientos | | |
| 6.2 | ID inexistente | Navegar a `/job-detail-one/99999` | Manejo de error — mensaje o redirect a `/error` | | |
| 6.3 | Botón "Postularse" visible para PROVIDER | Login como C-Proveedor → ver proyecto | Botón "Apply Now" / "Postularse" visible | | |
| 6.4 | Botón "Postularse" oculto para COMPANY | Login como B-Empresa → ver proyecto | Botón "Postularse" NO visible | | |
| 6.5 | Click "Postularse" | Como proveedor → click "Apply Now" | Navega a `/job-apply?projectId={id}` | | |
| 6.6 | Sin sesión | Ver proyecto sin login | Proyecto visible o redirect a login al hacer clic en "Postularse" | | |
| 6.7 | Rango de presupuesto | Proyecto con budgetMin y budgetMax | Muestra "$ {min} - $ {max}" correctamente formateado | | |
| 6.8 | Deadline pasado | Proyecto con fecha límite vencida | Muestra la fecha sin crash | | |

---

## 7. GESTIÓN DE PROYECTOS (EMPRESA)

### 7.1 — Listado de mis proyectos

**URL:** `/my-projects`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 7.1.1 | Carga de proyectos propios | Login como B-Empresa → `/my-projects` | `GET /projects/my` → lista solo los proyectos de esta empresa | | |
| 7.1.2 | Sin proyectos | Empresa sin proyectos creados | Mensaje "No tienes proyectos aún" o similar | | |
| 7.1.3 | Status labels | Proyectos con distintos status | Labels y colores correctos: DRAFT, PUBLISHED, IN_PROGRESS, COMPLETED, CANCELLED | | |
| 7.1.4 | Botón "Editar" | Click en editar proyecto | Navega a `/project-form/{id}` | | |
| 7.1.5 | Botón "Ver Bids" | Click en ver bids de proyecto | Navega a `/project-bids/{id}` | | |
| 7.1.6 | Botón "Eliminar" | Click en eliminar | Aparece confirmación. Al confirmar: `DELETE /projects/{id}` → proyecto desaparece de la lista | | |
| 7.1.7 | Cancelar eliminación | Click en eliminar → cancelar confirmación | Proyecto NO eliminado. Lista sin cambios | | |
| 7.1.8 | Acceso como PROVIDER | Login como C-Proveedor → `/my-projects` | No accesible o mensaje de error (solo empresas) | | |

---

### 7.2 — Crear proyecto

**URL:** `/project-form`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 7.2.1 | Crear proyecto exitoso | Llenar todos los campos → Submit | `POST /projects` → mensaje de éxito → redirect a `/my-projects` | | |
| 7.2.2 | Campos obligatorios vacíos | Submit sin llenar | Validaciones en todos los campos requeridos | | |
| 7.2.3 | Categorías disponibles | Dropdown de categoría | Opciones: CONSTRUCTION, MINING, AGROINDUSTRY, OTHER | | |
| 7.2.4 | Status al crear | Status dropdown | Opciones: DRAFT, PUBLISHED, IN_PROGRESS, COMPLETED, CANCELLED | | |
| 7.2.5 | budgetMin > budgetMax | Min: 1000, Max: 500 | Validación de rango de presupuesto | | |
| 7.2.6 | Fecha deadline en el pasado | Seleccionar fecha pasada | Validación o warning visible | | |
| 7.2.7 | Título duplicado | Mismo título que proyecto existente | Aceptado o error del backend | | |
| 7.2.8 | Subir logo de proyecto | Imagen válida | Preview visible. Logo guardado | | |
| 7.2.9 | attachmentUrl | URL de adjunto | Campo opcional aceptado | | |

---

### 7.3 — Editar proyecto

**URL:** `/project-form/:id`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 7.3.1 | Carga de datos existentes | `/project-form/{id}` | Formulario pre-llenado con datos actuales del proyecto | | |
| 7.3.2 | Editar y guardar | Modificar título → Submit | `PUT /projects/{id}` → éxito → redirect a `/my-projects` | | |
| 7.3.3 | Cambiar status | Status: DRAFT → PUBLISHED | Actualización correcta | | |
| 7.3.4 | ID inexistente | `/project-form/99999` | Error manejado correctamente | | |
| 7.3.5 | Proyecto de otra empresa | Editar proyecto que no pertenece al usuario | Backend rechaza o frontend redirige | | |

---

## 8. POSTULACIONES / BIDS (PROVEEDOR)

### 8.1 — Mis Bids

**URL:** `/my-bids`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 8.1.1 | Carga de bids enviados | Login como C-Proveedor → `/my-bids` | `GET /bids` → lista de bids del proveedor | | |
| 8.1.2 | Sin bids | Proveedor sin bids previos | Mensaje "No has enviado postulaciones aún" o similar | | |
| 8.1.3 | Status labels de bids | Bids con distintos status | PENDING (amarillo), ACCEPTED (verde), REJECTED (rojo), WITHDRAWN (gris) o similar | | |
| 8.1.4 | Botón "Ver Proyecto" | Click en ver proyecto del bid | Navega a `/job-detail-one/{projectId}` | | |
| 8.1.5 | Retirar bid — botón visible | Bid con status PENDING | Botón "Retirar" visible | | |
| 8.1.6 | Retirar bid — flujo | Click "Retirar" → confirmar | `DELETE /bids/{id}` → bid desaparece o status cambia a WITHDRAWN | | |
| 8.1.7 | Retirar bid ACCEPTED | Bid con status ACCEPTED | Botón "Retirar" NO visible (o deshabilitado) | | |

---

### 8.2 — Crear nuevo bid (formulario en /my-bids)

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 8.2.1 | Dropdown de proyectos | Ver formulario de nuevo bid | Dropdown muestra proyectos PUBLISHED disponibles | | |
| 8.2.2 | Crear bid exitoso | Seleccionar proyecto, llenar amount, proposal, estimatedDays → Submit | `POST /bids` → bid aparece en la lista | | |
| 8.2.3 | Campos vacíos | Submit sin llenar | Validaciones en todos los campos requeridos | | |
| 8.2.4 | amount = 0 | Monto: `0` | Validación de monto mínimo | | |
| 8.2.5 | amount negativo | Monto: `-100` | Validación rechaza valor negativo | | |
| 8.2.6 | estimatedDays = 0 | Días: `0` | Validación de mínimo 1 día | | |
| 8.2.7 | Bid duplicado al mismo proyecto | Enviar dos bids al mismo proyecto | Backend rechaza o frontend previene el duplicado | | |
| 8.2.8 | Propuesta muy larga | proposal con 5000 caracteres | Manejo correcto (truncar, error, o aceptar) | | |

---

### 8.3 — Aplicar desde detalle de proyecto

**URL:** `/job-apply?projectId={id}`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 8.3.1 | Carga del formulario | Navegar a `/job-apply?projectId={id}` como proveedor | Formulario de bid con el proyecto pre-seleccionado | | |
| 8.3.2 | Submit exitoso | Completar y enviar bid | `POST /bids` → mensaje de éxito | | |
| 8.3.3 | Sin projectId param | `/job-apply` sin query param | Manejo de error o campo vacío | | |
| 8.3.4 | Acceso como empresa | Login como COMPANY → `/job-apply` | No debería poder postularse | | |

---

## 9. GESTIÓN DE BIDS (EMPRESA)

**URL:** `/project-bids/:id`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 9.1 | Carga de bids del proyecto | Login como B-Empresa → `/project-bids/{id}` | `GET /bids/project/{id}` → lista de bids recibidos | | |
| 9.2 | Sin bids | Proyecto sin postulaciones | Mensaje "No hay postulaciones para este proyecto" | | |
| 9.3 | Detalles de cada bid | Ver lista de bids | Muestra: nombre proveedor, monto, propuesta, días estimados, status | | |
| 9.4 | Aceptar bid | Click "Aceptar" en bid PENDING | `PUT /bids/{id}/accept` → status cambia a ACCEPTED | | |
| 9.5 | Rechazar bid | Click "Rechazar" en bid PENDING | `PUT /bids/{id}/reject` → status cambia a REJECTED | | |
| 9.6 | Ver perfil del proveedor | Click "Ver Proveedor" | Navega a `/candidate-profile/{providerId}` | | |
| 9.7 | Aceptar bid ya ACCEPTED | Bid con status ACCEPTED | Botón "Aceptar" deshabilitado o no visible | | |
| 9.8 | Proyecto de otra empresa | URL con ID de proyecto ajeno | Backend rechaza o frontend no muestra bids | | |
| 9.9 | ID de proyecto inexistente | `/project-bids/99999` | Error manejado. No crash | | |
| 9.10 | Acceso como PROVIDER | Login como proveedor → `/project-bids/{id}` | No accesible o error | | |

---

## 10. PERFIL DE EMPRESA

### 10.1 — Ver perfil de empresa

**URL:** `/employer-profile` y `/employer-profile/:id`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 10.1.1 | Ver propio perfil | Login como B-Empresa → `/employer-profile` | Muestra datos de la empresa del usuario actual | | |
| 10.1.2 | Ver perfil por ID | Navegar a `/employer-profile/{id}` | `GET /companies/{id}` → datos de esa empresa | | |
| 10.1.3 | ID inexistente | `/employer-profile/99999` | Manejo de error | | |
| 10.1.4 | Logo mostrado | Empresa con logo | Logo visible en el perfil | | |
| 10.1.5 | Empresa sin logo | Empresa sin logo subido | Placeholder o iniciales mostradas | | |

---

### 10.2 — Editar perfil de empresa

**URL:** `/employer-profile-edit`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 10.2.1 | Carga datos actuales | Login como B-Empresa → `/employer-profile-edit` | Formulario pre-llenado con datos actuales | | |
| 10.2.2 | Editar y guardar | Cambiar descripción → Submit | `PUT /companies/profile` → éxito → datos actualizados | | |
| 10.2.3 | Cambiar logo | Subir nueva imagen | Nuevo logo guardado como base64 | | |
| 10.2.4 | Acceso sin perfil de empresa | Login como C-Proveedor → `/employer-profile-edit` | Error o redirect | | |

---

## 11. PERFIL DE PROVEEDOR

### 11.1 — Ver perfil de proveedor

**URL:** `/candidate-profile` y `/candidate-profile/:id`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 11.1.1 | Ver propio perfil | Login como C-Proveedor → `/candidate-profile` | Muestra datos del proveedor actual | | |
| 11.1.2 | Ver perfil por ID | `/candidate-profile/{id}` | `GET /providers/{id}` → datos del proveedor | | |
| 11.1.3 | Servicios mostrados | Proveedor con servicios separados por comas | Servicios mostrados como tags/etiquetas | | |
| 11.1.4 | Logo mostrado | Proveedor con logo | Logo visible | | |
| 11.1.5 | WhatsApp link | Proveedor con número WhatsApp | Click → abre WhatsApp o enlace externo | | |

---

### 11.2 — Editar perfil de proveedor

**URL:** `/candidate-profile-edit`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 11.2.1 | Carga datos actuales | Login como C-Proveedor → `/candidate-profile-edit` | Formulario pre-llenado | | |
| 11.2.2 | Editar y guardar | Cambiar specialty → Submit | `PUT /providers/profile` → éxito | | |
| 11.2.3 | Toggle isAvailable | Cambiar disponibilidad | Valor guardado correctamente | | |

---

### 11.3 — Configuración de proveedor

**URL:** `/candidate-profile-setting`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 11.3.1 | Carga de settings | Login como C-Proveedor → `/candidate-profile-setting` | Página carga sin errores | | |
| 11.3.2 | Actualizar datos de usuario | Cambiar firstName, lastName, phone → guardar | `PUT /users/me` → datos actualizados | | |
| 11.3.3 | Eliminar cuenta | Click "Eliminar cuenta" → confirmar | `DELETE /users/me` → logout → redirect | | |
| 11.3.4 | Cancelar eliminación | Click eliminar → cancelar | Cuenta NO eliminada | | |

---

## 12. LISTADO DE EMPRESAS

**URL:** `/employers`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 12.1 | Carga lista | Navegar a `/employers` | `GET /companies` → lista de todas las empresas | | |
| 12.2 | Cards de empresa | Ver cards | Muestran: logo/iniciales, nombre, industria, ciudad, país | | |
| 12.3 | Click en empresa | Click en card de empresa | Navega a `/employer-profile/{id}` | | |
| 12.4 | Lista vacía | Sin empresas registradas | Mensaje apropiado | | |
| 12.5 | Acceso público | Sin sesión | Lista visible o redirect a login | | |

---

## 13. LISTADO DE PROVEEDORES

**URL:** `/candidates`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 13.1 | Carga lista | Navegar a `/candidates` | `GET /providers` → lista de todos los proveedores | | |
| 13.2 | Tags de servicios | Proveedor con servicios separados por coma | Se muestran máximo 3 tags de servicios | | |
| 13.3 | Iniciales en avatar | Proveedor sin logo | Avatar muestra iniciales del nombre | | |
| 13.4 | Click en proveedor | Click en card | Navega a `/candidate-profile/{id}` | | |
| 13.5 | Lista vacía | Sin proveedores registrados | Mensaje apropiado | | |
| 13.6 | Acceso público | Sin sesión | Lista visible o redirect | | |

---

## 14. PÁGINAS INFORMATIVAS

### 14.1 — Contact Us

**URL:** `/contactus`

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 14.1.1 | Formulario carga | Navegar a `/contactus` | Formulario con campos: nombre, email, asunto, mensaje | | |
| 14.1.2 | Submit formulario | Llenar todos → submit | Mensaje de éxito (simulado en 1.5s). No hay API real | | |
| 14.1.3 | Campos vacíos | Submit sin llenar | Validaciones visibles | | |
| 14.1.4 | Email inválido | Email: `mal@` | Validación de formato | | |

---

### 14.2 — Páginas estáticas

| # | Página | Pasos | Resultado Esperado | Estado | Notas |
|---|--------|-------|-------------------|--------|-------|
| 14.2.1 | About Us | `/aboutus` | Página carga sin errores | | |
| 14.2.2 | Services | `/services` | Página carga sin errores | | |
| 14.2.3 | Pricing | `/pricing` | Página carga sin errores | | |
| 14.2.4 | Terms | `/terms` | Página carga sin errores | | |
| 14.2.5 | Privacy | `/privacy` | Página carga sin errores | | |
| 14.2.6 | Help Center Overview | `/helpcenter-overview` | Página carga sin errores | | |
| 14.2.7 | Help FAQs | `/helpcenter-faqs` | Página carga sin errores | | |
| 14.2.8 | Help Guides | `/helpcenter-guides` | Página carga sin errores | | |
| 14.2.9 | Help Support | `/helpcenter-support` | Página carga sin errores | | |
| 14.2.10 | Error Page | `/error` | Página carga sin errores | | |
| 14.2.11 | Ruta inexistente | `/ruta-que-no-existe` | Redirect a `/error` | | |

---

### 14.3 — Blog

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 14.3.1 | Lista de blogs | `/blogs` | Página carga sin errores | | |
| 14.3.2 | Blog con sidebar | `/blog-sidebar` | Página carga sin errores | | |
| 14.3.3 | Detalle de blog | `/blog-detail` o `/blog-detail/{id}` | Página carga sin errores | | |

---

## 15. FLUJOS COMBINADOS END-TO-END

### E2E-1: Registro completo y publicación de proyecto

**Actor:** Usuario nuevo que crea empresa y publica proyecto

| Paso | Acción | Verificación |
|------|--------|--------------|
| 1 | Ir a `/signup` y registrarse con datos válidos | Token en localStorage. Redirect a `/create-profile` |
| 2 | Seleccionar "Soy Empresa" | Formulario de empresa visible |
| 3 | Llenar formulario de empresa y guardar | `POST /companies`. Navbar muestra "Mis Proyectos". Redirect a `/job-list-one` |
| 4 | Navbar → "Mis Proyectos" | `/my-projects` muestra lista vacía |
| 5 | Click "Crear Proyecto" | `/project-form` con formulario vacío |
| 6 | Llenar proyecto con status PUBLISHED → guardar | `POST /projects`. Redirect a `/my-projects`. Proyecto visible en lista |
| 7 | Ir a `/job-list-one` | El proyecto recién creado aparece en la lista pública |
| 8 | Click en el proyecto | `/job-detail-one/{id}` muestra los datos correctos |
| **Estado:** | | |

---

### E2E-2: Proveedor se postula a un proyecto

**Actor:** Proveedor existente que encuentra y aplica a un proyecto

| Paso | Acción | Verificación |
|------|--------|--------------|
| 1 | Login como C-Proveedor | Redirect a `/job-list-one` |
| 2 | Ver lista de proyectos | Proyectos PUBLISHED visibles |
| 3 | Click en un proyecto | Detalle del proyecto. Botón "Postularse" visible |
| 4 | Click "Postularse" | Navega a `/job-apply?projectId={id}` |
| 5 | Llenar: monto, propuesta, días estimados → enviar | `POST /bids`. Mensaje de éxito |
| 6 | Ir a `/my-bids` | El bid aparece con status PENDING |
| 7 | Retirar el bid | `DELETE /bids/{id}`. Bid con status WITHDRAWN o desaparece |
| **Estado:** | | |

---

### E2E-3: Empresa gestiona bids y acepta proveedor

**Actor:** Empresa que recibe bids y acepta uno

| Paso | Acción | Verificación |
|------|--------|--------------|
| 1 | Login como B-Empresa | Redirect a `/job-list-one` |
| 2 | Ir a `/my-projects` | Lista de proyectos de la empresa |
| 3 | Click "Ver Bids" en un proyecto con postulaciones | `/project-bids/{id}` muestra bids |
| 4 | Ver detalles de un bid (proveedor, monto, propuesta) | Datos correctos |
| 5 | Click "Ver Proveedor" | `/candidate-profile/{providerId}` con datos del proveedor |
| 6 | Volver y aceptar el bid | `PUT /bids/{id}/accept`. Status cambia a ACCEPTED |
| 7 | Intentar aceptar otro bid del mismo proyecto | Verificar comportamiento (¿se pueden aceptar múltiples?) |
| **Estado:** | | |

---

### E2E-4: Usuario con doble perfil cambia entre roles

**Actor:** Usuario con perfil de empresa Y proveedor

| Paso | Acción | Verificación |
|------|--------|--------------|
| 1 | Login como D-Ambos | Activo como PROVIDER (prioridad). Navbar muestra opciones de proveedor |
| 2 | Ir a `/my-bids` | Lista de bids del proveedor |
| 3 | Click "Cambiar a Empresa" en navbar | `PUT /users/me/type` con COMPANY. Navbar actualizado |
| 4 | Ir a `/my-projects` | Lista de proyectos de la empresa |
| 5 | Click "Cambiar a Proveedor" | `PUT /users/me/type` con PROVIDER. Navbar actualizado |
| 6 | Verificar que `/my-bids` vuelve a ser accesible | Bids del proveedor visibles |
| **Estado:** | | |

---

### E2E-5: Flujo de recuperación de contraseña

| Paso | Acción | Verificación |
|------|--------|--------------|
| 1 | Ir a `/login` → click "¿Olvidaste tu contraseña?" | Navega a `/reset-password` |
| 2 | Ingresar email de E-Reset → submit | Mensaje de éxito. `POST /auth/forgot-password` |
| 3 | Abrir email → click en link de reset | Navega a `/new-password?token={token}` |
| 4 | Ingresar nueva password válida (coinciden) → submit | `POST /auth/reset-password`. Redirect a `/login` |
| 5 | Login con nueva password | Login exitoso |
| 6 | Intentar usar el mismo token nuevamente | Backend rechaza. Error de token usado/expirado |
| **Estado:** | | |

---

## 16. CASOS LÍMITE Y SEGURIDAD

### 16.1 — Manejo de token JWT

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 16.1.1 | Token expirado | Dejar sesión 1+ hora → intentar acción API | Error 401 manejado. Redirect a login o mensaje de sesión expirada | | |
| 16.1.2 | Token manipulado | Modificar `localStorage['accessToken']` → refrescar | `GET /auth/profile` falla → logout automático | | |
| 16.1.3 | Sin token — ruta protegida | Borrar token → ir a `/my-projects` | Redirect a `/login` o error | | |
| 16.1.4 | Token de otro usuario | Copiar token de Cuenta A → usar en Cuenta B | Backend rechaza acciones con datos incorrectos | | |

---

### 16.2 — Inputs maliciosos

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 16.2.1 | Script en campo texto | En título de proyecto: `<script>alert('xss')</script>` | Script NO ejecutado. Texto escapado o rechazado | | |
| 16.2.2 | SQL injection | En campo de búsqueda: `'; DROP TABLE projects;--` | Campo tratado como texto. Backend protegido | | |
| 16.2.3 | Texto muy largo | 10.000 caracteres en descripción | Sin crash. Truncado o error controlado | | |
| 16.2.4 | Caracteres especiales | `áéíóú ñ @#$%^&*` en campos de texto | Aceptados y mostrados correctamente | | |
| 16.2.5 | Emoji en campos | `🚀 Proyecto 🏗️` | Aceptados o rechazados consistentemente | | |

---

### 16.3 — Errores de red y backend

| # | Caso | Pasos | Resultado Esperado | Estado | Notas |
|---|------|-------|-------------------|--------|-------|
| 16.3.1 | Backend caído | Detener backend → cargar app | Mensaje de error amigable. Sin pantalla blanca | | |
| 16.3.2 | Timeout de red | Request lento (simular con DevTools throttling) | Spinner visible durante carga. Sin timeout sin respuesta | | |
| 16.3.3 | Error 500 del backend | Backend retorna error interno | Mensaje de error visible al usuario. No crash | | |
| 16.3.4 | Error 403 Forbidden | Acceder a recurso no autorizado | Mensaje de "no autorizado" o redirect | | |

---

### 16.4 — Navegación directa (URL manual)

| # | URL | Usuario | Resultado Esperado | Estado |
|---|-----|---------|-------------------|--------|
| 16.4.1 | `/my-projects` | Sin sesión | Redirect a `/login` o `/error` |  |
| 16.4.2 | `/my-bids` | Sin sesión | Redirect a `/login` o `/error` |  |
| 16.4.3 | `/project-bids/1` | Sin sesión | Redirect a `/login` o `/error` |  |
| 16.4.4 | `/employer-profile-edit` | Sin sesión | Redirect a `/login` o `/error` |  |
| 16.4.5 | `/candidate-profile-edit` | Sin sesión | Redirect a `/login` o `/error` |  |
| 16.4.6 | `/create-profile` | Con ambos perfiles | Mensaje o redirect |  |
| 16.4.7 | `/project-form/99999` | Empresa logueada | Error manejado |  |
| 16.4.8 | `/project-bids/99999` | Empresa logueada | Error manejado |  |

---

## RESUMEN DE EJECUCIÓN

| Módulo | Total Casos | PASS | FAIL | SKIP | % Completado |
|--------|-------------|------|------|------|--------------|
| 1. Autenticación | 24 | | | | |
| 2. Crear Perfil | 17 | | | | |
| 3. Reset Password | 9 | | | | |
| 4. Navbar | 14 | | | | |
| 5. Listado Proyectos | 9 | | | | |
| 6. Detalle Proyecto | 8 | | | | |
| 7. Gestión Proyectos | 17 | | | | |
| 8. Bids Proveedor | 19 | | | | |
| 9. Bids Empresa | 10 | | | | |
| 10. Perfil Empresa | 8 | | | | |
| 11. Perfil Proveedor | 7 | | | | |
| 12. Lista Empresas | 5 | | | | |
| 13. Lista Proveedores | 6 | | | | |
| 14. Informativas | 17 | | | | |
| 15. E2E Flujos | 5 | | | | |
| 16. Límite/Seguridad | 20 | | | | |
| **TOTAL** | **195** | | | | |

---

## REGISTRO DE BUGS

| ID | Módulo | Caso # | Descripción | Severidad | Prioridad | Estado |
|----|--------|--------|-------------|-----------|-----------|--------|
| BUG-001 | | | | Alta/Media/Baja | Alta/Media/Baja | Abierto |
| BUG-002 | | | | | | |

**Severidades:**
- **Alta:** Crash, pérdida de datos, funcionalidad core bloqueada
- **Media:** Funcionalidad incorrecta pero con workaround
- **Baja:** Cosmético, texto incorrecto, UI menor

---

*Documento generado automáticamente a partir del análisis del código fuente de ProcuraFrontend.*
