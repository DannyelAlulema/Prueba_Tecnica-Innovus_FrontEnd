```markdown
# Frontend de la Prueba Técnica (Angular 16)

Este repositorio contiene el código fuente del frontend de la aplicación desarrollada con Angular 16. La aplicación frontend se encarga de proporcionar una interfaz de usuario amigable para interactuar con la API desarrollada en el repositorio de la prueba técnica de Innovus.

## Requisitos del Sistema

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js:** La aplicación Angular se basa en Node.js. Puedes descargar e instalar Node.js desde [nodejs.org](https://nodejs.org/).

## Configuración y Ejecución

Sigue estos pasos para configurar y ejecutar la aplicación frontend en tu entorno local:

1. **Clonar el Repositorio:** Clona este repositorio en tu máquina local utilizando el siguiente comando:

   ```
   git clone https://github.com/DannyelAlulema/Prueba_Tecnica-Innovus_FrontEnd.git
   ```

2. **Instalar Dependencias:** Ve a la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias:

   ```
   cd Prueba_Tecnica-Innovus_FrontEnd
   npm install
   ```

3. **Configurar la API:** Abre el archivo de configuración (por ejemplo, `src/environments/environment.ts`) y asegúrate de que la URL de la API coincida con la ubicación de tu API backend.

4. **Ejecutar la Aplicación:** Una vez que hayas configurado la URL de la API, puedes ejecutar la aplicación con el siguiente comando:

   ```
   npm start
   ```

5. **Acceder a la Aplicación:** La aplicación estará disponible en [http://localhost:4200](http://localhost:4200). Abre tu navegador web y accede a esta URL para interactuar con la aplicación.

## Características Destacadas

1. **Autenticación con JWT:** La aplicación Angular utiliza autenticación basada en JSON Web Tokens (JWT) para garantizar la seguridad de los usuarios. Esto permite a los usuarios registrarse, iniciar sesión y acceder a las funcionalidades de la aplicación de manera segura.

2. **Guardias de Ruta:** Se implementan guardias de ruta para proteger el acceso a diferentes rutas en función de la autenticación del usuario. Los guardias de ruta aseguran que solo los usuarios autenticados puedan acceder a ciertas partes de la aplicación, lo que mejora la seguridad y el control de acceso.

3. **Interceptores de HTTP:** La aplicación utiliza interceptores de HTTP para insertar automáticamente la cabecera de autorización en todas las solicitudes a los endpoints de la API. Esto simplifica la gestión de la autenticación y garantiza que todas las solicitudes estén debidamente autorizadas.

4. **Aplicación Web SPA:** La aplicación está diseñada como una aplicación de una sola página (SPA, por sus siglas en inglés). Esto significa que la navegación y la interacción del usuario se realizan sin necesidad de recargar la página, lo que proporciona una experiencia de usuario más fluida y rápida.
