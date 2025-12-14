import { useState, useEffect } from 'react';
import { obtenerTraduccion } from './api';
import logo from './assets/logoDreamer.png'; 
import './App.css';


const idiomas = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },      // Nuevo
  { code: 'it', name: 'Italian' },     // Nuevo
  { code: 'pt', name: 'Portuguese' },  // Nuevo
];

const obtenerNombreIdioma = (code) => {
  if (!code || code === '' || code.toLowerCase() === 'un' || code.toLowerCase() === 'autodetect') {
    return 'Idioma Desconocido';
  }
  const codeLower = code.toLowerCase();
  const idioma = idiomas.find(lang => lang.code === codeLower);
  return idioma ? idioma.name : code.toUpperCase();
};

function App() {
  const [textoInput, setTextoInput] = useState('Hello World');
  const [textoTraducido, setTextoTraducido] = useState('');
  const [idiomaOrigen, setIdiomaOrigen] = useState('en');
  const [idiomaDestino, setIdiomaDestino] = useState('es');
  const [cargando, setCargando] = useState(false);
  const [idiomaDetectado, setIdiomaDetectado] = useState('un');
  
  // CORRECCIÓN 1: Nuevo estado para saber si estamos en modo automático
  const [autoMode, setAutoMode] = useState(true); 

  useEffect(() => {
    const realizarTraduccion = async () => {
      if (!textoInput) {
          setIdiomaDetectado('un');
          setTextoTraducido('');
          return;
      }
      
      setCargando(true);
      
      // Si estamos en AutoMode, mandamos 'Autodetect' como origen. 
      // Si no, mandamos el idiomaOrigen seleccionado manualmente.
      const codigoOrigen = autoMode ? 'Autodetect' : idiomaOrigen;

      const { translatedText, detectedLang } = await obtenerTraduccion(textoInput, codigoOrigen, idiomaDestino);
      
      setTextoTraducido(translatedText);
      setIdiomaDetectado(detectedLang || 'un'); 
      setCargando(false);
    };

    const timeoutId = setTimeout(realizarTraduccion, 500);

    return () => clearTimeout(timeoutId);
  }, [textoInput, idiomaOrigen, idiomaDestino, autoMode]); // Agregamos autoMode a las dependencias

  const hablarTexto = (texto, idioma) => {
    if (!('speechSynthesis' in window)) return;
    if (!texto || window.speechSynthesis.speaking) return;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = idioma; 
    utterance.rate = 1.0; 
    window.speechSynthesis.speak(utterance);
  };
  
  const copiarPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto);
    alert("Texto copiado!"); 
  };

  // Función para borrar todo el contenido
  const limpiarTexto = () => {
    setTextoInput('');       // Borra el texto del usuario
    setTextoTraducido('');   // Borra la traducción anterior
    setIdiomaDetectado('un');// Resetea el detector a 'unknown'
    setAutoMode(true);       // (Opcional) Vuelve al modo automático
  };

  return (
    <div className="app-container">
      <header>
        <img src={logo} alt="Dreamer Translator Logo" className="logo-img" />
        
      </header>

      <main className="traductor-grid">
        {/* TARJETA IZQUIERDA (INPUT) */}
        <div className="card input-card">
          <div className="card-header">
            <div className="language-tabs">
              {/* 1. BOTÓN DE DETECCIÓN INTELIGENTE (Detect Language) */}
              <button
                  className={`lang-button ${autoMode ? 'active' : ''}`}
                  onClick={() => setAutoMode(true)}
              >
                  {!textoInput || idiomaDetectado === 'un'
                      ? 'Detect Language'
                      : `Detect: ${obtenerNombreIdioma(idiomaDetectado)}`}
              </button>   

              {/* 2. BOTONES RÁPIDOS (Los primeros 3 idiomas) */}
              {idiomas.slice(0, 3).map((idioma) => (
                  <button
                      key={idioma.code}
                      // Activado si NO estamos en autoMode Y el idioma coincide
                      className={`lang-button ${!autoMode && idiomaOrigen === idioma.code ? 'active' : ''}`}
                      onClick={() => {
                          setAutoMode(false); // Apagamos el modo auto
                          setIdiomaOrigen(idioma.code); // Ponemos el manual
                      }}
                  >
                      {idioma.name}
                  </button>
              ))}
              
              
              {/* 3. MENÚ DESPLEGABLE para OTROS IDIOMAS */}
              <select
                  // El valor es el idiomaOrigen, a menos que esté entre los 3 botones rápidos o en modo Auto, en cuyo caso es ''
                  value={idiomas.slice(0, 3).some(l => l.code === idiomaOrigen) || autoMode ? '' : idiomaOrigen}
                  onChange={(e) => {
                      setAutoMode(false); 
                      setIdiomaOrigen(e.target.value);
                  }}
                  // Clase activa: se aplica si NO estamos en modo auto Y el idioma seleccionado NO es uno de los 3 botones rápidos
                  className={`selector-idioma-dropdown ${!autoMode && !idiomas.slice(0, 3).some(l => l.code === idiomaOrigen) ? 'active' : ''}`}
              >
                  <option value="" disabled hidden>Other Languages</option>
                  {idiomas.slice(3).map((idioma) => (
                      <option key={idioma.code} value={idioma.code}>
                          {idioma.name}
                      </option>
                  ))}
              </select>
            </div>
          </div>
          
          <div className="textarea-wrapper">
            <textarea 
              value={textoInput}
              onChange={(e) => setTextoInput(e.target.value)}
              maxLength="500"
              className="text-area"
              placeholder="Type text here to translate..."
           />
           {/* SOLO MUESTRA LA X SI HAY TEXTO */}
            {textoInput && (
              <button className="btn-clear" onClick={limpiarTexto} title="Delete text"> 
                ✕
              </button>
            )}
          </div> 
          
          
          <div className="card-footer">
            <div className="iconos-accion">
               <button className="btn-icon" onClick={() => hablarTexto(textoInput, idiomaOrigen)}>🔊</button>
               <button className="btn-icon" onClick={() => copiarPortapapeles(textoInput)}>📋</button>
            </div>
            <div className="action-group">
              {/* El contador se actualiza solo: longitud actual / límite */}
               <span className="char-counter">
                 {textoInput.length} / 500
               </span>
              <button className="btn-traducir" disabled={cargando}>
                {cargando ? 'Translating...' : 'Translate'}
              </button>
            </div>
           
          </div>
        </div>

        {/* TARJETA DERECHA (OUTPUT) */}
        <div className="card output-card">
           <div className="card-header">
             <div className="language-tabs">
                  {/* 1. BOTONES RÁPIDOS (Los primeros 3 idiomas) */}
                  {idiomas.slice(0, 3).map((idioma) => (
                      <button
                          key={idioma.code}
                          className={`lang-button ${idiomaDestino === idioma.code ? 'active' : ''}`}
                          onClick={() => setIdiomaDestino(idioma.code)}
                      >
                          {idioma.name}
                      </button>
                  ))}
                  
                  {/* 2. MENÚ DESPLEGABLE para OTROS IDIOMAS */}
                  <select
                      // Si el idioma de destino es uno de los 3 principales, usamos un valor neutro para no mostrarlo dos veces
                      value={idiomas.slice(0, 3).some(l => l.code === idiomaDestino) ? '' : idiomaDestino}
                      onChange={(e) => setIdiomaDestino(e.target.value)}
                      // Estilo activo si el idioma de destino NO es uno de los 3 principales
                      className={`selector-idioma-dropdown ${!idiomas.slice(0, 3).some(l => l.code === idiomaDestino) ? 'active' : ''}`}
                  >
                      <option value="" disabled hidden>Other Languages</option>
                      {idiomas.slice(3).map((idioma) => (
                          <option key={idioma.code} value={idioma.code}>
                              {idioma.name}
                          </option>
                      ))}
                  </select>
              </div>
             
             <button className="btn-icon btn-cambio" onClick={() => {
                // Intercambio inteligente
                setIdiomaOrigen(idiomaDestino);
                setIdiomaDestino(idiomaOrigen); // Aquí podríamos usar idiomaDetectado si quisieras ser más preciso
                setTextoInput(textoTraducido);
                setAutoMode(false); // Al cambiar manual, desactivamos auto
             }}>
               ⇄
             </button>
          </div>

          <div className="text-area resultado">
            {cargando ? <p className="loading-text">...</p> : textoTraducido}
          </div>

          <div className="card-footer">
            <div className="iconos-accion">
               <button className="btn-icon" onClick={() => hablarTexto(textoTraducido, idiomaDestino)}>🔊</button>
               <button className="btn-icon" onClick={() => copiarPortapapeles(textoTraducido)}>📋</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;