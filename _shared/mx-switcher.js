/* =====================================================================
 * Mixando · Switcher moduli, pulsante "Vai a…" nella barra di ogni modulo.
 * Apre una palette di ricerca con tutti i moduli (per categoria) → clic =
 * vai diretto a quel modulo (stessa scheda), senza passare dalla suite.
 * La lista è letta da suite-v2/modules.js (UNICA fonte, niente duplicazione).
 * Si auto-carica modules.js se non presente. Degrada in silenzio se assente.
 * ===================================================================== */
(function(){
  'use strict';
  if(window.__mxSwitcher) return; window.__mxSwitcher = 1;

  function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  function esc(s){ return (''+(s==null?'':s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function curFile(){ try{ var p = location.pathname.split('/'); return decodeURIComponent(p[p.length-1]||''); }catch(e){ return ''; } }
  function baseName(f){ try{ var p = (''+f).split('/'); return p[p.length-1]; }catch(e){ return ''+f; } }

  function ensureModules(cb){
    if(window.MIXANDO_MODULES && window.MIXANDO_MODULES.length){ cb(); return; }
    var s = document.createElement('script');
    s.src = 'modules.js';
    s.onload = function(){ cb(); };
    s.onerror = function(){ cb(); };
    document.head.appendChild(s);
  }

  function injectStyle(){
    if(document.getElementById('mxSwCss')) return;
    var st = document.createElement('style'); st.id = 'mxSwCss';
    st.textContent =
      '#mxSwBtn{appearance:none;cursor:pointer;font:inherit;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#0a5b64;background:rgba(255,255,255,.72);border:1.5px solid #0e7c87;border-radius:9px;padding:6px 11px;display:inline-flex;align-items:center;gap:6px;transition:transform .18s,background .18s,color .18s;line-height:1}'
    + '#mxSwBtn:hover{background:linear-gradient(135deg,#18a4b0,#0a5b64);color:#fff;transform:translateY(-1px)}'
    + '#mxSwBtn.mxsw-float{position:fixed;top:10px;right:12px;z-index:99990;box-shadow:0 3px 10px rgba(0,0,0,.20)}'
    + '#mxSwOverlay{position:fixed;inset:0;background:rgba(15,20,25,.45);z-index:99998;display:none;align-items:flex-start;justify-content:center;padding:58px 16px}'
    + '#mxSwOverlay.show{display:flex}'
    + '#mxSwPanel{background:#fffdf8;border:1px solid #d8cfba;border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,.35);width:100%;max-width:560px;max-height:76vh;display:flex;flex-direction:column;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}'
    + '#mxSwPanel .mxsw-head{display:flex;align-items:center;gap:8px;padding:11px 14px;border-bottom:1px solid #ece5d5;background:linear-gradient(180deg,#fff,#f8f3e8)}'
    + '#mxSwPanel .mxsw-head b{font-family:Georgia,serif;font-size:14px;color:#0a5b64;flex:1}'
    + '.mxsw-close{appearance:none;border:0;background:#f0e9da;width:28px;height:28px;border-radius:8px;cursor:pointer;font-size:16px;font-weight:800;color:#6b5c4c}'
    + '#mxSwSearch{font:inherit;font-size:13px;padding:9px 12px;border:1px solid #e0d8c4;border-radius:9px;margin:10px 14px 4px;box-sizing:border-box}'
    + '#mxSwSearch:focus{outline:none;border-color:#0e7c87;box-shadow:0 0 0 2px #e3f3f5}'
    + '.mxsw-list{overflow:auto;padding:4px 8px 12px}'
    + '.mxsw-cat{font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#9a8f78;padding:10px 8px 4px}'
    + '.mxsw-row{display:flex;align-items:center;gap:10px;padding:7px 9px;border-radius:9px;text-decoration:none;color:#2c1810;transition:background .12s}'
    + '.mxsw-row:hover{background:#eef6f7}'
    + '.mxsw-row.mxsw-cur{background:#e3f3f5;outline:1px solid #bfe3e6}'
    + '.mxsw-ico{width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;flex:0 0 auto;box-shadow:inset 0 1px 0 rgba(255,255,255,.3)}'
    + '.mxsw-txt{display:flex;flex-direction:column;line-height:1.2;min-width:0}'
    + '.mxsw-txt b{font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
    + '.mxsw-txt small{font-size:11px;color:#8a7f6c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}';
    document.head.appendChild(st);
  }

  function build(){
    var mods = window.MIXANDO_MODULES || [], cats = window.MIXANDO_CATEGORIES || [];
    if(!mods.length) return;            // niente lista → niente switcher (degrado silenzioso)
    if(document.getElementById('mxSwBtn')) return;
    injectStyle();
    var cur = curFile();

    var btn = document.createElement('button');
    btn.id = 'mxSwBtn'; btn.type = 'button';
    btn.innerHTML = '▦ Vai a… ▾';
    btn.title = 'Vai a un altro modulo senza passare dalla suite';
    btn.addEventListener('click', function(e){ e.preventDefault(); openPanel(); });

    var host = document.querySelector('a[href*="suite.html"]');
    if(host && host.parentNode){ host.parentNode.insertBefore(btn, host); }
    else { btn.classList.add('mxsw-float'); document.body.appendChild(btn); }

    var byCat = {}; mods.forEach(function(m){ (byCat[m.category] = byCat[m.category] || []).push(m); });
    var order = cats.length ? cats.slice().sort(function(a,b){ return (a.order||0) - (b.order||0); }) : [];
    function rowsFor(list){
      return list.map(function(m){
        var act = (baseName(m.file) === cur) ? ' mxsw-cur' : '';
        var lbl = ((m.label||'') + ' ' + (m.sub||'') + ' ' + (m.id||'')).toLowerCase();
        return '<a class="mxsw-row'+act+'" href="'+esc(m.file)+'" data-lbl="'+esc(lbl)+'">'
             + '<span class="mxsw-ico" style="background:'+esc(m.color||'#888')+'">'+((m.icon && (''+m.icon).indexOf('<svg')===0) ? m.icon : esc(m.icon||'•'))+'</span>'
             + '<span class="mxsw-txt"><b>'+esc(m.label||m.id)+(act?' · (sei qui)':'')+'</b><small>'+esc(m.sub||'')+'</small></span></a>';
      }).join('');
    }
    var listHtml = '';
    if(order.length){ order.forEach(function(c){ var list = byCat[c.id]; if(!list || !list.length) return; listHtml += '<div class="mxsw-cat">'+esc(c.label||c.id)+'</div>' + rowsFor(list); }); }
    else { listHtml = rowsFor(mods); }

    var ov = document.createElement('div'); ov.id = 'mxSwOverlay';
    ov.innerHTML = '<div id="mxSwPanel"><div class="mxsw-head"><b>▦ Vai a un modulo</b><button class="mxsw-close" type="button" aria-label="Chiudi">×</button></div>'
                 + '<input type="text" id="mxSwSearch" placeholder="Cerca modulo… (Esc per chiudere)"><div class="mxsw-list" id="mxSwList">'+listHtml+'</div></div>';
    document.body.appendChild(ov);

    var search = ov.querySelector('#mxSwSearch');
    ov.addEventListener('click', function(e){ if(e.target === ov) closePanel(); });
    ov.querySelector('.mxsw-close').addEventListener('click', closePanel);
    search.addEventListener('input', function(){
      var q = this.value.toLowerCase().trim();
      ov.querySelectorAll('.mxsw-row').forEach(function(r){ r.style.display = (!q || r.getAttribute('data-lbl').indexOf(q) >= 0) ? '' : 'none'; });
      ov.querySelectorAll('.mxsw-cat').forEach(function(c){ var n = c.nextElementSibling, any = false; while(n && n.classList && n.classList.contains('mxsw-row')){ if(n.style.display !== 'none'){ any = true; break; } n = n.nextElementSibling; } c.style.display = any ? '' : 'none'; });
    });
    document.addEventListener('keydown', function(e){ if((e.key === 'Escape' || e.key === 'Esc') && ov.classList.contains('show')){ closePanel(); } });

    function openPanel(){ ov.classList.add('show'); if(search){ search.value=''; search.dispatchEvent(new Event('input')); } setTimeout(function(){ try{ search.focus(); }catch(_){ } }, 30); }
    function closePanel(){ ov.classList.remove('show'); }
    window.__mxSwOpen = openPanel;
  }

  ready(function(){ ensureModules(build); });
})();

/* ============================================================
 * «← Suite» (20/11/2026)
 * La suite apre i moduli in una scheda nuova (dal disco) o in un suo riquadro (server web). Il link «← Suite»
 * caricava la suite al posto del modulo: dal disco restavano due schede con la suite, da server web usciva una
 * suite dentro la suite. Ora il modulo chiede a chi l'ha aperto se è la suite; se sì, al clic chiude la sua scheda
 * (o chiede alla suite di chiudere il riquadro) e si torna alla suite che è già aperta. Se il modulo è stato
 * aperto da solo, o la suite è stata chiusa, il link porta alla suite come prima.
 * ============================================================ */
(function(){
  'use strict';
  if (window.__mxTornaSuite) return;
  window.__mxTornaSuite = true;
  var modo = '';   /* 'riquadro' = dentro la suite; 'scheda' = scheda aperta dalla suite; '' = modulo aperto da solo */
  window.addEventListener('message', function(ev){
    var d = ev.data;
    if (!d || typeof d !== 'object' || d.mx !== 'sono-la-suite') return;
    if (window.parent !== window && ev.source === window.parent) modo = 'riquadro';
    else if (window.opener && ev.source === window.opener) modo = 'scheda';
  });
  function chiedi(w){ try{ w.postMessage({mx:'sei-la-suite?'}, '*'); }catch(_){} }
  if (window.parent !== window) chiedi(window.parent);
  else if (window.opener) chiedi(window.opener);
  document.addEventListener('click', function(e){
    if (!modo || e.defaultPrevented || e.button || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || !/(^|\/)suite\.html([?#].*)?$/.test(a.getAttribute('href') || '')) return;
    if (modo === 'riquadro'){
      e.preventDefault();
      try{ window.parent.postMessage({mx:'chiudi-modulo'}, '*'); }catch(_){}
      return;
    }
    var aperta = false;
    try{ aperta = !!window.opener && !window.opener.closed; }catch(_){}
    if (!aperta) return;   /* la suite è stata chiusa: il link la riapre in questa scheda, come prima */
    e.preventDefault();
    var href = a.href;
    try{ window.close(); }catch(_){}
    setTimeout(function(){ if (!window.closed) location.href = href; }, 400);   /* se il browser non lascia chiudere la scheda */
  });
})();


/* ============================================================
 * Domande dentro la pagina (20/11/2026)
 * Al posto delle finestrelle del browser. window.mxChiedi(titolo, cfg) risponde con una promessa:
 *   cfg.scelte = [[valore, etichetta, spento?], ...]  tasti da cliccare; risponde il valore scelto, o null se si annulla
 *   cfg.campi  = [[etichetta, valore, tipo?, altro?], ...]  tipo: text, number, date, select (per select «altro» è
 *                l'elenco [[valore, etichetta], ...]; per number può essere {min, max}); risponde l'elenco dei
 *                valori scritti, o null se si annulla
 *   cfg.nota = riga di spiegazione sotto il titolo; cfg.conferma = scritta del tasto di conferma
 * Invio conferma, Esc annulla, un clic fuori dalla finestra annulla.
 * ============================================================ */
(function(){
  'use strict';
  if (window.mxChiedi) return;
  window.mxChiedi = function(titolo, cfg){
    cfg = cfg || {};
    return new Promise(function(ok){
      var vecchia = document.getElementById('mxChiediBox'); if (vecchia) vecchia.remove();
      var ov = document.createElement('div'); ov.id = 'mxChiediBox';
      ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
      ov.style.cssText = 'position:fixed;inset:0;z-index:2147483000;background:rgba(30,25,15,.45);display:flex;align-items:center;justify-content:center;padding:16px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';
      var box = document.createElement('div');
      box.style.cssText = 'background:#fffdf8;border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.32);max-width:460px;width:100%;max-height:86vh;overflow:auto;padding:18px 20px;color:#2c1810;font-size:14px;line-height:1.45;text-align:left';
      var h = document.createElement('div'); h.textContent = titolo || ''; h.style.cssText = 'font-weight:800;font-size:15.5px;margin-bottom:10px';
      box.appendChild(h);
      if (cfg.nota){ var nt = document.createElement('div'); nt.textContent = cfg.nota; nt.style.cssText = 'font-size:12.5px;color:#6b5c4c;margin:-4px 0 12px;white-space:pre-line'; box.appendChild(nt); }
      var finito = false;
      function chiudi(v){ if (finito) return; finito = true; document.removeEventListener('keydown', tasti, true); ov.remove(); ok(v); }
      function tasti(e){ if (e.key === 'Escape' || e.key === 'Esc'){ e.preventDefault(); e.stopPropagation(); chiudi(null); } }
      function tasto(testo, stile, fn, spento){
        var b = document.createElement('button'); b.type = 'button'; b.textContent = testo; b.disabled = !!spento;
        b.style.cssText = 'display:block;width:100%;margin:0 0 8px;padding:10px 13px;border-radius:9px;border:1px solid #d8cfba;font:inherit;font-size:14px;font-weight:700;cursor:' + (spento ? 'not-allowed;opacity:.5' : 'pointer') + ';' + stile;
        b.addEventListener('click', fn); box.appendChild(b); return b;
      }
      var primo = null, campi = [];
      function valori(){ return campi.map(function(x){ return x.value; }); }
      if (cfg.scelte){
        cfg.scelte.forEach(function(s){ var b = tasto(s[1], 'background:#fff;color:#075863;text-align:left', function(){ chiudi(s[0]); }, s[2]); if (!primo && !s[2]) primo = b; });
      } else {
        (cfg.campi || []).forEach(function(c){
          var l = document.createElement('label'); l.style.cssText = 'display:block;font-size:12px;font-weight:700;color:#6b5c4c;margin:0 0 10px';
          if (c[0]) l.appendChild(document.createTextNode(c[0]));
          var i;
          if (c[2] === 'select'){
            i = document.createElement('select');
            (c[3] || []).forEach(function(o){ var op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; i.appendChild(op); });
            i.value = (c[1] == null ? '' : String(c[1]));
          } else {
            i = document.createElement('input'); i.type = c[2] || 'text'; i.value = (c[1] == null ? '' : String(c[1]));
            if (c[2] === 'number') i.step = 'any';
            if (c[3] && c[3].min != null) i.min = c[3].min;
            if (c[3] && c[3].max != null) i.max = c[3].max;
          }
          i.style.cssText = 'display:block;width:100%;box-sizing:border-box;margin-top:4px;padding:9px 11px;border:1.5px solid #d8cfba;border-radius:8px;font:inherit;font-size:14px;font-weight:400;color:#2c1810;background:#fff';
          i.addEventListener('keydown', function(e){ if (e.key === 'Enter'){ e.preventDefault(); chiudi(valori()); } });
          l.appendChild(i); box.appendChild(l); campi.push(i);
        });
        tasto(cfg.conferma || 'OK', 'background:linear-gradient(180deg,#18a4b0,#0e7c87);color:#fff;border-color:#0a5b64;text-align:center', function(){ chiudi(valori()); });
        primo = campi[0] || null;
      }
      tasto('Annulla', 'background:#efe9dc;color:#5a4d3c;text-align:center;margin-bottom:0', function(){ chiudi(null); });
      ov.addEventListener('mousedown', function(e){ if (e.target === ov) chiudi(null); });
      /* i tasti premuti nella finestra non arrivano alle scorciatoie del modulo */
      ['keydown', 'keyup', 'keypress'].forEach(function(n){ ov.addEventListener(n, function(e){ e.stopPropagation(); }); });
      document.addEventListener('keydown', tasti, true);
      ov.appendChild(box); document.body.appendChild(ov);
      if (primo){ try{ primo.focus(); if (primo.tagName === 'INPUT' && primo.type === 'text' && primo.select) primo.select(); }catch(_){} }
    });
  };
})();

/* ============================================================
   20/11/2026: LA BARRA IN ALTO SUGLI SCHERMI STRETTI
   Sul telefono, sulla tavoletta e nelle finestre strette i pezzi della barra (logo Mixando Lab, logo e nome
   al centro, etichetta e titolo, «Vai a…», «← Suite») finivano uno sopra l'altro. Ora, quando su una riga
   i pezzi si toccherebbero, la barra va su due righe: sopra i due loghi, sotto il titolo e i tasti.
   Sotto i 640 px ci va sempre. Niente viene tolto, e dove su una riga ci sta resta com'era.
   Dove la barra è fissa in cima alla pagina, il contenuto scende di quanto la barra è cresciuta.
   ============================================================ */
(function(){
  if (document.getElementById('mxBarTelCss')) return;
  /* le stesse regole valgono in due casi: schermo sotto i 640 px, oppure classe «mx-bar-due» messa qui sotto
     quando su una riga i pezzi si toccherebbero. «mx-bar-larga» le spegne per un attimo, per poter misurare. */
  function regole(S){
    return S + '{height:auto !important;min-height:0 !important;flex-wrap:wrap !important;align-items:center !important;padding:6px 10px 6px !important;column-gap:8px !important;row-gap:4px !important}'
    + S + '::after{content:"";order:5;flex:0 0 100%;height:0}'
    + S + ' > *{order:11}'
    + S + ' > .mx-logo-lab{order:1;height:30px !important;max-width:124px !important}'
    + S + ' > .mx-logo-mini{order:2;height:28px !important;width:28px !important}'
    + S + ' > .em{order:2}'
    + S + ' > .mx-logo-center{order:3;position:static !important;transform:none !important;margin-left:auto !important;height:auto !important;max-width:none !important;gap:6px !important;flex:0 1 auto;min-width:0}'
    + S + ' > .mx-logo-center img{height:26px !important;width:auto !important;max-width:60px !important}'
    + S + ' > .mx-logo-center .rn{font-size:12px !important;white-space:nowrap}'
    + S + ' > .meta,' + S + ' > .tit{order:10;flex:1 1 0 !important;min-width:0 !important;gap:1px !important;justify-content:center}'
    + S + ' > .sp{display:none !important}'
    + S + ' .tag{display:block !important;white-space:nowrap !important;overflow:hidden !important;text-overflow:ellipsis !important;max-width:100% !important;line-height:1.15 !important;padding:0 !important}'
    + S + ' .tag::before,' + S + ' .tag::after{display:none !important}'
    + S + ' .ti{max-width:none !important;font-size:13px !important;margin:0 !important;line-height:1.2 !important}'
    + S + ' > #mxSwBtn{min-height:33px;white-space:nowrap}'
    + S + ' > a.back{order:12;padding:8px 10px !important;white-space:nowrap;transition:background .2s,color .2s,box-shadow .2s,transform .2s !important}';
  }
  var st = document.createElement('style'); st.id = 'mxBarTelCss';
  /* mentre si misura niente animazioni di passaggio: «← Suite» ne ha una su tutte le sue misure, e a metà strada
     la misura veniva sbagliata di qualche punto, tanto da far oscillare la barra fra una e due righe */
  st.textContent = 'html.mx-bar-larga .mx-bar,html.mx-bar-larga .mx-bar *{transition:none !important}'
    + '@media (max-width:640px){' + regole('html:not(.mx-bar-larga) .mx-bar') + '}' + regole('html.mx-bar-due:not(.mx-bar-larga) .mx-bar');
  (document.head || document.documentElement).appendChild(st);

  /* dove arriva una scritta: non il suo riquadro (che può essere largo e vuoto), ma le lettere.
     Se il riquadro taglia la scritta (titolo coi puntini) conta il riquadro; se la lascia uscire, contano le lettere. */
  function scritta(el){
    var b = el.getBoundingClientRect();
    try{
      var rg = document.createRange(); rg.selectNodeContents(el); var rb = rg.getBoundingClientRect();
      if (rb.width > 0){
        var taglia = getComputedStyle(el).overflowX !== 'visible';
        return { left: taglia ? Math.max(rb.left, b.left) : rb.left, right: taglia ? Math.min(rb.right, b.right) : rb.right, top: b.top, bottom: b.bottom };
      }
    }catch(_){}
    return b;
  }
  /* con la barra su una riga, il logo e il nome al centro toccano qualcos'altro? */
  function unaRigaSta(bar){
    var centro = bar.querySelector('.mx-logo-center'); if (!centro) return true;
    var cb = centro.getBoundingClientRect(); if (cb.width < 2) return true;
    /* il blocco al centro si misura da dove comincia il logo a dove finisce il nome: il nome può uscire dal riquadro */
    var c = { left: cb.left, right: cb.right, top: cb.top, bottom: cb.bottom }, dentro = centro.querySelectorAll('img,.rn'), i, j;
    for (i = 0; i < dentro.length; i++){
      var d = dentro[i].tagName === 'IMG' ? dentro[i].getBoundingClientRect() : scritta(dentro[i]);
      if (d.right - d.left < 1) continue;
      c.left = Math.min(c.left, d.left); c.right = Math.max(c.right, d.right);
    }
    var pezzi = [], figli = bar.children;
    for (i = 0; i < figli.length; i++){
      var e = figli[i]; if (e === centro) continue;
      var cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      if (e.className && /(^| )(meta|tit)( |$)/.test(e.className)){
        /* dentro il blocco del titolo: le scritte (fin dove arrivano le lettere) e gli eventuali tasti */
        var tt = e.querySelectorAll('.tag,.ti,button,a,select,input,img');
        for (j = 0; j < tt.length; j++) pezzi.push(/(^| )(tag|ti)( |$)/.test(tt[j].className || '') ? scritta(tt[j]) : tt[j].getBoundingClientRect());
      } else pezzi.push(e.getBoundingClientRect());
    }
    for (i = 0; i < pezzi.length; i++){
      var r = pezzi[i];
      if (r.right - r.left < 2) continue;
      if (Math.min(c.right, r.right) - Math.max(c.left, r.left) > 2 && Math.min(c.bottom, r.bottom) - Math.max(c.top, r.top) > 2) return false;
    }
    return true;
  }
  function sistema(){
    var bar = document.querySelector('.mx-bar'), corpo = document.body, root = document.documentElement;
    if (!bar || !corpo) return;
    root.classList.add('mx-bar-larga');                       /* un attimo su una riga, per misurare */
    var prima = bar.getBoundingClientRect().height;
    var sta = unaRigaSta(bar);
    root.classList.remove('mx-bar-larga');
    var stretto = !!(window.matchMedia && window.matchMedia('(max-width:640px)').matches);
    if (!sta && !stretto) root.classList.add('mx-bar-due'); else root.classList.remove('mx-bar-due');
    /* barra fissa: il contenuto scende di quanto la barra è più alta di prima.
       «important»: in qualche modulo lo spazio sopra il contenuto è dichiarato così, e senza non verrebbe preso */
    corpo.style.removeProperty('padding-top');
    if (getComputedStyle(bar).position !== 'fixed') return;
    var piu = Math.round(bar.getBoundingClientRect().height - prima);
    if (piu > 0) corpo.style.setProperty('padding-top', ((parseFloat(getComputedStyle(corpo).paddingTop) || 0) + piu) + 'px', 'important');
  }
  var attesa = null;
  function presto(){ if (attesa) clearTimeout(attesa); attesa = setTimeout(sistema, 60); }
  function avvia(){
    sistema();
    var bar = document.querySelector('.mx-bar');
    /* si rimisura quando un pezzo della barra cambia misura (un logo che arriva, una scritta che cambia) o ne arriva uno nuovo («Vai a…») */
    var ro = null;
    function guarda(){
      if (!ro || !bar) return;
      try{ ro.disconnect(); ro.observe(bar); for (var i = 0; i < bar.children.length; i++) ro.observe(bar.children[i]); }catch(_){}
    }
    if (bar && window.ResizeObserver){ try{ ro = new ResizeObserver(presto); guarda(); }catch(_){ ro = null; } }
    if (bar && window.MutationObserver){ try{ new MutationObserver(function(){ guarda(); presto(); }).observe(bar, { childList: true }); }catch(_){} }
    window.addEventListener('resize', presto);
    window.addEventListener('load', sistema);
    setTimeout(sistema, 700); setTimeout(sistema, 2000);
  }
  if (document.readyState !== 'loading') avvia(); else document.addEventListener('DOMContentLoaded', avvia);
})();
