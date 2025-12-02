import axios from 'axios';

// 1. OBJETO DE CACHE GLOBAL
const translationCache = {}; 

export const obtenerTraduccion = async (texto, idiomaOrigen, idiomaDestino) => {
  if (!texto) return { translatedText: '', detectedLang: idiomaOrigen };

  // 2. CREAR LA CLAVE DE CACHE
  const cacheKey = `${texto}|${idiomaOrigen}|${idiomaDestino}`;

  // 3. CHEQUEAR CACHE
  if (translationCache[cacheKey]) {
    // Si está en caché, imprimimos un mensaje para verificar y retornamos el resultado
    console.log(`[CACHE] Devolviendo resultado para: ${cacheKey}`); 
    return translationCache[cacheKey];
  }

  // 4. SI NO ESTÁ EN CACHE, HACEMOS LA PETICIÓN
  try {
    const url = `https://api.mymemory.translated.net/get`;
    
    const respuesta = await axios.get(url, {
      params: {
        q: texto,
        langpair: `${idiomaOrigen}|${idiomaDestino}`
      }
    });

    const datos = respuesta.data;

    const resultado = {
        translatedText: datos.responseData.translatedText,
        // Usamos idiomaOrigen como fallback si detectedLang es null
        detectedLang: datos.responseData.detectedLanguage || idiomaOrigen 
    };
    
    // 5. ALMACENAR EN CACHE
    translationCache[cacheKey] = resultado; 
    console.log(`[API] Nueva traducción guardada en cache: ${cacheKey}`);

    return resultado;
    
  } catch (error) {
    console.error("Error en la API:", error);
    return { translatedText: "Error al traducir", detectedLang: idiomaOrigen };
  }
};