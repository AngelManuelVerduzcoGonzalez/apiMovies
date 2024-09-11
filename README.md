# 🌐 Environment Setup

Para configurar el entorno de desarrollo y conectarte a tu base de datos, debes crear un archivo `.env` en el directorio raíz del proyecto o insertar los datos directamente en la línea donde se inicializa Sequelize. Si decides crear el archivo `.env`, asegúrate de incluir los siguientes parámetros:

1. DB_PASSWORD=tu_contraseña_aqui
2. DB_NAME=nombre_de_tu_base_de_datos 
3. DB_USER=nombre_de_tu_usuario


### ⚠️ Nota Importante
Recuerda **NO** subir el archivo `.env` a tu repositorio público, ya que contiene información sensible. Para evitar esto, asegúrate de que esté incluido en tu archivo `.gitignore`.

---

# 🧪 API Testing

Puedes probar la API utilizando **REST Client**, una extensión que puedes instalar fácilmente desde el panel de extensiones de Visual Studio Code. Una vez instalada, puedes usar el archivo `tests.test` que está incluido en el proyecto para probar los distintos endpoints.

### 💡 Alternativa Sin REST Client
Si prefieres no instalar **REST Client**, también puedes probar los endpoints directamente desde tu navegador:

1. Abre el archivo `tests.test`.
2. Copia los enlaces de los endpoints que desees probar.
3. Pégalos en tu navegador para hacer las solicitudes a la API y ver los resultados.

---

# 📦 Repositorio

Este proyecto está diseñado para conectarse a una base de datos utilizando Sequelize. Asegúrate de definir correctamente tus credenciales de base de datos en el archivo `.env` o directamente en la configuración de Sequelize antes de ejecutar el proyecto.

---


