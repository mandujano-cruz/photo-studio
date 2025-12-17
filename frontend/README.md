# TripleTen: Proyecto final (Mandujano Photo)

## Descripción del proyecto
Este proyecto es una aplicación web de pila completa (Full-Stack) diseñada para un estudio fotográfico. Combina una interfaz pública de marketing para mostrar el trabajo y los servicios, con un portal administrativo robusto y seguro para la gestión interna de usuarios y citas.

El frontend está construido con React (JSX), ofreciendo una experiencia de usuario moderna y modular. El backend se basa en Node.js y Express, utilizando MongoDB para la persistencia de datos y sincronizándose con la API de SuperSaaS para la gestión profesional de la programación de citas.

## Arquitectura y Tecnologías
El proyecto se divide en dos secciones principales, separadas por tecnologías y responsabilidades:

* Frontend
  * React & JSX: Construcción de la interfaz de usuario basada en componentes.
  * React Router DOM: Manejo de navegación entre la página pública y el portal privado.
  * Context API: Gestión de estados globales, como la información de usuario y el control de modales.
  * Hooks personalizados: Lógica reutilizable para gestión de estados de formularios y llamadas a API.

* Backend
  * Node.js & Exprees: Construcción de la API RESful para manejar las solicitudes del cliente
  * MongoDB & Mongoose: Base de datos principal para el almacenamiento de registros de usuarios.
  * JWT (JSON Web Tokens): Sistema de autenticación para asegurar el portal administrativo.
  * Bcrypt: Hashing y seguridad de las contraseñas.
  * SuperSaas API: Servicio externo para la creación, actualización y administración centralizada de citas.

  ## Características y Funcionalidades

  * Portal Público
    * Home: Página de aterrizaje e introducción
    * Portafolio: Visualización del trabajo fotográfico del estudio.
    * Servicios: Descripción detallada de los paquetes de fotografía ofrecidos.
    * Nosotros: Información sobre el estudio y equipo.
    * Contacto: Formulario para que el público se ponga en contacto a través de una cita informativa.

  * Portal Interno
    * Dashboard: Página principal del portal.
    * Citas: Registro de nuevas citas, actualización o edición de citas existentes.
    * Usuarios: Creación de nuevos empleados, listado y gestión básica.
    * Perfil: Visualización y edicion del perfil.

## Pruebas y uso inicial
Para facilitar las pruebas y asegurar la funcionalidad en producción, se implementó un mecanismo de seeding (siembra) que crea un usuario administrador inicial si la base de datos está vacía.

Al iniciarse el servidor backend, este verifica automáticamente la existencia del usuario raíz, lo crea y lo sincroniza con SuperSaaS si es necesario.

Administrador => admin@admin.com - admin12345

## Áreas de oportunidad
* Control de Acceso Basado en Roles (RBAC):

  * Implementar permisos granulares para los empleados (determinar quién administra usuarios, quién puede visualizar todas las citas, etc.).

* Seguridad y Perfil del Usuario:

  * Implementar la funcionalidad de cambio de contraseña para que los usuarios puedan actualizar su clave de acceso desde su propio perfil.

* Gestión de Citas Avanzada:

  * Desarrollar la opción de visualización de citas de manera más específica, permitiendo que cada empleado vea solo las citas que él ha gestionado.