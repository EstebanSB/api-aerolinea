# Api ejercicio Bsale
Documentación para comprender y utilizar la API:

# Descripción del proyecto
Este proyecto utiliza Node Js Y Express.js para crear una API RESTful que se conecta a una base de datos MySQL para 
obtener información sobre vuelos y pasajeros de una aerolínea. Se utiliza un enfoque de conexión de pool para 
mejorar el rendimiento y la capacidad de manejar múltiples solicitudes de manera recurrente.

# Estructura del proyecto
El proyecto sigue una estructura simple con un archivo index.js que define las rutas y los controladores de los 
endpoints. La lógica de conexión a la base de datos se encuentra en este mismo archivo. Las consultas a la base 
de datos se realizan utilizando Promesas y el módulo mysql.

# Dependencias principales
Las dependencias principales utilizadas en este proyecto son Express.js para el enrutamiento y la creación de la 
API, y MySQL para la conexión y las consultas a la base de datos.

# Ejemplo de uso de la API
Puedes utilizar herramientas como Postman para realizar solicitudes a la API y verificar las respuestas. Asegúrate 
de proporcionar el ID correcto del vuelo en la ruta correspondiente para obtener los pasajeros.

El proyecto fue subido a la pagina Glitch.com <br/>
link del proyecto: https://ablaze-rainbow-lipstick.glitch.me <br/>
la pagina muestra mensaje de error ya que no tiene frontend desarrollado.


Link de la api con el endpoint aplicado, se puede probar en postman o abrirlo directamente en el navegador.
https://ablaze-rainbow-lipstick.glitch.me/flights/1/passengers
