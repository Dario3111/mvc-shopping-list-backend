Aquí tienes un README.md detallado basado en el proyecto que describiste. Este documento incluye todos los pasos y explicaciones necesarios para configurar y ejecutar la aplicación React con Node.js, Express y MySQL.

markdown
Copiar código
# Aplicación de Lista de Compras MVC

Esta aplicación implementa el patrón MVC utilizando React para el frontend, Node.js y Express para el backend, y MySQL como base de datos. La aplicación permite gestionar una lista de compras a través de una API RESTful.

## Tabla de Contenidos

- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Paso 1: Configuración del Backend](#paso-1-configuración-del-backend)
- [Paso 2: Configuración del Frontend](#paso-2-configuración-del-frontend)
- [Paso 3: Ejecutar el Proyecto](#paso-3-ejecutar-el-proyecto)
- [Conclusión](#conclusión)

## Stack Tecnológico

- **Frontend**: React
- **Backend**: Node.js con Express
- **Base de datos**: MySQL (puede ser local o alojada en un servidor)
- **IDE sugerido**: Visual Studio Code
- **Herramientas adicionales**: Postman (para probar la API)

## Estructura del Proyecto

El proyecto está dividido en dos carpetas: `shopping-list-backend` (backend) y `shopping-list-frontend` (frontend).

/shopping-list-backend /controllers /models /routes /config

index.js
.env
/shopping-list-frontend /src /services /components

App.js
bash
Copiar código

## Paso 1: Configuración del Backend (Node.js + Express + MySQL)

### 1.1. Crear el Backend

Abre tu terminal y crea una carpeta para tu proyecto:

```bash
mkdir shopping-list-backend
cd shopping-list-backend
Inicializa el proyecto con Node.js:

bash
Copiar código
npm init -y
Instala las dependencias necesarias:

bash
Copiar código
npm install express mysql2 cors dotenv
1.2. Crear la estructura de carpetas para MVC
Dentro de shopping-list-backend, crea las siguientes carpetas:

bash
Copiar código
mkdir controllers models routes config
touch index.js
1.3. Configuración de la conexión a la base de datos
En la carpeta config, crea un archivo llamado db.js que contendrá la configuración de la conexión a MySQL:

javascript
Copiar código
// config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
Crea un archivo .env en la raíz de tu proyecto y añade las credenciales de tu base de datos:

bash
Copiar código
touch .env
Contenido de .env:

makefile
Copiar código
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=shopping_list_db
1.4. Crear el Modelo
En models/, crea un archivo ShoppingItem.js que representará los artículos de la lista de compras.

javascript
Copiar código
// models/ShoppingItem.js
const db = require('../config/db');

const ShoppingItem = {
  getAllItems: (callback) => {
    const query = 'SELECT * FROM items';
    db.query(query, callback);
  },

  addItem: (item, callback) => {
    const query = 'INSERT INTO items (name, quantity, price) VALUES (?, ?, ?)';
    db.query(query, [item.name, item.quantity, item.price], callback);
  },

  deleteItem: (id, callback) => {
    const query = 'DELETE FROM items WHERE id = ?';
    db.query(query, [id], callback);
  },
};

module.exports = ShoppingItem;
1.5. Crear el Controlador
En controllers/, crea un archivo shoppingController.js:

javascript
Copiar código
// controllers/shoppingController.js
const ShoppingItem = require('../models/ShoppingItem');

exports.getItems = (req, res) => {
  ShoppingItem.getAllItems((err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};

exports.addItem = (req, res) => {
  const { name, quantity, price } = req.body;
  const newItem = { name, quantity, price };

  ShoppingItem.addItem(newItem, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ id: result.insertId, ...newItem });
  });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;

  ShoppingItem.deleteItem(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'Item deleted' });
  });
};
1.6. Crear las Rutas
En routes/, crea un archivo shoppingRoutes.js:

javascript
Copiar código
// routes/shoppingRoutes.js
const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shoppingController');

router.get('/items', shoppingController.getItems);
router.post('/items', shoppingController.addItem);
router.delete('/items/:id', shoppingController.deleteItem);

module.exports = router;
1.7. Configurar Express
Configura el servidor Express en index.js:

javascript
Copiar código
// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const shoppingRoutes = require('./routes/shoppingRoutes');

const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', shoppingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
1.8. Crear la Base de Datos y la Tabla
Accede a tu base de datos MySQL y ejecuta los siguientes comandos:

sql
Copiar código
CREATE DATABASE shopping_list_db;

USE shopping_list_db;

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
1.9. Probar el Backend
Inicia el servidor de Node.js:

bash
Copiar código
node index.js
Usa Postman o cURL para probar las rutas del backend.

Paso 2: Configuración del Frontend (React)
2.1. Crear el Proyecto React
Abre un nuevo terminal y crea la aplicación de React:

bash
Copiar código
npx create-react-app shopping-list-frontend
cd shopping-list-frontend
Instala Axios para realizar peticiones HTTP:

bash
Copiar código
npm install axios
2.2. Crear la Estructura de Carpetas
Dentro de shopping-list-frontend, crea carpetas para servicios y componentes:

bash
Copiar código
mkdir src/services src/components
2.3. Crear el Servicio para las Peticiones
En src/services/, crea un archivo shoppingService.js:

javascript
Copiar código
// src/services/shoppingService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getItems = async () => {
  const response = await axios.get(`${API_URL}/items`);
  return response.data;
};

export const addItem = async (item) => {
  const response = await axios.post(`${API_URL}/items`, item);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await axios.delete(`${API_URL}/items/${id}`);
  return response.data;
};
2.4. Crear los Componentes React
Crea un componente para mostrar y agregar artículos en src/components/ShoppingList.js:

javascript
Copiar código
// src/components/ShoppingList.js
import React, { useState, useEffect } from 'react';
import { getItems, addItem, deleteItem } from '../services/shoppingService';

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const newItem = { name, quantity: parseInt(quantity), price: parseFloat(price) };
    await addItem(newItem);
    loadItems();
    setName('');
    setQuantity('');
    setPrice('');
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    loadItems();
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <form onSubmit={handleAddItem}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x ${item.price}{' '}
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
2.5. Integrar en el App.js
Finalmente, en src/App.js, integra el componente ShoppingList:

javascript
Copiar código
// src/App.js
import React from 'react';
import ShoppingList from './components/ShoppingList';

function App() {
  return (
    <div className="App">
      <ShoppingList />
    </div>
  );
}

export default App;
Paso 3: Ejecutar el Proyecto
3.1. Iniciar el Backend
Abre tu terminal en la carpeta del backend y ejecuta:

bash
Copiar código
node index.js
3.2. Iniciar el Frontend
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
