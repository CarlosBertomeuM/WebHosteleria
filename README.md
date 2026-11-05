
# Web Hostelería

Proyecto final del ciclo formativo de Desarrollo de Aplicaciones Web (DAW).

Plataforma web para la gestión y publicación de la carta de un restaurante. Está formada por tres aplicaciones independientes que se comunican a través de una API REST:

- **Backend**: API REST desarrollada con Laravel que gestiona los datos de la carta, los platos, los alérgenos y el menú del día.
- **Frontend**: web pública en React donde los clientes consultan la carta, el menú del día y la información de contacto.
- **Admin**: panel de administración en React y Bootstrap desde el que el personal del restaurante gestiona todo el contenido.

---

## Índice

1. [Estructura del proyecto](#estructura-del-proyecto)
2. [Tecnologías](#tecnologías)
3. [Arquitectura](#arquitectura)
4. [Modelo de datos](#modelo-de-datos)
5. [API REST](#api-rest)
6. [Funcionalidades](#funcionalidades)
7. [Requisitos](#requisitos)
8. [Instalación](#instalación)
9. [Puesta en marcha](#puesta-en-marcha)
10. [Mejoras pendientes](#mejoras-pendientes)

---

## Estructura del proyecto

```
web-hosteleria/
├── backend/                  API REST (Laravel)
│   ├── app/
│   │   ├── Http/Controllers/ Controladores de la API
│   │   └── Models/           Modelos Eloquent
│   ├── config/               Configuración (CORS, base de datos, Sanctum...)
│   ├── database/
│   │   ├── migrations/       Definición de las tablas
│   │   └── seeders/          Datos iniciales (alérgenos)
│   ├── routes/
│   │   └── api.php           Rutas de la API
│   └── .env.example          Plantilla de configuración
│
├── frontend/                 Web pública (React + Vite)
│   └── src/
│       ├── components/       Navbar, Footer, HeroCarrusel, Carta, MenuDia, Contacto...
│       ├── pages/            Inicio, Carta, MenuDia, Contacto
│       ├── services/         Clases de acceso a la API
│       └── assets/           Imágenes y logotipo
│
└── admin/                    Panel de administración (React + Vite + Bootstrap)
    └── src/
        ├── components/       Layout con la navegación lateral
        ├── pages/            Carta, MenuDia, MenuDiaForm
        └── services/         Clases de acceso a la API
```

---

## Tecnologías

### Backend

| Tecnología | Versión | Uso |
|---|---|---|
| PHP | 8.2 o superior | Lenguaje del servidor |
| Laravel | 12 | Framework de la API REST |
| Laravel Sanctum | 4 | Autenticación por tokens (instalado) |
| Eloquent ORM | - | Acceso a datos y relaciones |
| MySQL | 8 | Base de datos |
| Composer | 2 | Gestión de dependencias PHP |

### Frontend (web pública)

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | Librería de interfaz |
| Vite | 8 | Entorno de desarrollo y compilación |
| React Router | 7 | Navegación entre páginas |
| React Icons | 5 | Iconografía |
| CSS | - | Estilos propios por componente |

### Admin (panel de administración)

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | Librería de interfaz |
| Vite | 8 | Entorno de desarrollo y compilación |
| React Router | 7 | Navegación entre páginas |
| Bootstrap | 5.3 | Maquetación y componentes visuales |
| dnd-kit | 6 | Reordenación de categorías arrastrando |

---

## Arquitectura

El proyecto sigue una arquitectura cliente-servidor desacoplada. El backend expone una API REST que devuelve JSON, y las dos aplicaciones React la consumen de forma independiente.

```
┌──────────────────┐        ┌──────────────────┐
│  Frontend (web)  │        │  Admin (panel)   │
│  React + Vite    │        │  React + Vite    │
└────────┬─────────┘        └────────┬─────────┘
         │   peticiones HTTP (JSON)  │
         └─────────────┬─────────────┘
                       ▼
              ┌──────────────────┐
              │  Backend (API)   │
              │  Laravel 12      │
              └────────┬─────────┘
                       ▼
              ┌──────────────────┐
              │      MySQL       │
              └──────────────────┘
```

En las dos aplicaciones React, el acceso a la API se organiza con una clase base `Model` que implementa las operaciones comunes (`getAll`, `getById`, `insert`, `update`, `delete`). Cada recurso tiene su propio servicio que hereda de ella (`CategoriaService`, `PlatoService`, `AlergenoService`, `MenuDiaService`).

La URL de la API se define en `src/services/api.js` de cada aplicación.

---

## Modelo de datos

### Carta

| Tabla | Descripción | Campos principales |
|---|---|---|
| `categorias` | Secciones de la carta | nombre, descripcion, orden, activo |
| `platos` | Platos de cada categoría | categoria_id, nombre, descripcion, precio, disponible, activo, orden |
| `alergenos` | Los 14 alérgenos de declaración obligatoria | nombre, icono |
| `alergeno_plato` | Relación muchos a muchos entre platos y alérgenos | plato_id, alergeno_id |

### Menú del día

| Tabla | Descripción | Campos principales |
|---|---|---|
| `menu_dias` | Menús del día | titulo, precio, activo |
| `menu_dia_categorias` | Secciones del menú (primeros, segundos, postres...) | menu_dia_id, nombre, orden |
| `menu_dia_platos` | Platos de cada sección | menu_dia_categoria_id, nombre, orden |

Relaciones:

- Una categoría tiene muchos platos.
- Un plato puede tener varios alérgenos y un alérgeno puede estar en varios platos.
- Un menú del día tiene varias categorías y cada categoría tiene varios platos.

Todas las claves foráneas usan borrado en cascada: al eliminar una categoría se eliminan sus platos, y al eliminar un menú se eliminan sus secciones y platos.

---

## API REST

URL base en desarrollo: `http://localhost:8000/api`

### Categorías

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/categorias` | Lista las categorías activas con sus platos activos, ordenados |
| POST | `/categorias` | Crea una categoría |
| GET | `/categorias/{id}` | Devuelve una categoría |
| PUT | `/categorias/{id}` | Actualiza una categoría |
| DELETE | `/categorias/{id}` | Elimina una categoría y sus platos |

### Platos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/platos` | Lista todos los platos con sus alérgenos |
| POST | `/platos` | Crea un plato |
| GET | `/platos/{id}` | Devuelve un plato con sus alérgenos |
| PUT | `/platos/{id}` | Actualiza un plato y sincroniza sus alérgenos |
| DELETE | `/platos/{id}` | Elimina un plato |

### Alérgenos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/alergenos` | Lista los alérgenos |

### Menú del día

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/menu-dia` | Lista todos los menús con sus categorías y platos |
| GET | `/menu-dia/activo` | Devuelve el menú activo |
| POST | `/menu-dia` | Crea un menú completo (menú, categorías y platos en una petición) |
| GET | `/menu-dia/{id}` | Devuelve un menú |
| PUT | `/menu-dia/{id}` | Actualiza un menú y recrea sus categorías y platos |
| DELETE | `/menu-dia/{id}` | Elimina un menú |
| DELETE | `/menu-dia/delete-all` | Elimina todos los menús |

Ejemplo de cuerpo para crear un menú del día:

```json
{
  "titulo": "Menú del día",
  "precio": 12.50,
  "activo": 1,
  "categorias": [
    {
      "nombre": "Primeros",
      "orden": 1,
      "platos": [
        { "nombre": "Ensalada mixta", "orden": 1 },
        { "nombre": "Sopa de cocido", "orden": 2 }
      ]
    },
    {
      "nombre": "Segundos",
      "orden": 2,
      "platos": [
        { "nombre": "Pollo al horno", "orden": 1 }
      ]
    }
  ]
}
```

---

## Funcionalidades

### Web pública

- Página de inicio con carrusel de imágenes y presentación del restaurante.
- Carta organizada por categorías, con los platos activos y sus precios.
- Menú del día activo, con sus secciones y platos.
- Página de contacto.
- Barra de navegación y pie de página comunes.

### Panel de administración

**Gestión de la carta**

- Crear, editar, activar, desactivar y eliminar categorías.
- Reordenar las categorías arrastrándolas.
- Crear, editar, activar, desactivar y eliminar platos dentro de cada categoría.

**Gestión del menú del día**

- Ver el menú activo y la lista de menús inactivos.
- Crear un menú nuevo con un formulario dinámico de secciones y platos.
- Editar un menú existente.
- Activar un menú. Al hacerlo, el resto se desactiva automáticamente para que solo haya uno activo.
- Desactivar y eliminar menús.

---

## Requisitos

- PHP 8.2 o superior, con las extensiones `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml` y `ctype`
- Composer 2
- MySQL 8 (o MariaDB)
- Node.js 20.19 o superior (o 22.12 o superior)
- npm
- Git

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/web-hosteleria.git
cd web-hosteleria
```

### 2. Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Edita el archivo `.env` con los datos de tu base de datos:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=practicas_db
DB_USERNAME=root
DB_PASSWORD=tu_contraseña
```

Crea la base de datos en MySQL:

```sql
CREATE DATABASE practicas_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Ejecuta las migraciones y carga los alérgenos:

```bash
php artisan migrate
php artisan db:seed --class=AlergenoSeeder
```

### 3. Frontend

```bash
cd ../frontend
npm install
```

### 4. Admin

```bash
cd ../admin
npm install
```

Si la API no va a estar en `http://localhost:8000/api`, cambia la URL en `src/services/api.js` del frontend y del admin.

---

## Puesta en marcha

Cada aplicación se arranca en una terminal distinta.

**Backend**

```bash
cd backend
php artisan serve
```

La API queda disponible en `http://localhost:8000/api`.

**Frontend**

```bash
cd frontend
npm run dev
```

**Admin**

```bash
cd admin
npm run dev
```

Vite usa por defecto el puerto 5173. Si ya está ocupado por la otra aplicación, asigna automáticamente el siguiente libre (5174). La URL exacta aparece en la terminal.

### Compilación para producción

```bash
npm run build
```

El resultado se genera en la carpeta `dist/` de cada aplicación React y se puede servir con Apache o Nginx. Si se usa Apache, hay que redirigir todas las rutas a `index.html` para que React Router funcione al recargar la página.

---

## Mejoras pendientes

- Proteger con autenticación (Laravel Sanctum) las rutas de creación, edición y borrado, y añadir inicio de sesión al panel de administración.
- Separar los listados públicos de los del panel, para que el administrador pueda ver y volver a activar las categorías y platos desactivados.
- Añadir validación de datos en el backend mediante Form Requests.
- Permitir asignar alérgenos a los platos desde el panel y guardarlos también al crear un plato.
- Gestión de imágenes para categorías y platos.

---

## Autor

Carlos Bertomeu — Proyecto final del ciclo de Desarrollo de Aplicaciones Web.
