# Api ejercicio Bsale

Este proyecto es una API que proporciona información sobre vuelos y pasajeros de una aerolínea. Permite consultar los pasajeros de un vuelo específico y obtener detalles sobre el vuelo, como la fecha de despegue, aeropuerto de salida, fecha de aterrizaje, aeropuerto de llegada, etc.

## Ejecución de la API

Sigue estos pasos para ejecutar la API en tu entorno local:

1. Clona el repositorio de GitHub en tu máquina local:

```bash
git clone https://github.com/tu-usuario/aerolinea-api.git
```

2. Asegúrate de tener Node.js y npm instalados en tu máquina.

3. Navega al directorio del proyecto:

```bash
cd aerolinea-api
```

4. Instala las dependencias del proyecto:

```bash
npm install
```

5. Configura las credenciales de la base de datos en el archivo `index.js`. Asegúrate de proporcionar el host, usuario, contraseña y nombre de la base de datos correctos.

6. Inicia la API:

```bash
npm start
```

7. La API estará disponible en `http://localhost:3000`. Puedes realizar solicitudes a los endpoints correspondientes según tus necesidades.

## Endpoints Disponibles

- `/flights/:id/passengers` - Devuelve los pasajeros de un vuelo específico identificado por `:id`. La respuesta incluye detalles de los pasajeros y del vuelo.

## Documentación Adicional

Aquí se encuentra documentación adicional que puede ser útil para comprender y utilizar la API:

- Descripción del proyecto: Este proyecto utiliza Express.js para crear una API RESTful que se conecta a una base de datos MySQL para obtener información sobre vuelos y pasajeros de una aerolínea. Se utiliza un enfoque de conexión de pool para mejorar el rendimiento y la capacidad de manejar múltiples solicitudes de manera recurrente.

- Estructura del proyecto: El proyecto sigue una estructura simple con un archivo `index.js` que define las rutas y los controladores de los endpoints. La lógica de conexión a la base de datos se encuentra en este mismo archivo. Las consultas a la base de datos se realizan utilizando Promesas y el módulo `mysql`.

- Dependencias principales: Las dependencias principales utilizadas en este proyecto son Express.js para el enrutamiento y la creación de la API, y MySQL para la conexión y las consultas a la base de datos.

- Ejemplo de uso de la API: Puedes utilizar herramientas como Postman para realizar solicitudes a la API y verificar las respuestas. Asegúrate de proporcionar el ID correcto del vuelo en la ruta correspondiente para obtener los pasajeros.

Si tienes alguna pregunta adicional o necesitas más detalles sobre el proyecto, no dudes en contactarme.

¡Espero que esta documentación sea útil!
