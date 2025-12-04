import { useState, useEffect } from 'react';
import { obtenerTraduccion } from './api';
import logo from './assets/logoDreamer.png'; 
import './App.css';


const idiomas = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
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
               
               {/* BOTÓN DE DETECCIÓN INTELIGENTE */}
               <button
                    // Ahora se activa SOLO si autoMode es true
                    className={`lang-button ${autoMode ? 'active' : ''}`}
                    onClick={() => setAutoMode(true)}
                >
                    {/* Texto dinámico: Muestra qué idioma detectó entre paréntesis */}
                    {!textoInput || idiomaDetectado === 'un'
                        ? 'Detect Language'
                        : `Detect: ${obtenerNombreIdioma(idiomaDetectado)}`}
                </button>   

               {/* BOTONES DE IDIOMA MANUAL */}
               {idiomas.map((idioma) => (
                 <button
                   key={idioma.code}
                   // Se activa solo si NO estamos en autoMode y coincide el código
                   className={`lang-button ${!autoMode && idiomaOrigen === idioma.code ? 'active' : ''}`}
                   onClick={() => {
                     setAutoMode(false); // Apagamos el modo auto
                     setIdiomaOrigen(idioma.code); // Ponemos el manual
                   }}
                 >
                   {idioma.name}
                 </button>
               ))}
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
               {idiomas.map((idioma) => (
                 <button
                   key={idioma.code}
                   className={`lang-button ${idiomaDestino === idioma.code ? 'active' : ''}`}
                   onClick={() => setIdiomaDestino(idioma.code)}
                 >
                   {idioma.name}
                 </button>
               ))}
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