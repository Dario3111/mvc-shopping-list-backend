# Aplicación de Lista de Compras MVC

Esta aplicación implementa el patrón arquitectónico MVC (Modelo-Vista-Controlador) utilizando React para el frontend, Node.js y Express para el backend, y MySQL como base de datos. El objetivo de la aplicación es gestionar una lista de compras a través de una API RESTful.

## Estructura del Proyecto

El proyecto está organizado en dos partes principales:

/shopping-list-backend /controllers # Contiene la lógica de negocio y maneja las solicitudes del cliente /models # Interactúa con la base de datos /routes # Define los endpoints de la API /config # Configuración de la conexión a la base de datos index.js # Punto de entrada del servidor

/shopping-list-frontend /src /components # Componentes de React para la interfaz de usuario /services # Servicios para manejar las peticiones HTTP App.js # Componente principal de la aplicación


## Controlador

El controlador actúa como intermediario entre el modelo y la vista. Gestiona las solicitudes del cliente, procesando datos a través del modelo y devolviendo respuestas adecuadas. Sus funciones incluyen obtener, agregar y eliminar artículos en la lista de compras.

## Ajustes del Archivo `.env`

Antes de ejecutar la aplicación, asegúrate de configurar correctamente el archivo `.env`. Si existe un archivo `.env-example`, cópialo y renómbralo a `.env`. Luego, actualiza las siguientes variables con tus credenciales de base de datos:

DB_HOST=localhost DB_USER=tu_usuario DB_PASSWORD=tu_contraseña DB_NAME=nombre_base_datos

Asegúrate de que la base de datos y la tabla necesarias estén creadas antes de iniciar la aplicación. Puedes crear la base de datos y la tabla ejecutando el siguiente código en MySQL:

```sql
USE shopping_list_db; -- Selecciona la base de datos

CREATE TABLE items ( -- Crea la tabla
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

SELECT * FROM items; -- Consulta la tabla
SHOW TABLES; -- Muestra las tablas en la base de datos
Clonar el Repositorio
Para clonar el repositorio, utiliza el siguiente comando en tu terminal:

bash
Copiar código
git clone https://github.com/Dario3111/mvc-shopping-list-backend.git
Luego, navega a la carpeta del proyecto:

bash
Copiar código
cd mvc-shopping-list-backend
Ejecución del Proyecto
Dependencias
Después de clonar el repositorio, asegúrate de instalar las dependencias para el backend y el frontend.

Instalar dependencias del backend:

Abre tu terminal en la carpeta del backend y ejecuta:
bash
Copiar código
npm install
Instalar dependencias del frontend:

Abre otra terminal en la carpeta del frontend y ejecuta:
bash
Copiar código
npm install
Iniciar el Backend
Abre tu terminal en la carpeta del backend y ejecuta:

bash
Copiar código
node index.js
Iniciar el Frontend
En otra terminal, dentro de la carpeta del frontend, ejecuta:

bash
Copiar código
npm start
Esto debería iniciar tanto el backend como el frontend, y la aplicación estará lista para usar.

Conclusión
Este enfoque sigue un patrón MVC claro:

Modelo: La interacción con la base de datos en Node.js (con mysql2).
Vista: El frontend con React que se comunica con el backend.
Controlador: El controlador en Node.js que gestiona la lógica de negocio y conecta la base de datos con el frontend.
