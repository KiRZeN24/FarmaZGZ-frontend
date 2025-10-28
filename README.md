# FarmaZGZ - Frontend

Aplicación web para consultar las farmacias de guardia en Zaragoza. Desarrollada con Next.js 15, TypeScript y Tailwind CSS.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)

## ✨ Características

- 🔍 **Búsqueda de farmacias de guardia** del día actual
- 📍 **Geolocalización** e integración con Google Maps
- ✅ **Sistema de validaciones** comunitario
- 👤 **Autenticación** con JWT
- 🎨 **Diseño responsive** con DaisyUI
- 🔔 **Notificaciones** con react-hot-toast
- 🛡️ **Panel de administración** para gestión de usuarios y farmacias

## 🚀 Tecnologías

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS + DaisyUI
- **Iconos:** React Icons
- **Mapas:** Leaflet + React-Leaflet
- **Notificaciones:** React Hot Toast

## 📋 Requisitos previos

- Node.js 18.x o superior
- npm o yarn
- Backend de FarmaZGZ corriendo en `http://localhost:3001`

## 🛠️ Instalación

1. **Clonar el repositorio:**

git clone https://github.com/tu-usuario/farmazgz-frontend.git
cd farmazgz-frontend

2. **Instalar dependencias:**

npm install

3. **Configurar variables de entorno:**

Crea un archivo `.env.local` en la raíz:

NEXT_PUBLIC_API_URL=http://localhost:3001

4. **Ejecutar en desarrollo:**

npm run dev

La aplicación estará disponible en `http://localhost:3000`

## 🔐 Autenticación

La aplicación utiliza JWT (JSON Web Tokens) para la autenticación:

1. El usuario se registra o inicia sesión
2. El backend devuelve un `access_token`
3. El token se guarda en `localStorage`
4. Se incluye en el header `Authorization: Bearer {token}` en cada petición

## 👥 Roles de usuario

- **USER:** Puede ver farmacias y validarlas
- **ADMIN:** Acceso al panel de administración + permisos de USER

## 🗺️ Funcionalidades principales

### Página principal

- Lista de farmacias de guardia del día actual

### Detalle de farmacia

- Información completa (nombre, dirección, teléfono, horario)
- Mapa interactivo con ubicación
- Sistema de validaciones (correcto/incorrecto)
- Historial de validaciones

### Panel de administración

- Estadísticas generales
- Gestión de usuarios (crear, editar, eliminar)
- Sincronización manual con API del Ayuntamiento
- Visualización de todas las farmacias

### Perfil de usuario

- Ver información del usuario
- Cambiar contraseña

### API Endpoints utilizados

// Autenticación
POST /auth/signin # Iniciar sesión
POST /auth/signup # Registrarse
GET /auth/profile # Obtener perfil
PUT /auth/profile # Actualizar perfil

// Farmacias
GET /pharmacies/today # Farmacias de hoy
GET /pharmacies/:id # Detalle de farmacia
GET /pharmacies/:id/validations # Validaciones de una farmacia
POST /pharmacies/sync # Sincronizar (admin)

// Validaciones
POST /validations # Crear validación
GET /validations/my-validations # Mis validaciones

// Usuarios (admin)
GET /users # Listar usuarios
POST /users # Crear usuario
PUT /users/:id # Actualizar usuario
DELETE /users/:id # Eliminar usuario
