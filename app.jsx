/* Tweaks island — applies live theme changes to the vanilla landing page */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "edition": "5",
  "cyan": "#19e3cf",
  "flame": "#f7941d",
  "energy": 0.55,
  "showLines": true
}/*EDITMODE-END*/;

function setText(sel, txt){ const el = document.querySelector(sel); if(el) el.textContent = txt; }

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(()=>{
    const r = document.documentElement.style;
    r.setProperty('--tw-cyan', t.cyan);
    r.setProperty('--tw-flame', t.flame);

    // energy glow intensity
    document.querySelectorAll('.energy').forEach(e=>{ e.style.opacity = t.energy < .12 ? '0' : '1'; });
    document.querySelectorAll('.energy::before');
    document.documentElement.style.setProperty('--energy-op', t.energy);
    document.querySelectorAll('.energy').forEach(e=>{
      e.style.setProperty('--eo', t.energy);
    });

    // hero lines toggle
    const lines = document.querySelector('.hero-lines');
    if(lines) lines.style.display = t.showLines ? '' : 'none';

    // edition number across the page
    const n = t.edition;
    setText('[data-ed-num]', n);
    setText('[data-ed-badge]', n + '° Edição');
    setText('[data-ed-nav]', n + '° ENCONTRO');
    document.querySelectorAll('[data-ed-foot]').forEach(el=>{ el.childNodes[0] && (el.childNodes[0].textContent = n + '° Encontro'); });
    document.title = n + '° Encontro de Jovens — ADM Acrelândia';
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Evento" />
      <TweakRadio label="Edição" value={t.edition} options={['5','4']}
        onChange={(v)=>setTweak('edition', v)} />

      <TweakSection label="Cores de acento" />
      <TweakColor label="Glow ciano" value={t.cyan}
        options={['#19e3cf','#2dd4ff','#0fe3cf','#22c3a6']}
        onChange={(v)=>setTweak('cyan', v)} />
      <TweakColor label="Chama" value={t.flame}
        options={['#f7941d','#ff7a1e','#ffb347','#ff5e3a']}
        onChange={(v)=>setTweak('flame', v)} />

      <TweakSection label="Atmosfera" />
      <TweakSlider label="Intensidade do glow" value={t.energy} min={0} max={1} step={0.05}
        onChange={(v)=>setTweak('energy', v)} />
      <TweakToggle label="Linhas de energia" value={t.showLines}
        onChange={(v)=>setTweak('showLines', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<App/>);
