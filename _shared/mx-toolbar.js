/* =====================================================================
 * MX Toolbar, Libreria condivisa Mixando v3
 * Pulsanti standard + modal anteprima + Word/.doc + PDF (print) + report aggregato
 * MX-BUILD: 2026-05-24-toolbar-v1.2 + bottone JSON nel modal
 * ===================================================================== */
(function(){
'use strict';

window.MX = window.MX || {};

/* =====================================================================
 * STORAGE HELPERS
 * ===================================================================== */
function loadJSON(key, def){
  try{ var s = JSON.parse(localStorage.getItem(key)); return (s != null) ? s : def; }
  catch(_){ return def; }
}
function saveJSON(key, val){
  try{ localStorage.setItem(key, JSON.stringify(val)); return true; }catch(_){ return false; }
}

MX.getPerito = MX.getPerito || function(){ return loadJSON('mx2::perito', {}); };
MX.getImmobile = MX.getImmobile || function(){ return loadJSON('mx2::locali-v1', {ana:{}, locali:[]}); };

/* =====================================================================
 * UTILITY
 * ===================================================================== */
function esc(s){
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, function(c){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
  });
}
function fmtDate(d){
  if (!d) return '';
  if (typeof d === 'string' && d.length === 10) {
    var p = d.split('-'); return p[2]+'/'+p[1]+'/'+p[0];
  }
  var dt = new Date(d);
  return dt.getDate().toString().padStart(2,'0')+'/'+(dt.getMonth()+1).toString().padStart(2,'0')+'/'+dt.getFullYear();
}
function fmtNow(){
  var d = new Date();
  return d.getDate().toString().padStart(2,'0')+'/'+(d.getMonth()+1).toString().padStart(2,'0')+'/'+d.getFullYear()+' '+
         d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0');
}
function toast(msg, ms){
  var t = document.querySelector('.mx-toast');
  if (!t){
    t = document.createElement('div');
    t.className = 'mx-toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tmr);
  t._tmr = setTimeout(function(){ t.classList.remove('show'); }, ms||2400);
}

/* =====================================================================
 * MODULE CONFIG (set via initToolbar)
 * ===================================================================== */
var CFG = null;

/* =====================================================================
 * INTESTAZIONE DOCUMENTO (header standard Word/PDF/Report)
 * ===================================================================== */
function buildDocHead(meta){
  var perito = MX.getPerito() || {};
  var imm = MX.getImmobile() || {ana:{}};
  var ana = imm.ana || {};
  var logoHtml = perito.logoData
    ? '<div class="logo"><img src="'+esc(perito.logoData)+'" alt="Logo"></div>'
    : '';
  return ''+
    '<div class="mx-doc-head">'+
      logoHtml+
      '<div class="doc-meta">'+
        (perito.nome ? '<div class="perito-name">'+esc(perito.titolo||'')+' '+esc(perito.nome)+'</div>' : '<div class="perito-name" style="color:#a83232">⚠ Anagrafica perito non compilata</div>')+
        (perito.studio ? '<div>'+esc(perito.studio)+'</div>' : '')+
        (perito.albo ? '<div>'+esc(perito.albo)+(perito.numAlbo?' n. '+esc(perito.numAlbo):'')+'</div>' : '')+
        (perito.piva ? '<div>P.IVA/C.F.: '+esc(perito.piva)+'</div>' : '')+
        ((perito.tel||perito.email) ? '<div>'+(perito.tel?'Tel.: '+esc(perito.tel):'')+(perito.tel&&perito.email?' · ':'')+(perito.email?esc(perito.email):'')+'</div>' : '')+
      '</div>'+
      '<div class="doc-meta" style="text-align:right">'+
        '<strong>Relazione tecnica</strong>'+
        '<div style="font-size:12px;font-style:italic;color:#2c5d7c">'+esc(CFG.moduleName)+'</div>'+
        '<div style="margin-top:6px">Emissione: '+fmtNow()+'</div>'+
        (ana.DataSopr ? '<div>Sopralluogo: '+fmtDate(ana.DataSopr)+'</div>' : '')+
        (ana.Incarico ? '<div>Incarico: '+esc(ana.Incarico)+'</div>' : '')+
      '</div>'+
    '</div>'+
    '<h1>'+esc(meta.titolo || CFG.moduleName)+'</h1>'+
    (ana.Nome || ana.Indirizzo ? ''+
      '<table style="margin-top:0">'+
        '<tr><th style="width:30%">Committente</th><td>'+esc(ana.Nome||'n.d.')+(ana.CF?' · C.F./P.IVA: '+esc(ana.CF):'')+'</td></tr>'+
        '<tr><th>Immobile</th><td>'+esc(ana.Indirizzo||'n.d.')+(ana.Catasto?' · '+esc(ana.Catasto):'')+(ana.Anno?' · costruzione '+esc(ana.Anno):'')+'</td></tr>'+
        (ana.Oggetto ? '<tr><th>Oggetto</th><td>'+esc(ana.Oggetto)+'</td></tr>' : '')+
        (meta.note ? '<tr><th>Note del perito</th><td>'+esc(meta.note).replace(/\n/g,'<br>')+'</td></tr>' : '')+
      '</table>' : (meta.note ? '<div class="mx-doc-note">'+esc(meta.note).replace(/\n/g,'<br>')+'</div>' : ''));
}

function buildDocFooter(){
  return '<div class="mx-doc-footer">Relazione generata da <strong>Mixando v3</strong> · '+fmtNow()+' · '+esc(CFG.moduleName)+'<br>Algoritmi conformi alle normative vigenti citate nelle sezioni di tracciabilità tecnica.</div>';
}

/* =====================================================================
 * BUILD PREVIEW DOCUMENT (riusabile per Word/PDF/Report)
 * ===================================================================== */
function buildFullDoc(selections, note){
  var meta = { titolo: CFG.moduleName, note: note };
  var html = '<div class="mx-doc">';
  html += buildDocHead(meta);
  if (typeof CFG.getDocSections === 'function'){
    html += CFG.getDocSections(selections || {});
  } else {
    html += '<p><em>Il modulo non ha ancora definito il contenuto del report.</em></p>';
  }
  html += buildDocFooter();
  html += '</div>';
  return html;
}

/* =====================================================================
 * MODAL ANTEPRIMA
 * ===================================================================== */
var $modal = null;
function ensureModal(){
  if ($modal) return $modal;
  var m = document.createElement('div');
  m.className = 'mx-modal';
  m.innerHTML = ''+
    '<div class="mx-modal-frame">'+
      '<div class="mx-modal-head">'+
        '<h2 id="mx-modal-title">Anteprima documento</h2>'+
        '<button type="button" class="x" data-act="close" aria-label="Chiudi">&times;</button>'+
      '</div>'+
      '<div class="mx-modal-body">'+
        '<aside class="mx-modal-side">'+
          '<div class="mx-info" id="mx-perito-info">…</div>'+
          '<button type="button" class="mx-link" data-act="open-anagrafica">&#9881; Modifica anagrafica perito/cliente</button>'+
          '<button type="button" class="mx-link" data-act="refresh-anagrafica" style="margin-left:6px">&#8635; Ricarica</button>'+
          '<h3>Note del perito (libere)</h3>'+
          '<div class="mx-fld"><textarea id="mx-note" placeholder="Eventuali osservazioni, condizioni del sopralluogo, segnalazioni al committente..."></textarea></div>'+
          '<h3>Sezioni incluse</h3>'+
          '<div class="mx-sections" id="mx-sections"></div>'+
          '<div style="margin-top:14px"><button type="button" class="mx-link" data-act="refresh-preview">&#8635; Aggiorna anteprima</button></div>'+
        '</aside>'+
        '<section class="mx-modal-preview">'+
          '<div class="mx-modal-paper mx-print" id="mx-preview"></div>'+
        '</section>'+
      '</div>'+
      '<div class="mx-modal-foot">'+
        '<div class="left">'+
          '<button type="button" class="mx-tb-btn tb-word" data-act="export-word"><span class="ico">&#128221;</span><span class="label">Salva Word</span></button>'+
          '<button type="button" class="mx-tb-btn tb-pdf" data-act="export-pdf"><span class="ico">&#128196;</span><span class="label">Stampa / PDF</span></button>'+
          '<button type="button" class="mx-tb-btn tb-report" data-act="export-report"><span class="ico">&#128230;</span><span class="label">Aggiungi al report</span></button>'+
          '<button type="button" class="mx-tb-btn tb-save" data-act="export-json" title="Scarica un file .json con dati input+output (backup tecnico)"><span class="ico">&#128190;</span><span class="label">JSON</span></button>'+
        '</div>'+
        '<div class="right">'+
          '<button type="button" class="mx-tb-btn tb-reset" data-act="close"><span class="ico">&#10005;</span><span class="label">Chiudi</span></button>'+
        '</div>'+
      '</div>'+
    '</div>';
  document.body.appendChild(m);
  $modal = m;
  /* event delegation */
  m.addEventListener('click', function(ev){
    var el = ev.target.closest('[data-act]');
    if (!el) return;
    var act = el.dataset.act;
    if (act === 'close') closeModal();
    else if (act === 'refresh-anagrafica' || act === 'refresh-preview') refreshPreview();
    else if (act === 'open-anagrafica') window.open('locali-cantiere.html', '_blank');
    else if (act === 'export-word') doExportWord();
    else if (act === 'export-pdf') doExportPDF();
    else if (act === 'export-report') doAddToReport();
    else if (act === 'export-json') doExportJSON();
  });
  return m;
}
function openModal(){
  ensureModal();
  /* render perito info */
  var p = MX.getPerito() || {};
  var imm = MX.getImmobile() || {ana:{}};
  var ana = imm.ana || {};
  var pInfo = document.getElementById('mx-perito-info');
  var ok = !!(p.nome && p.studio);
  pInfo.className = ok ? 'mx-info' : 'mx-warn';
  pInfo.innerHTML = ok
    ? '<b>'+esc(p.titolo||'')+' '+esc(p.nome)+'</b><br>'+esc(p.studio||'')+(ana.Nome?'<br><b>Committente:</b> '+esc(ana.Nome):'')+(ana.Indirizzo?'<br><b>Immobile:</b> '+esc(ana.Indirizzo):'')
    : '<b>Anagrafica incompleta.</b> I dati del perito e del committente non sono compilati. Clicca <em>Modifica anagrafica</em> per integrare.';
  /* sections checkboxes */
  var def = CFG.defaultSections || {};
  var sec = document.getElementById('mx-sections');
  sec.innerHTML = '';
  Object.keys(def).forEach(function(k){
    var lab = document.createElement('label');
    lab.innerHTML = '<input type="checkbox" data-k="'+esc(k)+'"' + (def[k].on ? ' checked' : '') + '> '+esc(def[k].label);
    sec.appendChild(lab);
  });
  sec.querySelectorAll('input').forEach(function(inp){
    inp.addEventListener('change', refreshPreview);
  });
  document.getElementById('mx-note').value = '';
  refreshPreview();
  $modal.classList.add('is-open');
}
function closeModal(){ if ($modal) $modal.classList.remove('is-open'); }
function readSelections(){
  var out = {};
  document.querySelectorAll('#mx-sections input').forEach(function(inp){
    out[inp.dataset.k] = inp.checked;
  });
  return out;
}
function refreshPreview(){
  var sel = readSelections();
  var note = document.getElementById('mx-note').value;
  document.getElementById('mx-preview').innerHTML = buildFullDoc(sel, note);
}

/* =====================================================================
 * EXPORT, WORD (.doc HTML con MIME application/msword)
 * ===================================================================== */
/* 19/11/2026: Word non disegna i grafici SVG (ne stampa le scritte alla rinfusa). Prima di scaricare il documento
   ogni disegno diventa un'immagine; le curve animate vanno al loro stato finale; i tasti dell'interfaccia si tolgono. */
function _mxSvgInImmagini(html, fatto){
  var host = document.createElement('div'); host.innerHTML = html;
  [].slice.call(host.querySelectorAll('button')).forEach(function(b){ if (b.parentNode) b.parentNode.removeChild(b); });
  var svgs = [].slice.call(host.querySelectorAll('svg'));
  var restano = svgs.length;
  if (!restano){ fatto(host.innerHTML); return; }
  var chiudi = function(){ if (--restano === 0) fatto(host.innerHTML); };
  svgs.forEach(function(svg){
    try {
      var vb = (svg.getAttribute('viewBox') || '').split(/[ ,]+/).map(Number);
      var w = parseFloat(svg.getAttribute('width')) || vb[2] || 800;
      var h = parseFloat(svg.getAttribute('height')) || vb[3] || 400;
      [].slice.call(svg.querySelectorAll('animate,set,animateTransform,animateMotion')).forEach(function(a){
        try { var an = a.getAttribute('attributeName'), to = a.getAttribute('to'); if (an && to != null && a.parentNode && !/transform|motion/i.test(a.tagName)) a.parentNode.setAttribute(an, to); } catch(e){}
        if (a.parentNode) a.parentNode.removeChild(a);
      });
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('width', w); svg.setAttribute('height', h);
      var xml = new XMLSerializer().serializeToString(svg);
      var img = new Image();
      img.onload = function(){
        try {
          var sc = Math.min(2, 1800 / w); if (w < 64) sc = 4;
          var c = document.createElement('canvas'); c.width = Math.round(w * sc); c.height = Math.round(h * sc);
          var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
          var out = document.createElement('img'); out.src = c.toDataURL('image/png');
          var lw = (w < 64) ? 14 : Math.min(600, w); out.setAttribute('width', Math.round(lw)); out.setAttribute('height', Math.round(h * lw / w));
          svg.parentNode.replaceChild(out, svg);
        } catch(e){}
        chiudi();
      };
      img.onerror = chiudi;
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
    } catch(e){ chiudi(); }
  });
}
function doExportWord(){
  var sel = readSelections();
  var note = document.getElementById('mx-note').value;
  _mxSvgInImmagini(buildFullDoc(sel, note), function(bodyHtml){   /* 19/11/2026: grafici come immagini */
  /* Stili minimi inline per il file .doc */
  var docHtml =
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">'+
    '<head><meta charset="utf-8"><title>'+esc(CFG.moduleName)+'</title>'+
    '<style>'+
      'body{font-family:Georgia,serif;color:#2c1810;font-size:12pt;line-height:1.5}'+
      'h1{font-size:18pt;color:#2c1810;font-style:italic;border-bottom:2px solid #2c1810;padding-bottom:6pt}'+
      'h2{font-size:14pt;color:#2c5d7c;border-bottom:1px solid #d8d3c4;padding-bottom:3pt;margin-top:18pt}'+
      'h3{font-size:12pt;color:#2c1810;margin-top:12pt}'+
      'table{border-collapse:collapse;width:100%;margin:6pt 0;font-size:10pt}'+
      'th,td{border:1px solid #999;padding:4pt 6pt;text-align:left;vertical-align:top}'+
      'th{background:#f0eada;font-weight:700}'+
      '.mx-doc-head{display:table;width:100%;margin-bottom:12pt;border-bottom:2pt solid #2c1810;padding-bottom:8pt}'+
      '.mx-doc-head>div{display:table-cell;vertical-align:top}'+
      '.mx-doc-head .perito-name{font-size:13pt;font-weight:700;color:#2c1810}'+
      '.mx-doc-footer{margin-top:18pt;padding-top:8pt;border-top:1pt solid #999;font-size:9pt;color:#8b7355;text-align:center}'+
      '.ver-ok{background:#f0f8f3;border-left:3pt solid #1f7a4d;padding:6pt 10pt;margin:6pt 0}'+
      '.ver-warn{background:#fdf6ec;border-left:3pt solid #b07820;padding:6pt 10pt;margin:6pt 0}'+
      '.ver-err{background:#fbf0f0;border-left:3pt solid #a83232;padding:6pt 10pt;margin:6pt 0}'+
      '.ver-crit{background:#f5e6f9;border-left:3pt solid #7b1fa2;padding:6pt 10pt;margin:6pt 0}'+
      '.mx-doc-note{background:#fffbef;border:1px solid #f0e0c4;padding:6pt 10pt;margin:6pt 0;font-style:italic;font-size:10.5pt}'+
    '</style></head>'+
    '<body>'+ bodyHtml +'</body></html>';
  var blob = new Blob(['﻿', docHtml], { type:'application/msword;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var imm = MX.getImmobile() || {ana:{}};
  var slug = (imm.ana && imm.ana.Nome ? imm.ana.Nome.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') : 'analisi');
  var a = document.createElement('a');
  a.href = url; a.download = CFG.moduleId+'-'+slug+'-'+(new Date().toISOString().slice(0,10))+'.doc';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function(){ URL.revokeObjectURL(url); }, 300);
  toast('File Word generato, apri con Word');
  });
}

/* =====================================================================
 * EXPORT, PDF (window.print)
 * ===================================================================== */
function doExportPDF(){
  /* la classe .mx-print del paper limita la stampa a quel blocco via @media print */
  window.print();
}

/* =====================================================================
 * AGGIUNGI AL REPORT (snapshot in mx2::reports)
 * ===================================================================== */
function doAddToReport(){
  var sel = readSelections();
  var note = document.getElementById('mx-note').value;
  var snap = {
    schemaVersion: 1,
    moduleId: CFG.moduleId,
    moduleName: CFG.moduleName,
    timestamp: new Date().toISOString(),
    input: (typeof CFG.getInput === 'function') ? CFG.getInput() : null,
    output: (typeof CFG.getOutput === 'function') ? CFG.getOutput() : null,
    svg: (typeof CFG.getSvgHTML === 'function') ? CFG.getSvgHTML() : null,
    note: note,
    sections: sel,
    docHtml: buildFullDoc(sel, note)
  };
  var reports = loadJSON('mx2::reports', []);
  reports.push(snap);
  saveJSON('mx2::reports', reports);
  toast('Analisi aggiunta al Report (' + reports.length + ' totali)');
  closeModal();
}

/* =====================================================================
 * EXPORT, JSON (backup tecnico file scaricato)
 * ===================================================================== */
function doExportJSON(){
  var sel = readSelections();
  var note = document.getElementById('mx-note').value;
  var snap = {
    schemaVersion: 1,
    moduleId: CFG.moduleId,
    moduleName: CFG.moduleName,
    exportedAt: new Date().toISOString(),
    perito: MX.getPerito ? MX.getPerito() : null,
    immobile: MX.getImmobile ? MX.getImmobile() : null,
    input: (typeof CFG.getInput === 'function') ? CFG.getInput() : null,
    output: (typeof CFG.getOutput === 'function') ? CFG.getOutput() : null,
    svg: (typeof CFG.getSvgHTML === 'function') ? CFG.getSvgHTML() : null,
    note: note,
    sections: sel
  };
  var blob = new Blob([JSON.stringify(snap, null, 2)], {type:'application/json;charset=utf-8'});
  var url = URL.createObjectURL(blob);
  var imm = MX.getImmobile ? MX.getImmobile() : {ana:{}};
  var slug = (imm && imm.ana && imm.ana.Nome) ? imm.ana.Nome.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') : 'analisi';
  var a = document.createElement('a');
  a.href = url; a.download = CFG.moduleId+'-'+slug+'-'+(new Date().toISOString().slice(0,10))+'.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function(){ URL.revokeObjectURL(url); }, 300);
  toast('File JSON scaricato (backup tecnico)');
}

/* =====================================================================
 * DIALOG SALVA (mini), chiede nome e note
 * ===================================================================== */
var $dlg = null;
function ensureDialog(){
  if ($dlg) return $dlg;
  $dlg = document.createElement('div');
  $dlg.className = 'mx-dialog';
  $dlg.innerHTML = '<div class="mx-dialog-card" id="mx-dlg-card"></div>';
  document.body.appendChild($dlg);
  return $dlg;
}
function openSaveDialog(){
  ensureDialog();
  var imm = MX.getImmobile() || {ana:{}};
  var defName = (imm.ana && imm.ana.Nome ? imm.ana.Nome+' - ' : '') + fmtNow();
  var card = document.getElementById('mx-dlg-card');
  card.innerHTML = ''+
    '<h3>&#128190; Salva analisi</h3>'+
    '<p>Dai un nome al salvataggio. Potrai ricaricarlo o confrontarlo con uno futuro (es. al ritorno sul cantiere).</p>'+
    '<div class="mx-fld"><label>Nome</label><input type="text" id="mx-dlg-name" value="'+esc(defName)+'"></div>'+
    '<div class="mx-fld"><label>Note (opzionali)</label><textarea id="mx-dlg-note"></textarea></div>'+
    '<div class="mx-dialog-foot">'+
      '<button type="button" data-act="dlg-cancel">Annulla</button>'+
      '<button type="button" class="primary" data-act="dlg-save">&#128190; Salva</button>'+
    '</div>';
  $dlg.classList.add('is-open');
  card.querySelector('[data-act="dlg-cancel"]').addEventListener('click', function(){ $dlg.classList.remove('is-open'); });
  card.querySelector('[data-act="dlg-save"]').addEventListener('click', function(){
    var nm = document.getElementById('mx-dlg-name').value.trim();
    if (!nm){ alert('Inserisci un nome.'); return; }
    var nt = document.getElementById('mx-dlg-note').value.trim();
    var saves = loadJSON('mx2::'+CFG.moduleId+'-saves', []);
    saves.push({
      schemaVersion: 1,
      nome: nm,
      note: nt,
      timestamp: new Date().toISOString(),
      input: (typeof CFG.getInput === 'function') ? CFG.getInput() : null,
      output: (typeof CFG.getOutput === 'function') ? CFG.getOutput() : null,
      svg: (typeof CFG.getSvgHTML === 'function') ? CFG.getSvgHTML() : null
    });
    saveJSON('mx2::'+CFG.moduleId+'-saves', saves);
    $dlg.classList.remove('is-open');
    toast('Analisi salvata ('+saves.length+' totali per questo modulo)');
  });
}

/* =====================================================================
 * DIALOG CARICA, lista dei salvataggi
 * ===================================================================== */
function openLoadDialog(){
  ensureDialog();
  var saves = loadJSON('mx2::'+CFG.moduleId+'-saves', []);
  var card = document.getElementById('mx-dlg-card');
  if (saves.length === 0){
    card.innerHTML = '<h3>&#128194; Carica analisi</h3><p>Non ci sono analisi salvate per questo modulo. Calcola, poi clicca <em>Salva analisi</em> per crearne una.</p><div class="mx-dialog-foot"><button type="button" class="primary" data-act="dlg-cancel">OK</button></div>';
  } else {
    var rows = saves.map(function(s, i){
      return '<div class="mx-save-row">'+
        '<div class="info"><div class="nm">'+esc(s.nome)+'</div><div class="meta">'+fmtDate(s.timestamp)+' '+(new Date(s.timestamp).toTimeString().slice(0,5))+(s.note?' &middot; '+esc(s.note):'')+'</div></div>'+
        '<button type="button" class="load" data-i="'+i+'" data-act="load">Carica</button>'+
        '<button type="button" class="del" data-i="'+i+'" data-act="del">&times;</button>'+
      '</div>';
    }).join('');
    card.innerHTML = '<h3>&#128194; Carica analisi salvata</h3><p>Scegli un\'analisi salvata in precedenza. Verr&agrave; ricaricata sostituendo i dati attuali.</p>'+
      '<div class="mx-saves-list">'+rows+'</div>'+
      '<div class="mx-dialog-foot"><button type="button" data-act="dlg-cancel">Chiudi</button></div>';
  }
  $dlg.classList.add('is-open');
  card.querySelectorAll('[data-act="dlg-cancel"]').forEach(function(b){ b.addEventListener('click', function(){ $dlg.classList.remove('is-open'); }); });
  card.querySelectorAll('[data-act="load"]').forEach(function(b){
    b.addEventListener('click', function(){
      var i = parseInt(b.dataset.i, 10);
      var saves2 = loadJSON('mx2::'+CFG.moduleId+'-saves', []);
      var s = saves2[i];
      if (!s) return;
      if (typeof CFG.applyData === 'function'){
        CFG.applyData(s.input);
        $dlg.classList.remove('is-open');
        toast('Analisi caricata: '+s.nome);
      } else {
        alert('Il modulo non supporta il caricamento di dati salvati.');
      }
    });
  });
  card.querySelectorAll('[data-act="del"]').forEach(function(b){
    b.addEventListener('click', function(){
      if (!confirm('Eliminare questo salvataggio?')) return;
      var i = parseInt(b.dataset.i, 10);
      var saves2 = loadJSON('mx2::'+CFG.moduleId+'-saves', []);
      saves2.splice(i, 1);
      saveJSON('mx2::'+CFG.moduleId+'-saves', saves2);
      openLoadDialog();
    });
  });
}

/* =====================================================================
 * DIALOG CONFRONTA, side-by-side con una salvata
 * ===================================================================== */
function openCompareDialog(){
  ensureDialog();
  var saves = loadJSON('mx2::'+CFG.moduleId+'-saves', []);
  var card = document.getElementById('mx-dlg-card');
  if (saves.length === 0){
    card.innerHTML = '<h3>&#9974; Confronta</h3><p>Non ci sono analisi salvate da confrontare. Salva prima un\'analisi (caso d\'uso tipico: ritorno sul cantiere dopo settimane/mesi e confronto T0 vs T1).</p><div class="mx-dialog-foot"><button type="button" class="primary" data-act="dlg-cancel">OK</button></div>';
    $dlg.classList.add('is-open');
    card.querySelector('[data-act="dlg-cancel"]').addEventListener('click', function(){ $dlg.classList.remove('is-open'); });
    return;
  }
  var rows = saves.map(function(s, i){
    return '<div class="mx-save-row">'+
      '<div class="info"><div class="nm">'+esc(s.nome)+'</div><div class="meta">'+fmtDate(s.timestamp)+' '+(new Date(s.timestamp).toTimeString().slice(0,5))+'</div></div>'+
      '<button type="button" class="cmp" data-i="'+i+'" data-act="cmp">Confronta</button>'+
    '</div>';
  }).join('');
  card.innerHTML = '<h3>&#9974; Confronta con analisi precedente</h3><p>Scegli l\'analisi salvata da confrontare con quella corrente.</p>'+
    '<div class="mx-saves-list">'+rows+'</div>'+
    '<div class="mx-dialog-foot"><button type="button" data-act="dlg-cancel">Annulla</button></div>';
  $dlg.classList.add('is-open');
  card.querySelectorAll('[data-act="dlg-cancel"]').forEach(function(b){ b.addEventListener('click', function(){ $dlg.classList.remove('is-open'); }); });
  card.querySelectorAll('[data-act="cmp"]').forEach(function(b){
    b.addEventListener('click', function(){
      var i = parseInt(b.dataset.i, 10);
      var s = saves[i];
      if (!s) return;
      showCompareView(s);
      $dlg.classList.remove('is-open');
    });
  });
}

function showCompareView(savedSnap){
  /* costruisco una vista a 2 colonne: T0 (snapshot) vs T1 (corrente) */
  var curOut = (typeof CFG.getOutput === 'function') ? CFG.getOutput() : null;
  var t0_out = savedSnap.output || {};
  var t1_out = curOut || {};
  var keysT0 = Object.keys(t0_out).filter(function(k){ return typeof t0_out[k] !== 'object' || t0_out[k] === null; });
  var keysT1 = Object.keys(t1_out).filter(function(k){ return typeof t1_out[k] !== 'object' || t1_out[k] === null; });
  var allKeys = Array.from(new Set(keysT0.concat(keysT1)));
  var rows = allKeys.map(function(k){
    var v0 = t0_out[k]; var v1 = t1_out[k];
    var diff = '';
    if (typeof v0 === 'number' && typeof v1 === 'number'){
      var d = v1 - v0;
      diff = (d>=0?'+':'')+d.toFixed(3);
    } else if (v0 === v1){
      diff = 'invariato';
    } else {
      diff = 'modificato';
    }
    return '<tr><td><b>'+esc(k)+'</b></td><td>'+esc(String(v0!=null?v0:'n.d.'))+'</td><td>'+esc(String(v1!=null?v1:'n.d.'))+'</td><td>'+esc(diff)+'</td></tr>';
  }).join('');
  ensureModal();
  var sel = {};
  if (CFG.defaultSections) Object.keys(CFG.defaultSections).forEach(function(k){ sel[k] = CFG.defaultSections[k].on; });
  var doc = '<div class="mx-doc">'+
    buildDocHead({ titolo: 'Confronto: '+esc(savedSnap.nome)+' vs analisi attuale', note:'' })+
    '<h2>Confronto T0 vs T1</h2>'+
    '<p><strong>T0 (salvata):</strong> '+esc(savedSnap.nome)+' &middot; '+fmtDate(savedSnap.timestamp)+'<br>'+
    '<strong>T1 (corrente):</strong> '+fmtNow()+'</p>'+
    '<table>'+
      '<thead><tr><th>Grandezza</th><th>T0 (precedente)</th><th>T1 (attuale)</th><th>Differenza</th></tr></thead>'+
      '<tbody>'+rows+'</tbody>'+
    '</table>'+
    '<div class="mx-doc-note">Il confronto evidenzia le variazioni tra il sopralluogo precedente e quello attuale. Utile per documentare evoluzioni nel tempo (efficacia di interventi, peggioramenti, monitoraggi temporali).</div>'+
    buildDocFooter()+
    '</div>';
  document.getElementById('mx-preview').innerHTML = doc;
  document.getElementById('mx-modal-title').textContent = 'Confronto T0 vs T1';
  /* nascondo sezioni-side perché in confronto non hanno senso */
  document.getElementById('mx-sections').innerHTML = '<div style="font-size:12px;color:#8b7355;font-style:italic">Modalità Confronto: le sezioni opzionali sono disabilitate.</div>';
  document.getElementById('mx-note').value = 'Confronto con: '+savedSnap.nome;
  $modal.classList.add('is-open');
}

/* =====================================================================
 * RESET, chiede conferma e chiama callback del modulo
 * ===================================================================== */
function doReset(){
  if (typeof CFG.onReset === 'function'){
    CFG.onReset();
  }
}

/* =====================================================================
 * BUILD TOOLBAR DOM
 * ===================================================================== */
function buildToolbar(){
  if (document.querySelector('.mx-toolbar')) return;
  var bar = document.createElement('div');
  bar.className = 'mx-toolbar';
  bar.classList.add('needs-result');
  bar.innerHTML = ''+
    '<div class="mx-toolbar-hint">&#9432; Esegui il calcolo per attivare i pulsanti di salvataggio ed esportazione</div>'+
    '<div class="mx-toolbar-inner">'+
      '<button type="button" class="mx-tb-btn tb-save"    data-act="save"    data-needs="result"><span class="ico">&#128190;</span><span class="label">Salva</span></button>'+
      '<button type="button" class="mx-tb-btn tb-load"    data-act="load"><span class="ico">&#128194;</span><span class="label">Carica</span></button>'+
      '<button type="button" class="mx-tb-btn tb-compare" data-act="compare" data-needs="result"><span class="ico">&#9974;</span><span class="label">Confronta</span></button>'+
      '<button type="button" class="mx-tb-btn tb-word"    data-act="word"    data-needs="result"><span class="ico">&#128221;</span><span class="label">Word</span></button>'+
      '<button type="button" class="mx-tb-btn tb-pdf"     data-act="pdf"     data-needs="result"><span class="ico">&#128196;</span><span class="label">PDF</span></button>'+
      '<button type="button" class="mx-tb-btn tb-report"  data-act="report"  data-needs="result"><span class="ico">&#128230;</span><span class="label">Al report</span></button>'+
      '<button type="button" class="mx-tb-btn tb-reset"   data-act="reset"><span class="ico">&#8634;</span><span class="label">Reset</span></button>'+
    '</div>';
  document.body.appendChild(bar);
  document.body.classList.add('mx-has-toolbar');
  bar.addEventListener('click', function(ev){
    var el = ev.target.closest('[data-act]');
    if (!el) return;
    var act = el.dataset.act;
    /* Per esporre Word/PDF/Report apre il modal anteprima */
    /* Blocca azioni che richiedono lastResult quando non c'è */
    var needs = el.dataset.needs;
    if (needs === 'result' && bar.classList.contains('needs-result')){
      toast('Esegui prima il calcolo per usare questa funzione');
      return;
    }
    if (act === 'word' || act === 'pdf' || act === 'report'){
      openModal();
    } else if (act === 'save'){
      openSaveDialog();
    } else if (act === 'load'){
      openLoadDialog();
    } else if (act === 'compare'){
      openCompareDialog();
    } else if (act === 'reset'){
      if (confirm('Sicuro di voler azzerare l\'analisi corrente?')) doReset();
    }
  });
}

/* =====================================================================
 * API PUBBLICA: initToolbar(config) + setActive(bool)
 * ===================================================================== */
/* 19/11/2026: porta d'ingresso per «Apri snapshot»: rimette nel modulo i dati d'ingresso di un file esportato,
   per la stessa strada del tasto «Carica». Risponde 'ok', 'altro' (file di un altro modulo) oppure 'no'. */
MX.applyData = function(input, moduleId){
  if (!CFG || typeof CFG.applyData !== 'function') return 'no';
  if (moduleId && CFG.moduleId && String(moduleId) !== String(CFG.moduleId)) return 'altro';
  CFG.applyData(input);
  return 'ok';
};
MX.initToolbar = function(config){
  CFG = Object.assign({
    moduleId: 'modulo',
    moduleName: 'Modulo',
    moduleColor: '#2c5d7c',
    defaultSections: {},
    getInput: function(){ return null; },
    getOutput: function(){ return null; },
    getSvgHTML: function(){ return null; },
    getDocSections: function(){ return ''; },
    applyData: function(){},
    onReset: function(){}
  }, config || {});
  buildToolbar();
};

MX.toolbarActive = function(active){
  var bar = document.querySelector('.mx-toolbar');
  if (!bar) return;
  if (active){
    bar.classList.add('is-active');
    bar.classList.remove('needs-result');
  } else {
    bar.classList.remove('is-active');
    bar.classList.add('needs-result');
  }
};

/* Esporto helper toast */
MX.toast = toast;
})();
