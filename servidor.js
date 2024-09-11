//Importación de las librerías necesarias para la API
const express = require('express');
const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

const app = express();
app.use(express.json());

// Configurar la conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

// Definir el modelo de Usuario
const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Sincronizar el modelo con la base de datos
// { force: false } creará la tabla si no existe, pero no la sobrescribirá si ya existe
sequelize.sync({ force: false }).then(() => {
  console.log("Base de datos y tablas creadas!");
});

// Ruta única para todas las operaciones CRUD
app.get('/movies', async (req, res) => {
  const { action, id, title, genre, releaseDate, url } = req.query;

  try {
    switch(action) {
      case 'create':
        if (!title || !genre || !releaseDate || !url) {
          return res.status(400).json({ error: 'Faltan datos requeridos' });
        }        
        const newMovie = await Movie.create({ title, genre, releaseDate, url});
        return res.status(201).json({ message: 'Película agregada exitosamente', id: newMovie.id });

      case 'read':
        if (id) {
          const movie = await Movie.findByPk(id, { attributes: ['id', 'title', 'genre', 'releaseDate', 'url'] });
          if (movie) {
            return res.json(movie);
          } else {
            return res.status(404).json({ message: 'Película no encontrada' });
          }
        } else {
          const movies = await Movie.findAll({ attributes: ['id', 'title', 'genre', 'releaseDate', 'url'] });
          return res.json(movies);
        }

      case 'update':
        if (!id) {
          return res.status(400).json({ error: 'Se requiere ID para actualizar' });
        }
        const movie = await Movie.findByPk(id);
        if (movie) {
          if (title) movie.title = title;
          if (genre) movie.genre = genre;
          if (releaseDate) movie.releaseDate = releaseDate;
          if (url) movie.url = url
          await movie.save();
          return res.json({ message: 'Película actualizada exitosamente' });
        } else {
          return res.status(404).json({ message: 'Película no encontrada' });
        }

      case 'delete':
        if (!id) {
          return res.status(400).json({ error: 'Se requiere ID para eliminar' });
        }
        const deletedMovie = await Movie.findByPk(id);
        if (deletedMovie) {
          await deletedMovie.destroy();
          return res.json({ message: 'Película eliminada exitosamente' });
        } else {
          return res.status(404).json({ message: 'Película no encontrada' });
        }

      default:
        return res.status(400).json({ error: 'Acción no válida' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Inicializar la aplicación en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});