# Dreamer Translator

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

> Traductor moderno y elegante construido con React, que ofrece traducción en tiempo real, detección automática de idioma, text-to-speech y un diseño espacial único con efectos glassmorphism.

---

## 🌐 Demo en Vivo

** [Ver Dreamer Translator en acción](https://dreamer-seven.vercel.app/)**

---

## 📸 Vista Previa

![Dreamer Translator Interface](screenshot/DreamerTranslator.png)

---

## ✨ Características Principales

### 🔄 **Traducción en Tiempo Real**
- Traducción instantánea mientras escribes
- Implementación de **Debounce** para optimizar la experiencia de usuario
- Reduce llamadas innecesarias a la API mejorando el rendimiento

### 💾 **Sistema de Caché Inteligente**
- Almacenamiento local de traducciones recientes
- Minimiza llamadas a la API externa
- Respuestas instantáneas para traducciones repetidas
- Mejora significativa en velocidad y eficiencia

### 🔍 **Detección Automática de Idioma**
- Identifica automáticamente el idioma del texto ingresado
- Lógica inteligente de reconocimiento de patrones
- Soporte para múltiples idiomas

### 🔊 **Text-to-Speech (Texto a Voz)**
- Integración con **Web Speech API**
- Escucha la pronunciación correcta del texto traducido
- Mejora el aprendizaje de idiomas

### 🎨 **Diseño Moderno "Dark Space"**
- Tema oscuro inspirado en el espacio exterior
- Efectos de **Glassmorphism** (vidrio esmerilado)
- Animaciones CSS fluidas y elegantes
- Paleta de colores personalizada: **Mint Green** (#50C878)
- UI/UX intuitiva y responsive

### ⚡ **Gestión Eficiente de Estado**
- Uso de React Hooks (useState, useEffect)
- Manejo optimizado de renderizados
- Lógica compleja de UI simplificada

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Librería de interfaces de usuario
- **Vite** - Build tool ultrarrápido
- **JavaScript (ES6+)** - Lenguaje de programación
- **CSS3** - Estilos personalizados con animaciones

### APIs & Servicios
- **MyMemory Translation API** - Servicio de traducción
- **Web Speech API** - Text-to-Speech nativo del navegador
- **Vercel** - Hosting y despliegue continuo

### Características Técnicas
- **Debouncing** - Optimización de peticiones
- **Local Storage** - Sistema de caché persistente
- **Responsive Design** - Adaptable a todos los dispositivos

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** o **yarn** - Gestor de paquetes (viene con Node.js)
- **Git** - Para clonar el repositorio

---

## 🚀 Instalación y Configuración

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Juan-Diego22/Dreamer.git
cd Dreamer
```

### 2️⃣ Instalar dependencias

Con npm:
```bash
npm install
```

Con yarn:
```bash
yarn install
```

### 3️⃣ Ejecutar en modo desarrollo

Con npm:
```bash
npm run dev
```

Con yarn:
```bash
yarn dev
```

La aplicación se abrirá automáticamente en tu navegador en:
```
http://localhost:5173
```

### 4️⃣ Build para producción

Con npm:
```bash
npm run build
```

Con yarn:
```bash
yarn build
```

Los archivos optimizados se generarán en la carpeta `dist/`

---

## 📁 Estructura del Proyecto

```
Dreamer/
│
├── frontend/                      # Código fuente de la aplicación
│   ├── src/                       # Carpeta principal de código
│   │   ├── components/            # Componentes React reutilizables
│   │   ├── hooks/                 # Custom Hooks
│   │   ├── utils/                 # Utilidades y helpers
│   │   ├── styles/                # Archivos CSS globales
│   │   ├── App.jsx                # Componente principal
│   │   └── main.jsx               # Punto de entrada
│   ├── public/                    # Archivos públicos estáticos
│   └── index.html                 # HTML base
│
├── screenshot/                    # Capturas de pantalla
│   └── DreamerTranslator.png     # Screenshot principal
│
├── node_modules/                  # Dependencias (no incluido en Git)
├── .gitignore                     # Archivos ignorados por Git
├── package.json                   # Configuración y dependencias
├── package-lock.json              # Versiones exactas de dependencias
├── vercel.json                    # Configuración de Vercel
├── vite.config.js                 # Configuración de Vite
└── README.md                      # Este archivo
```

---

## 🎯 Cómo Usar la Aplicación

### Traducción Básica

1. **Escribe o pega texto** en el área de entrada (izquierda)
2. **Selecciona el idioma de destino** desde el selector
3. **La traducción aparecerá automáticamente** en tiempo real
4. **Copia el resultado** haciendo clic en el botón de copiar

### Detección Automática

1. El sistema **detecta automáticamente** el idioma del texto ingresado
2. No necesitas seleccionar el idioma origen manualmente
3. Funciona con más de 50 idiomas diferentes

### Text-to-Speech

1. **Escribe o traduce** cualquier texto
2. Haz clic en el **icono de altavoz** 🔊
3. Escucha la **pronunciación correcta** del texto
4. Útil para aprender pronunciación en otros idiomas

### Intercambio de Idiomas

1. Haz clic en el **botón de intercambio** ⇄
2. Los idiomas origen y destino se **invertirán automáticamente**
3. El texto se traducirá en la dirección opuesta

---

## 💡 Características Técnicas Destacadas

### Sistema de Debounce
```javascript
// Optimiza las peticiones a la API
// Solo traduce después de que el usuario deja de escribir
const debouncedTranslate = useDebounce(inputText, 500);
```

### Caché Local
```javascript
// Guarda traducciones recientes para acceso instantáneo
const cachedTranslation = localStorage.getItem(cacheKey);
if (cachedTranslation) return cachedTranslation;
```

### Web Speech API
```javascript
// Text-to-Speech nativo del navegador
const utterance = new SpeechSynthesisUtterance(text);
utterance.lang = targetLanguage;
window.speechSynthesis.speak(utterance);
```

---

## 🌍 Idiomas Soportados

Dreamer Translator soporta traducción entre ellas:

- 🇪🇸 Español
- 🇺🇸 Inglés
- 🇫🇷 Francés
- 🇩🇪 Alemán
- 🇮🇹 Italiano
- 🇵🇹 Portugués



## 🔧 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm run dev`
Ejecuta la aplicación en modo desarrollo.
Abre [http://localhost:5173](http://localhost:5173) para verla en el navegador.

### `npm run build`
Construye la aplicación para producción en la carpeta `dist/`.
Optimiza el build para mejor rendimiento.

### `npm run preview`
Previsualiza localmente el build de producción.

### `npm run lint`
Ejecuta el linter para verificar problemas en el código.

---

##  Despliegue

### Desplegar en Vercel (Recomendado)

1. **Instala Vercel CLI:**
```bash
npm install -g vercel
```

2. **Inicia sesión en Vercel:**
```bash
vercel login
```

3. **Despliega el proyecto:**
```bash
vercel
```

O simplemente conecta tu repositorio de GitHub con Vercel para **despliegue automático** con cada push.

### Desplegar en Netlify

1. Haz build del proyecto: `npm run build`
2. Arrastra la carpeta `dist/` a Netlify Drop
3. ¡Listo! Tu app está en línea

---

## 🔮 Mejoras Futuras

- [ ] **Soporte para más idiomas** - Expandir a 100+ idiomas
- [ ] **Historial de traducciones** - Ver traducciones pasadas
- [ ] **Modo offline** - Traducción sin conexión a internet
- [ ] **Traducción de documentos** - Subir archivos .txt, .pdf
- [ ] **Traducción por voz** - Speech-to-text + traducción
- [ ] **Tema claro** - Opción de modo claro además del oscuro
- [ ] **Favoritos** - Guardar traducciones importantes
- [ ] **Compartir traducciones** - Generar links compartibles
- [ ] **Diccionario integrado** - Definiciones de palabras
- [ ] **Corrección gramatical** - Sugerencias de mejora
- [ ] **Traducción de imágenes** - OCR + traducción de texto en imágenes
- [ ] **App móvil** - Versión nativa con React Native

---

## Problemas Conocidos y Soluciones

### La traducción no aparece
- **Causa:** Límite de peticiones alcanzado en MyMemory API
- **Solución:** Espera unos minutos y vuelve a intentar

### Text-to-Speech no funciona
- **Causa:** Navegador no soporta Web Speech API
- **Solución:** Usa Chrome, Edge o Firefox (versiones recientes)

### Caché no se actualiza
- **Causa:** LocalStorage lleno o deshabilitado
- **Solución:** Limpia el caché del navegador o habilita LocalStorage

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar Dreamer Translator:

### Cómo contribuir:

1. **Fork** el repositorio
2. Crea una **rama** para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. **Commit** tus cambios (`git commit -m 'feat: Agregar nueva característica'`)
4. **Push** a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un **Pull Request** con descripción detallada

### Pautas de contribución:

- Sigue las convenciones de código del proyecto
- Documenta nuevas funcionalidades
- Asegúrate de que el código funcione correctamente
- Actualiza el README si es necesario

## 🙏 Agradecimientos

Este proyecto fue posible gracias a:

- **MyMemory Translation API** - Por proporcionar el servicio de traducción gratuito
- **React Team** - Por crear una librería increíble
- **Vite Team** - Por la herramienta de desarrollo ultrarrápida
- **Vercel** - Por el hosting gratuito y confiable
- **Comunidad de Open Source** - Por la inspiración y recursos

---

## 📚 Recursos y Referencias

### APIs utilizadas:
- [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php)
- [Web Speech API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)






