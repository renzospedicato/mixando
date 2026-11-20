/* Mixando - Sala Patologie : dataset canonico 23 patologie (unione tracciata)
    norme[] verbatim da mappa-indagini PROBE_CATEGORY_HANDLERS[id].norms
    label, colore, sub da _CAT_META + soluzioni-risanamento PATOLOGIE_UI
    module = solo nome file; la sala antepone il percorso a runtime
    Generato 2026-06-07. Rigenerare dalle fonti, non editare a mano. */
window.MIXANDO_PATOLOGIE = [
  {id:"risalita", label:"Umidità di risalita", sub:"Umidità ascendente dal terreno per capillarità", gruppo:"Acqua e umidità", color:"#2980b9", colorStrong:"#1f5d8c", module:"risalita.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: ['<b>UNI EN 16682:2017</b> (metodi misura umidità BC)','<b>WTA 2-9-20/D</b> (Sanierputzsysteme 2020)','UNI 11085:2003 (gravimetria 6 carote)','UNI 11087:2003 (sali murature)','UNI 11121:2004 (carburo di calcio)','UNI 11150-3:2005 (attività diagnostiche edifici esistenti)','Hall&Hoff 2007 Proc.R.Soc.A 463:1871-1884','BRE Digest 245','ASTM D4944 (metodo al carburo)']},
  {id:"infiltrazione", label:"Infiltrazioni d'acqua", sub:"Ingresso d'acqua meteorica o accidentale", gruppo:"Acqua e umidità", color:"#1F4E79", colorStrong:"#163551", module:"infiltrazioni.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: ['<b>BS 8102:2022</b> (protection below ground)','<b>EN 16302:2013</b> (Karsten tube)','UNI 11085:2003 (gravimetria 6 carote)','UNI EN 16682:2017 (metodi misura umidità)','BS 6576:2005 (risalita esclusione)','BS 8104:1992 (WDR)','UNI EN 12865:2003 (battente pioggia facciate)','WTA 4-5-99/D (umidità di costruzione)','BRE Digest 245','RILEM TC 25-PEM Method II.4 (soglia Karsten)']},
  {id:"condensa", label:"Condensa (superficiale + Glaser)", sub:"Condensa superficiale e interstiziale", gruppo:"Acqua e umidità", color:"#6a3d8c", colorStrong:"#4c2c64", module:"condensa-glaser.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: ['<b>UNI EN ISO 13788:2013</b> §5 (superficiale + microbica) e §6 (Glaser interstiziale)','<b>UNI EN ISO 7726:2026</b> (strumenti)','<b>UNI EN ISO 6946:2018</b> (resistenze termiche)','<b>D.M. 26/06/2015</b> + <b>D.M. 28/10/2025</b> (requisiti minimi · DM 2025 in vigore dal 03/06/2026)','D.P.R. 412/1993 (zone climatiche per gradi-giorno)','UNI EN 15026:2023 (dinamico opzionale)']},
  {id:"vapore", label:"Vapore acqueo", sub:"Diffusione del vapore (UNI EN ISO 13788 §5)", gruppo:"Acqua e umidità", color:"#5b8db8", colorStrong:"#3d6a8f", module:"condensa-glaser.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: [
      '<b>UNI EN ISO 13788:2013</b> §5 (umidità superficiale critica · UR sup ≥ 80%) e §6 (Glaser · condensa interstiziale)',
      '<b>WHO Guidelines Dampness and Mould 2009</b> (UR superficiale prolungata · rischio biologico)',
      'Sedlbauer 2001 (LIM · isoplete di germinazione muffe per UR sup/durata)',
      'UNI EN 15026:2023 (simulazione igrotermica dinamica · approfondimento opzionale)'
    ]},
  {id:"percolazione", label:"Percolazione di liquidi", sub:"Oli, idrocarburi, vernici", gruppo:"Acqua e umidità", color:"#5a4030", colorStrong:"#3a261d", module:null, fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: [
      'Categoria empirica (nomenclatura osservazionale · nessuna norma UNI specifica per la forma)',
      'Per idrocarburi / contaminazione: D.Lgs 152/2006 (Testo Unico Ambientale, Parte IV)'
    ]},
  {id:"sali", label:"Sali nelle murature", sub:"Efflorescenze e subflorescenze saline (WTA)", gruppo:"Sali e biologico", color:"#d4a017", colorStrong:"#9a7510", module:"sali.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: ['<b>UNI EN 16455:2014</b> (estrazione e analisi ioni)','<b>WTA 3-13:2019/D</b> (desalinizzazione mediante impacchi · ed. dic.2019)','<b>WTA 2-9-20/D</b> (intonaci da risanamento 2020)','UNI 11176:2025','UNI 11182:2006 (vocabolario alterazione)','UNI 11087:2003 (sali murature)','UNI 11488:2021 (malte da restauro)','EN 12370 (test cristallizzazione Na₂SO₄)','UNI EN 998-1 (malte da risanamento, classe R)','Doehne&Price 2010','Greenspan 1977 NIST (rhEq sali)']},
  {id:"biodeteriogeni", label:"Muffe / Biodeteriogeni", sub:"Muffe, funghi e attacco microbico", gruppo:"Sali e biologico", color:"#558b2f", colorStrong:"#3a6020", module:"biodeteriogeni.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: ['<b>UNI 11182:2006</b> (vocabolario alterazione)','<b>WHO 2009 Dampness/Mould</b>','<b>ISO 16000-19:2012</b> (sampling moulds)','<b>LIM Sedlbauer 2001</b>','<b>VTT Hukka-Viitanen 1999</b>']},
  {id:"patina-bio", label:"Patina biologica (alghe/licheni)", sub:"Alghe, licheni, briofite", gruppo:"Sali e biologico", color:"#3d6a3a", colorStrong:"#274522", module:"biodeteriogeni.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: [
      '<b>UNI 11182:2006</b> (Beni culturali · patina biologica · forme di alterazione)',
      '<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (Biological colonization: algae, lichen, moss)'
    ]},
  {id:"annerimento", label:"Annerimento / croste nere", sub:"Croste nere gessose (CaSO₄·2H₂O da SO₂)", gruppo:"Sali e biologico", color:"#3a3a35", colorStrong:"#1e1e1c", module:null, fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: [
      '<b>UNI 11182:2006</b> (Beni culturali · crosta nera, deposito superficiale · forme di alterazione)',
      '<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (Discoloration & deposit: black crust, soiling)'
    ]},
  {id:"radon", label:"Gas Radon", sub:"Gas radioattivo dal sottosuolo (D.Lgs 101/2020)", gruppo:"Aria e clima", color:"#B89220", colorStrong:"#866916", module:"radon.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: ['<b>D.Lgs 101/2020</b> (300 esistenti / 200 nuove post-2024 / 300 lavoro)','<b>D.Lgs 203/2022</b> (modifiche)','<b>Direttiva 2013/59/Euratom</b>','<b>ANSI/AARST MAH-2023</b> (misura in abitazioni)','<b>ICRP Publication 137</b> (17 nSv per Bq·h·m⁻³)','ISO 11665 (metodologia misura)','WHO Handbook Indoor Radon 2009 (ALARA 100 Bq/m³)','Piano Nazionale Radon 2023-2032 (Gazz.Uff. 21/02/2024)','Darby et al. 2005 BMJ 330:223 (rischio +16%/100 Bq/m³)','<b>DGR Lombardia XII/5469 del 09/12/2025</b> (Linee guida radon 2ª ed. · BURL 19/12/2025)','DGR Lombardia XII/3866 del 03/02/2025 (Ge.R.I. servizio telematico dosimetrie)']},
  {id:"iaq", label:"Qualità aria indoor (IAQ)", sub:"9 parametri WHO/UNI (CO₂, PM, TVOC…)", gruppo:"Aria e clima", color:"#1F8AA8", colorStrong:"#155f73", module:"iaq.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: ['<b>UNI EN 16798-1:2019/NA:2025</b> (ventilazione + cat. I-IV)','<b>WHO Global Air Quality Guidelines 2021</b>','<b>WHO IAQ Guidelines 2010</b> (HCHO/NO₂/benzene)','WHO Dampness/Mould 2009','ANSI/ASHRAE 62.1-2022','D.Lgs 81/2008 All. XXXVIII (TLV lavoro)','Circ. Min. Salute 2010 (CO₂ scuole ≤1400 ppm)','UNI EN ISO 16000 serie (campionamento)','UNI EN ISO 7726:2026 (strumenti misura ambiente termico)','UNI EN ISO 13788:2013 App. E (Magnus-Tetens)','IARC Vol. 100F (HCHO/benzene Gruppo 1)','Legge 257/92 (amianto)','DGR Lombardia XII/5469/2025 (linee guida radon indoor · cross-ref IAQ)']},
  {id:"termoigrometria", label:"Escursioni termoigrometriche", sub:"Td, UR critica, soglia muffa (LIM)", gruppo:"Aria e clima", color:"#c0392b", colorStrong:"#8a2719", module:"termoigrometria.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: ['<b>UNI EN ISO 7726:2026</b> (strumenti misura grandezze fisiche)','<b>UNI EN ISO 7730:2026</b> (comfort termico PMV/PPD · cat. I-IV)','<b>UNI EN ISO 13788:2013 App. E</b> (Magnus-Tetens)','<b>ASHRAE Handbook Fundamentals 2025</b> Cap. 1 Psicrometria','Sedlbauer 2001 (LIM)','Hukka-Viitanen 1999 (VTT M-Index)','D.M. 26/06/2015 (Requisiti minimi)','UNI EN ISO 6781-1:2023 (termografia involucri edilizi · sostituisce UNI EN 13187:2000 (ritirata 2023, oggi UNI EN ISO 6781-1:2023))']},
  {id:"microclima", label:"Microclima beni culturali", sub:"Range T/UR per beni culturali (UNI 10829)", gruppo:"Aria e clima", color:"#693C7A", colorStrong:"#4a2b56", module:"microclima-bc.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: ['<b>UNI 10829:1999</b> (raccomandazioni T/UR categorie materiali BC)','<b>UNI EN 15757:2010</b> (STF + pattern stagionale storico)','<b>UNI EN 16893:2018</b> (specifiche edifici/locali storage BC)','UNI EN 16242:2013 (misura umidità BC)','UNI EN 16095:2012 (condition recording patrimonio mobile)','UNI EN 16790:2016 (IPM integrated pest management)','UNI EN 17820:2023 (gestione collezioni patrimonio culturale mobile)','UNI 11182:2006 (vocabolario alterazione)','UNI EN ISO 7726:2026 (strumenti misura ambiente termico)','UNI EN ISO 13788:2013 App. E (Magnus-Tetens)','ISO 11799:2015 (archive/library storage)','ISO 18920:2011 + 18923:2000 (fotografia)','CIE 157 (illuminazione BC)','D.Lgs 42/2004 (Codice Beni Culturali)','ASHRAE Handbook Cap. 24 (Museums)','Camuffo 2014 Microclimate for Cultural Heritage']},
  {id:"vespai", label:"Tenuta aria / Vespai aerati", sub:"Aerazione fondazioni e tenuta all'aria", gruppo:"Aria e clima", color:"#5C4128", colorStrong:"#3f2c1b", module:"vespai.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: ['<b>UNI EN ISO 9972:2015</b> (Blower Door, permeabilità aria)','<b>DGR Lombardia n.25596 del 29/05/1989</b> (Reg. Locale Igiene tipo · A/200 perimetrale e A/100 grigliata)','<b>Linee guida ARPAT Toscana</b> (1500 mm²/m perimetro per radon)','UNI 11150-3:2005 (attività diagnostiche edifici esistenti)','UNI EN ISO 13370:2018 (trasferimento calore tramite terreno)','UNI 11673-1:2017 (posa serramenti)','UNI EN 12207:2017 (permeabilità aria serramenti)','D.Lgs 101/2020 (radon)','ISO 11665-4:2021 (radon misura integrata)','BRE BR 211 (UK best practice)','ANSI/AARST CCAH-2020 (SSD radon)','DGR Lombardia XI/695/2018 (Regolamento Edilizio Tipo · sostituisce/integra RLI tipo 1989)','DGR Lombardia XII/5469/2025 (vespai aerati come mitigazione radon · BURL 19/12/2025)']},
  {id:"ponte-termico", label:"Ponte termico", sub:"Dispersione localizzata · rischio condensa (fRsi)", gruppo:"Termico e superfici", color:"#e67e22", colorStrong:"#a85c15", module:"termo-neon.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: ['<b>UNI EN ISO 10211:2018</b> (calcolo dettagliato 2D/3D)','<b>UNI EN ISO 14683:2018</b> Annex A (atlante ψ default)','<b>UNI EN ISO 13788:2013</b> §5 (fRsi e condensa superficiale)','<b>UNI EN ISO 6781-1:2023</b> (termografia involucri · sostituisce UNI EN 13187:2000 (ritirata 2023, oggi UNI EN ISO 6781-1:2023))','<b>UNI EN ISO 9712:2022</b> (qualifica NDT incl. termografia · I/II/III)','UNI EN 16714 serie (termografia edilizia)','UNI EN ISO 7726:2026 (strumenti misura ambiente termico)','UNI EN ISO 6946:2018 (resistenze termiche)','D.M. 26/06/2015 Requisiti minimi (zone clim. + fRsi,min)','D.Lgs 192/2005 e ss.mm.ii. (risparmio energetico)']},
  {id:"distacchi", label:"Distacchi d'intonaco", sub:"Distacco/scaglie d'intonaco dal supporto", gruppo:"Termico e superfici", color:"#a08060", colorStrong:"#705840", module:null, fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: [
      '<b>UNI 11182:2006</b> (Beni culturali · forme di alterazione: distacco, scagliatura/scaling, esfoliazione, disgregazione, polverizzazione)',
      '<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (famiglia "Detachment": blistering, delamination/scaling, peeling, granular disintegration)',
      'UNI 11176:2025 (descrizione petrografica di malta/intonaco · caratterizzazione del supporto)'
    ]},
  {id:"degrado", label:"Degrado materico", sub:"Erosione / decoesione materica", gruppo:"Termico e superfici", color:"#7f6f5a", colorStrong:"#544938", module:null, fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: [
      '<b>UNI 11182:2006</b> (Beni culturali · forme di alterazione/degradazione: erosione, decoesione, mancanza, alveolizzazione)',
      '<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (Material loss: erosion, granular disintegration, pitting, alveolization)'
    ]},
  {id:"corrosioni", label:"Corrosioni dei metalli", sub:"Ruggine, rame, piombo (UNI EN ISO 8044)", gruppo:"Termico e superfici", color:"#a04020", colorStrong:"#702810", module:null, fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: [
      '<b>UNI EN ISO 8044:2020</b> (corrosione di metalli e leghe · termini e definizioni)',
      '<b>UNI EN ISO 12944-2</b> (protezione dalla corrosione · classi di corrosività atmosferica C1-CX)',
      'UNI 11182:2006 (forma di alterazione su supporti di beni culturali)'
    ]},
  {id:"fessurazioni", label:"Quadri fessurativi", sub:"Lesioni: tipo · cinematismo · gravità", gruppo:"Strutture", color:"#34495e", colorStrong:"#1f2d3a", module:"fessurazioni.html", fonte:"mappa-indagini PROBE_CATEGORY_HANDLERS",
   norme: [
      '<b>BRE Digest 251:1995</b> (Assessment of damage in low-rise buildings · categorie danno 0-5 da ampiezza)',
      '<b>NTC 2018</b> (D.M. 17/01/2018) §8 + Circ. n.7/2019 §C8 (valutazione sicurezza murature esistenti, quadri fessurativi)',
      'UNI EN 1996-1-1 (Eurocodice 6 · murature)',
      'UNI EN 1992-1-1 (Eurocodice 2 §7.3 · controllo fessurazione c.a., w_max 0,3-0,4 mm)'
    ]},
  {id:"mur", label:"Murature / Acciaio", sub:"Scuci-cuci, CRM, tiranti, EN 12944", gruppo:"Strutture", color:"#a85332", colorStrong:"#7c3a20", module:null, fonte:"soluzioni-risanamento PATOLOGIE_UI",
   norme: []},
  {id:"cls", label:"Calcestruzzo armato", sub:"Prove cls · UNI EN 1504, FRP, realcalinizzazione", gruppo:"Strutture", color:"#475569", colorStrong:"#2e3a4c", module:null, fonte:"soluzioni-risanamento PATOLOGIE_UI",
   norme: []},
  {id:"legno", label:"Degrado del legno", sub:"Preservanti EN 599-1, termo-trattamento", gruppo:"Strutture", color:"#7c4e25", colorStrong:"#5a371a", module:null, fonte:"soluzioni-risanamento PATOLOGIE_UI",
   norme: []},
  {id:"geo", label:"Geotecnica / Falda", sub:"Drenaggio, micropali, jet grouting", gruppo:"Strutture", color:"#6b4423", colorStrong:"#3e2a14", module:null, fonte:"soluzioni-risanamento PATOLOGIE_UI",
   norme: []},
  /* === Forme di degrado UNI 11182:2006 (clausola 3, lette dalla fonte primaria · aggiunte 2026-06-21) === */
  {id:"alveolizzazione", label:"Alveolizzazione", sub:"Cavità (alveoli) di forma e dimensioni variabili", gruppo:"Forme di degrado (UNI 11182)", color:"#8a7d63", colorStrong:"#5e553f", module:null, fonte:"UNI 11182:2006 §3.2 (fonte primaria, verifica 2026-06-21)",
   norme: ['<b>UNI 11182:2006</b> §3.2 (alveolizzazione · cavità dette alveoli, spesso interconnesse, distribuzione non uniforme)','<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (Alveolization)']},
  {id:"deformazione", label:"Deformazione", sub:"Variazione di sagoma sull'intero spessore", gruppo:"Forme di degrado (UNI 11182)", color:"#6e6f73", colorStrong:"#47484b", module:null, fonte:"UNI 11182:2006 §3.6 (fonte primaria, verifica 2026-06-21)",
   norme: ['<b>UNI 11182:2006</b> §3.6 (deformazione · variazione della sagoma o della forma che interessa tutto lo spessore)','<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (Deformation)']},
  {id:"degradazione-diff", label:"Degradazione differenziale", sub:"Perdita di materiale che evidenzia la struttura", gruppo:"Forme di degrado (UNI 11182)", color:"#9a8a6e", colorStrong:"#6b5f49", module:null, fonte:"UNI 11182:2006 §3.7 (fonte primaria, verifica 2026-06-21)",
   norme: ['<b>UNI 11182:2006</b> §3.7 (degradazione differenziale · perdita di materiale dalla superficie che evidenzia eterogeneità del materiale o della struttura)']},
  {id:"deposito-sup", label:"Deposito superficiale", sub:"Accumulo di materiali estranei poco aderenti", gruppo:"Forme di degrado (UNI 11182)", color:"#8c8270", colorStrong:"#5d564a", module:null, fonte:"UNI 11182:2006 §3.8 (fonte primaria, verifica 2026-06-21)",
   norme: ['<b>UNI 11182:2006</b> §3.8 (deposito superficiale · accumulo di materiali estranei di varia natura, quali polvere e terriccio)','<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (Deposit · soiling)']},
  {id:"disgregazione", label:"Disgregazione", sub:"Decoesione con caduta in polvere o frammenti", gruppo:"Forme di degrado (UNI 11182)", color:"#b09a72", colorStrong:"#7a6a4e", module:null, fonte:"UNI 11182:2006 §3.9 (fonte primaria, verifica 2026-06-21)",
   norme: ['<b>UNI 11182:2006</b> §3.9 (disgregazione · decoesione con caduta del materiale sotto forma di polvere o minutissimi frammenti)','<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (Granular disintegration)']},
  {id:"esfoliazione", label:"Esfoliazione", sub:"Porzioni laminari sottili e parallele (sfoglie)", gruppo:"Forme di degrado (UNI 11182)", color:"#b9a888", colorStrong:"#80735c", module:null, fonte:"UNI 11182:2006 §3.13 (fonte primaria, verifica 2026-06-21)",
   norme: ['<b>UNI 11182:2006</b> §3.13 (esfoliazione · porzioni laminari di spessore molto ridotto e parallele alla superficie)','<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (Exfoliation)']},
  {id:"incrostazione", label:"Incrostazione", sub:"Deposito stratiforme compatto e aderente", gruppo:"Forme di degrado (UNI 11182)", color:"#b8b29c", colorStrong:"#7f7a68", module:null, fonte:"UNI 11182:2006 §3.17 (fonte primaria, verifica 2026-06-21)",
   norme: ['<b>UNI 11182:2006</b> §3.17 (incrostazione · deposito stratiforme compatto e generalmente aderente al substrato)','<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (Encrustation)']},
  {id:"lacuna", label:"Lacuna", sub:"Perdita di continuità di superfici (intonaco/dipinto)", gruppo:"Forme di degrado (UNI 11182)", color:"#b07a55", colorStrong:"#7a5239", module:null, fonte:"UNI 11182:2006 §3.18 (fonte primaria, verifica 2026-06-21)",
   norme: ['<b>UNI 11182:2006</b> §3.18 (lacuna · perdita di continuità di superfici, come parte di un intonaco o di un dipinto)']},
  {id:"mancanza", label:"Mancanza", sub:"Perdita di elementi tridimensionali", gruppo:"Forme di degrado (UNI 11182)", color:"#6b5f4e", colorStrong:"#453d31", module:null, fonte:"UNI 11182:2006 §3.20 (fonte primaria, verifica 2026-06-21)",
   norme: ['<b>UNI 11182:2006</b> §3.20 (mancanza · perdita di elementi tridimensionali, come uno spigolo o una modanatura)','<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (Missing part)']},
  {id:"pitting", label:"Pitting", sub:"Fori ciechi numerosi e ravvicinati", gruppo:"Forme di degrado (UNI 11182)", color:"#9d8f73", colorStrong:"#6c6151", module:null, fonte:"UNI 11182:2006 §3.24 (fonte primaria, verifica 2026-06-21)",
   norme: ['<b>UNI 11182:2006</b> §3.24 (pitting · formazione di fori ciechi, numerosi e ravvicinati)','<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (Pitting)']},
  {id:"vegetazione", label:"Presenza di vegetazione", sub:"Individui erbacei, arbustivi o arborei", gruppo:"Forme di degrado (UNI 11182)", color:"#4e7a3a", colorStrong:"#345226", module:null, fonte:"UNI 11182:2006 §3.25 (fonte primaria, verifica 2026-06-21)",
   norme: ['<b>UNI 11182:2006</b> §3.25 (presenza di vegetazione · individui erbacei, arbustivi o arborei)','<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (Plants)']},
  {id:"rigonfiamento", label:"Rigonfiamento", sub:"Sollevamento superficiale localizzato", gruppo:"Forme di degrado (UNI 11182)", color:"#c2b496", colorStrong:"#867c68", module:null, fonte:"UNI 11182:2006 §3.26 (fonte primaria, verifica 2026-06-21)",
   norme: ['<b>UNI 11182:2006</b> §3.26 (rigonfiamento · sollevamento superficiale localizzato del materiale)','<b>ICOMOS-ISCS Illustrated Glossary 2008</b> (Bulging)']},
  {id:"acustica", label:"Acustica in edilizia", sub:"Requisiti acustici passivi (DPCM 5/12/1997 · UNI 11367)", gruppo:"Aria e clima", color:"#34699e", colorStrong:"#234a6b", module:"acustica.html", fonte:"soluzioni-risanamento PATOLOGIE_UI + modulo acustica.html",
   norme: ["<b>DPCM 5/12/1997</b> (requisiti acustici passivi · R'w, D2m,nT,w, L'n,w, LASmax, LAeq)",'<b>UNI 11367:2023</b> (classificazione acustica delle unità immobiliari)','<b>UNI EN ISO 16283</b> serie + <b>UNI EN ISO 717</b> (misura in opera e descrittori)','<b>UNI EN 12354</b> + <b>UNI/TR 11175</b> (stima previsionale · legge di massa)','CAM DM 23/06/2022 (classe acustica &ge; II)']},
];
