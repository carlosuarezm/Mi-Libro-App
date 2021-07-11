# Mi-Libro-App

Proyecto final para la materia Nuevas Tecnologías 2 de la Tecnicatura Analista de Sistemas en la ORT.

La app miLibro devuelve información de un libro a partir de una portada escaneada o cargada desde Galería. Está dirigida a todos quienes tengan interés por la lectura.

La aplicación va a tener un alcance de libros que existan en la base de datos de la API de Google Books. Se va a obtener la información (argumento, autor, puntuación) a partir del reconocimiento del texto en la portada de un libro, que podrá escanearse con la cámara del propio celular o bien desde la galería de fotos. El usuario podrá loguearse a través de Google, o bien, acceder sin login. Una vez logueado, va a poder guardar libros en una lista de favoritos.

En este documento detallamos sus funcionalidades y cómo fueron utilizadas tanto la API de reconocimiento de texto como la de Google Books: 
https://docs.google.com/document/d/1oJ-Y53LHw2BQmpQnJK08ag4QXXS00wm48pQlZ4iYg3I/edit?usp=sharing

---

Para utilizar la app se debe tener un archivo .env con las siguientes definiciones:

API_VISION_KEY: API key habilitada en Google Cloud Plataform habilitada para utilizar Google Vision

ANDROID_CLIENTE_ID: clave de ID de clientes OAuth 2.0 en Google Cloud Plataform
