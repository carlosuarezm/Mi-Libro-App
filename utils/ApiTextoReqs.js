import axios from 'axios'
import { API_VISION_KEY } from "@env";
const urlAPI = `https://vision.googleapis.com/v1/images:annotate?key=${API_VISION_KEY}`


function armarRequest(ruta) {
  return {
    "requests": [
      {
        "image": {
          "source": {
            "imageUri":
              `${ruta}`
          }
        },
        "features": [
          {
            "type": "TEXT_DETECTION",
            "maxResults": 1
          }
        ]
      }
    ]
  }
}

const reconocerPorTexto = async rutaImagen => {
  const res = await axios.post(urlAPI, armarRequest(rutaImagen))
  try {
    const text = res.data.responses[0].textAnnotations[0].description.replace(/\n/g, ' ')
    return text
  } catch (error) {
    throw new Error('Ocurrió un error inesperado intente nuevamente')
  }
}


export { reconocerPorTexto }