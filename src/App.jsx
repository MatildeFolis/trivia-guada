import { useState } from "react";

const preguntas = [
  {
    pregunta: "¿Cuál es mi color favorito?",
    opciones: ["Verde", "Azul", "Rojo", "Lila"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué es lo que más me gusta hacer?",
    opciones: ["Leer", "Cocinar", "Bailar", "Dibujar"],
    correcta: 2,
  },
  {
    pregunta: "¿Cuál es mi comida favorita?",
    opciones: ["Sushi", "Pizza", "Milanesa", "Pastas"],
    correcta: 3,
  },
  {
    pregunta: "¿A qué artista escucho todo el día?",
    opciones: ["Coldplay", "Airbag", "La Beriso", "Miranda"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es mi estación favorita?",
    opciones: ["Otoño", "Primavera", "Invierno", "Verano"],
    correcta: 3,
  },
];

export default function InvitacionTrivia() {
  const [pantalla, setPantalla] = useState("invitacion");
  const [paso, setPaso] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [respondida, setRespondida] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [respuestas, setRespuestas] = useState([]);

  const handleOpcion = (idx) => {
    if (respondida) return;
    setSeleccion(idx);
    setRespondida(true);
    const correcta = preguntas[paso].correcta === idx;
    if (correcta) setPuntaje((p) => p + 1);
    setRespuestas((r) => [...r, correcta]);
  };

  const handleSiguiente = () => {
    if (paso < preguntas.length - 1) {
      setPaso((p) => p + 1);
      setSeleccion(null);
      setRespondida(false);
    } else {
      setPantalla("resultado");
    }
  };

  const reiniciar = () => {
    setPantalla("invitacion");
    setPaso(0);
    setSeleccion(null);
    setRespondida(false);
    setPuntaje(0);
    setRespuestas([]);
  };

  const getMensaje = () => {
    if (puntaje === 5) return { texto: "¡Me conocés de memoria! 🖤", sub: "Sos mi persona favorita en la fiesta." };
    if (puntaje >= 3) return { texto: "¡Bastante bien! ✨", sub: "Ya casi, pero hay cosas que solo yo sé..." };
    return { texto: "¡Hay que ponerse al día! 🫶", sub: "Más razones para festejar juntos." };
  };

  return (
    <div style={{minHeight:"100vh",background:"#ffffff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Quicksand', sans-serif",padding:"20px"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Quicksand:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .card{background:#fff;border-radius:2px;max-width:420px;width:100%;overflow:hidden;box-shadow:0 2px 40px rgba(71,79,46,0.10);border:1px solid #e8ebe0}
        .header-band{background:#ffffff;padding:40px 32px 28px;text-align:center;border-bottom:1px solid #e8ebe0}
        .header-band::after{content:'';display:block;width:40px;height:1.5px;background:#474f2e;margin:16px auto 0}
        .nombre{font-family:'Playfair Display',serif;font-size:48px;font-weight:400;color:#474f2e;letter-spacing:2px;line-height:1.1}
        .anios{font-family:'Quicksand',sans-serif;font-size:11px;font-weight:500;color:#474f2e;letter-spacing:5px;text-transform:uppercase;margin-bottom:8px;opacity:0.7}
        .body{padding:32px}
        .fecha-row{display:flex;justify-content:space-between;border-top:1px solid #e8ebe0;border-bottom:1px solid #e8ebe0;padding:16px 0;margin-bottom:28px}
        .fecha-item{text-align:center;flex:1}
        .fecha-label{font-family:'Quicksand',sans-serif;font-size:9px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#474f2e;opacity:0.6;display:block;margin-bottom:4px}
        .fecha-valor{font-family:'Playfair Display',serif;font-size:18px;color:#474f2e}
        .divider-dot{width:1px;background:#e8ebe0;align-self:stretch}
        .invite-text{font-family:'Playfair Display',serif;font-size:16px;font-style:italic;color:#666;text-align:center;line-height:1.8;margin-bottom:28px}
        .trivia-cta{background:#474f2e;color:#fff;border:none;width:100%;padding:16px;font-family:'Quicksand',sans-serif;font-size:11px;font-weight:600;letter-spacing:4px;text-transform:uppercase;cursor:pointer}
        .trivia-cta-gold{background:transparent;color:#474f2e;border:1px solid #474f2e;width:100%;padding:14px;font-family:'Quicksand',sans-serif;font-size:10px;font-weight:600;letter-spacing:3px;text-transform:uppercase;cursor:pointer;margin-top:12px}
        .trivia-header{background:#474f2e;padding:24px 32px;display:flex;align-items:center;justify-content:space-between}
        .trivia-titulo{font-family:'Playfair Display',serif;font-size:20px;color:#fff;font-weight:400;letter-spacing:1px}
        .progress-text{font-family:'Quicksand',sans-serif;font-size:10px;color:rgba(255,255,255,0.7);letter-spacing:2px}
        .progress-bar-wrap{height:2px;background:#e8ebe0}
        .progress-bar-fill{height:2px;background:#474f2e;transition:width 0.4s ease}
        .pregunta-body{padding:32px}
        .pregunta-texto{font-family:'Playfair Display',serif;font-size:22px;color:#474f2e;line-height:1.5;margin-bottom:24px}
        .opcion-btn{display:block;width:100%;text-align:left;padding:14px 18px;border:1px solid #e8ebe0;background:#fff;font-family:'Quicksand',sans-serif;font-size:14px;font-weight:500;color:#333;cursor:pointer;margin-bottom:10px;border-radius:1px;transition:all 0.15s}
        .opcion-btn:hover:not(:disabled){border-color:#474f2e;background:#f5f6f2}
        .opcion-correcta{border-color:#474f2e!important;background:#f0f2eb!important;color:#474f2e!important}
        .opcion-incorrecta{border-color:#c62828!important;background:#fdf1f1!important;color:#c62828!important}
        .siguiente-btn{background:#474f2e;color:#fff;border:none;width:100%;padding:15px;font-family:'Quicksand',sans-serif;font-size:10px;font-weight:600;letter-spacing:4px;text-transform:uppercase;cursor:pointer;margin-top:6px}
        .resultado-header{background:#474f2e;padding:40px 32px;text-align:center}
        .puntaje-numero{font-family:'Playfair Display',serif;font-size:72px;font-weight:400;color:#fff;line-height:1}
        .puntaje-de{font-family:'Quicksand',sans-serif;font-size:11px;letter-spacing:4px;color:rgba(255,255,255,0.7);text-transform:uppercase;margin-top:6px}
        .resultado-body{padding:32px;text-align:center}
        .resultado-mensaje{font-family:'Playfair Display',serif;font-size:26px;color:#474f2e;margin-bottom:10px}
        .resultado-sub{font-family:'Quicksand',sans-serif;font-size:13px;color:#888;line-height:1.6;margin-bottom:28px}
        .respuestas-fila{display:flex;justify-content:center;gap:8px;margin-bottom:28px}
        .resp-dot{width:10px;height:10px;border-radius:50%}
      `}</style>
      <div className="card">
        {pantalla === "invitacion" && (
          <>
            <div className="header-band">
              <div className="anios">XV años</div>
              <div className="nombre">Guada</div>
            </div>
            <div className="body">
              <div className="fecha-row">
                <div className="fecha-item"><span className="fecha-label">Fecha</span><span className="fecha-valor">09 oct</span></div>
                <div className="divider-dot"/>
                <div className="fecha-item"><span className="fecha-label">Hora</span><span className="fecha-valor">20:00</span></div>
                <div className="divider-dot"/>
                <div className="fecha-item"><span className="fecha-label">Lugar</span><span className="fecha-valor">Janos</span></div>
              </div>
              <p className="invite-text">Quince años de risas, sueños y momentos que no se olvidan.<br/>Te espero para festejar juntos.</p>
              <button className="trivia-cta" onClick={() => setPantalla("trivia")}>¡Juguemos! 🎉</button>
            </div>
          </>
        )}
        {pantalla === "trivia" && (
          <>
            <div className="trivia-header">
              <span className="trivia-titulo">¿Me conocés?</span>
              <span className="progress-text">{paso + 1} / {preguntas.length}</span>
            </div>
            <div className="progress-bar-wrap">
              <div className="progress-bar-fill" style={{width:`${((paso+(respondida?1:0))/preguntas.length)*100}%`}}/>
            </div>
            <div className="pregunta-body">
              <p className="pregunta-texto">{preguntas[paso].pregunta}</p>
              {preguntas[paso].opciones.map((op,idx) => {
                let cls = "opcion-btn";
                if(respondida){
                  if(idx===preguntas[paso].correcta) cls+=" opcion-correcta";
                  else if(idx===seleccion) cls+=" opcion-incorrecta";
                }
                return <button key={idx} className={cls} onClick={()=>handleOpcion(idx)} disabled={respondida}>{op}</button>
              })}
              {respondida && <button className="siguiente-btn" onClick={handleSiguiente}>{paso<preguntas.length-1?"Siguiente →":"Ver resultado →"}</button>}
            </div>
          </>
        )}
        {pantalla === "resultado" && (()=>{
          const msg = getMensaje();
          return (
            <>
              <div className="resultado-header">
                <div className="puntaje-numero">{puntaje}</div>
                <div className="puntaje-de">de {preguntas.length} correctas</div>
              </div>
              <div className="resultado-body">
                <div className="respuestas-fila">{respuestas.map((r,i)=><div key={i} className="resp-dot" style={{background:r?"#474f2e":"#c62828"}}/>)}</div>
                <p className="resultado-mensaje">{msg.texto}</p>
                <p className="resultado-sub">{msg.sub}</p>
                <button className="trivia-cta" onClick={() => window.location.href='https://invitarteonline.com.ar/trivia-guadalupe-xv'}>Volver a la invitación</button>
                <button className="trivia-cta-gold" onClick={()=>{setPaso(0);setSeleccion(null);setRespondida(false);setPuntaje(0);setRespuestas([]);setPantalla("trivia")}}>Jugar de nuevo</button>
              </div>
            </>
          )
        })()}
      </div>
    </div>
  );
}
