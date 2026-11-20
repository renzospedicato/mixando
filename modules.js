/* =====================================================================
 * Mixando Suite v2 · Manifest dei moduli
 * ===================================================================== */

window.MIXANDO_MODULES = [

  /* CANTIERE */
  {id:"locali-cantiere", label:"Dati del Cantiere", sub:"Perito · Committente · Contesto · Sopralluogo", desc:"Anagrafica perito (PF/PG, multi-perito), committente (PF/PG), contesto normativo regionale (radon DB 20 regioni + norme cogenti), scheda sopralluogo con GPS, meteo, falda. La gestione dei locali avviene nei moduli diagnostici.", icon:"🏗", color:"#27ae60", file:"locali-cantiere.html", category:"cantiere"},
  {id:"cantieri", label:"Cantieri · Pianificazione", sub:"Attività e scadenze", desc:"Pianifica le attività del cantiere: sopralluoghi, campionamenti, consegne.", icon:"📋", color:"#8e44ad", file:"cantieri.html", category:"cantiere"},
  {id:"foto-triage", label:"Foto & Triage rapido", sub:"Galleria con classificazione", desc:"Carica le foto del sopralluogo, taggale per categoria e aggiungi didascalie.", icon:"📷", color:"#e67e22", file:"foto-triage.html", category:"cantiere"},
  {id:"mappa-indagini", label:"Mappa Indagini · Piantina 3D + Marker", sub:"Carica pianta → disegna muri → 3D automatico", desc:"App Mixando per il rilievo indagini su planimetria. Workflow: carichi planimetria → modalità Muri (clic start + clic end di ogni muro) → il 3D si aggiorna in tempo reale con i muri estrusi alla loro altezza reale. Marker indagini posizionabili per stanza con 14 categorie patologie. Snapshot al Report con esclusione granulare. Grafica Mixando nativa, toolbar 8 pulsanti standard.", icon:"🗺", color:"#0e7c87", file:"mappa-indagini.html", category:"cantiere"},

  /* DIAGNOSTICA */
  {id:"umidita-hub", label:"Umidità · Diagnosi differenziale", sub:"Hub di smistamento", desc:"8 marker discriminanti per separare risalita, infiltrazioni, condensa, sali.", icon:"💧", color:"#1F4E55", file:"umidita-hub.html", category:"diagnostica"},
  {id:"risalita", label:"Diagnosi Risalita Capillare", sub:"Profilo gravimetrico + marker", desc:"Profilo UR vs altezza, marker, scoring per confermare o escludere la risalita.", icon:"💧", color:"#2980b9", file:"risalita.html", category:"diagnostica"},
  {id:"infiltrazioni", label:"Infiltrazioni d'Acqua", sub:"9 marker + scoring", desc:"Wizard 9 step pieno: ambiente, localizzazione, costruzione 7 sottoblocchi (copertura/pluviali/serramenti/terrazzi/controterra/facciata/impianti), gravimetria 6 carote, Karsten EN 16302, 4 esclusioni. BS 8102.", icon:"💦", color:"#1F4E79", file:"infiltrazioni.html", category:"diagnostica"},
  {id:"sali", label:"Sali nelle Murature", sub:"Analisi ionica WTA", desc:"DB 19 sali (Doehne-Price 2010) con UR equilibrio, distruttività, fieldTip cantiere. Filtraggio automatico da test ionici. WTA 2-9-20/D.", icon:'<svg viewBox="0 0 24 24" style="width:1.25em;height:1.25em;vertical-align:-.22em" xmlns="http://www.w3.org/2000/svg"><polygon points="6,9 8.4,12 8.4,21.5 3.6,21.5 3.6,12" fill="#bbe7f5" stroke="#16424b" stroke-width="1.05" stroke-linejoin="round"/><line x1="6" y1="9" x2="6" y2="21.5" stroke="#16424b" stroke-width=".85"/><polygon points="18.5,6.5 21,10 21,21.5 16,21.5 16,10" fill="#bbe7f5" stroke="#16424b" stroke-width="1.05" stroke-linejoin="round"/><polyline points="16,10 18.5,11.4 21,10" fill="none" stroke="#16424b" stroke-width=".8" stroke-linejoin="round"/><line x1="18.5" y1="6.5" x2="18.5" y2="21.5" stroke="#16424b" stroke-width=".85"/><polygon points="12,2.5 15.4,7.5 15.4,21.5 8.6,21.5 8.6,7.5" fill="#a9dff0" stroke="#16424b" stroke-width="1.1" stroke-linejoin="round"/><polygon points="8.6,7.5 12,9.2 12,21.5 8.6,21.5" fill="#cdeffb"/><polyline points="8.6,7.5 12,9.2 15.4,7.5" fill="none" stroke="#16424b" stroke-width=".85" stroke-linejoin="round"/><line x1="12" y1="2.5" x2="12" y2="9.2" stroke="#16424b" stroke-width=".85"/></svg>', color:"#d4a017", file:"sali.html", category:"diagnostica"},
  {id:"biodeteriogeni", label:"Biodeteriogeni", sub:"Muffe / alghe / licheni", desc:"DB 12 materiali cat LIM Sedlbauer I/II/III + 3 famiglie fungine (xerofili/mesofili/idrofili) + VTT Hukka-Viitanen. WHO 2009 + UNI 11182.", icon:"🦠", color:"#558b2f", file:"biodeteriogeni.html", category:"diagnostica"},
  {id:"condensa-glaser", label:"Glaser · Condensa interstiziale", sub:"Stratigrafia + verifica", desc:"Calcolo Glaser: U, fRsi, profilo p/p_sat. UNI EN ISO 13788.", icon:"🌡", color:"#6a3d8c", file:"condensa-glaser.html", category:"diagnostica"},
  {id:"termoigrometria", label:"Termoigrometria", sub:"Td, UR critica, LIM", desc:"Magnus-Tetens: punto rugiada, UR superficie, soglia muffa (LIM Sedlbauer).", icon:"📊", color:"#c0392b", file:"termoigrometria.html", category:"diagnostica"},
  {id:"fessurazioni", label:"Quadri Fessurativi", sub:"Lesioni: tipo · cinematismo · gravità", desc:"Screening e documentazione delle lesioni murarie e in c.a.: orientamento, passante/apparente, ampiezza → categoria BRE Digest 251, tipo e cinematismo (compressione/taglio/cedimento), causa probabile e gravità, con escalatori (passante, evoluzione, simmetria, regola 45° c.a. Ingenio). Metodo di rilievo Cusmano + strumenti. Strumento di SCREENING, non perizia strutturale (NTC 2018). Fonti consultabili in VERIFICA-FONTI-FESSURAZIONI.", icon:"🧱", color:"#8d6e63", file:"fessurazioni.html", category:"diagnostica"},

  /* SALUBRITÀ */
  {id:"radon", label:"Gas Radon", sub:"Media annua + dose ICRP", desc:"D.Lgs 101/2020 (300 esistenti / 200 nuove) + dose individuale ICRP Pub. 137.", icon:"☢", color:"#B89220", file:"radon.html", category:"salubrita"},
  {id:"iaq", label:"Qualità aria indoor (IAQ)", sub:"9 parametri WHO/UNI", desc:"CO₂, PM, TVOC, HCHO, T, UR, CO, NO₂ vs soglie WHO 2021 + UNI EN 16798.", icon:"🌬", color:"#1F8AA8", file:"iaq.html", category:"salubrita"},
  {id:"vespai", label:"Vespai aerati", sub:"Aerazione + dimensionamento", desc:"Dimensionamento bocchette: A/100 (Reg. Igiene tipo Lombardia, art. 3.2.6), raccomandazione ARPAT radon, interasse, altezze regionali (FVG, Sicilia).", icon:"🏘", color:"#5C4128", file:"vespai.html", category:"salubrita"},
  {id:"microclima-bc", label:"Microclima beni culturali", sub:"UNI 10829 / EN 15757", desc:"Range T/UR per categoria materiali con intersezione conservativa.", icon:"🏛", color:"#693C7A", file:"microclima-bc.html", category:"salubrita"},
  {id:"acustica", label:"Acustica in edilizia", sub:"DPCM 5/12/1997 · UNI 11367", desc:"Verifica dei requisiti acustici passivi per categoria DPCM 5/12/1997 (R'w, D2m,nT,w, L'n,w, LASmax, LAeq): descrittori da misura in opera (UNI EN ISO 16283/717) o stima previsionale (legge di massa, UNI EN 12354 + UNI/TR 11175). Classe acustica UNI 11367, soglia CAM (classe II), soluzioni di bonifica.", icon:"🔊", color:"#34699e", file:"acustica.html", category:"salubrita"},

  /* TERMOGRAFIA */
  {id:"termo-neon", label:"Termografia · Analisi termogrammi", sub:"Marker + LIM + condensa", desc:"Carica termogramma, posiziona marker, calcolo Td/UR superficie/LIM.", icon:"☀", color:"#00aaff", file:"termo-neon.html", category:"termografia"},
  {id:"consigli-termografia", label:"Trucchi & Consigli", sub:"Guida operativa", desc:"Accorgimenti di campo: ΔT, emissività, riflessi, angolo, palette.", icon:"⚙", color:"#5b86c9", file:"consigli-termografia.html", category:"termografia"},

  /* UMIDITÀ */
  {id:"asciugatura", label:"Asciugatura Muratura", sub:"Stratigrafia + tempi", desc:"Stratigrafia multi-strato DB 20 materiali UNI 10351:2021 con calcolo Sd vapore. Tempi asciugatura Künzel/WTA 6-2-14/E.", icon:"☂", color:"#3f9c92", file:"asciugatura.html", category:"umidita"},

  /* SAPERE */
  {id:"soluzioni-risanamento", label:"Soluzioni di Risanamento", sub:"59 tecniche · 15 patologie · 166 norme", desc:"Catalogo delle tecniche di risanamento normate per ogni patologia edilizia. Per ogni patologia mostra le soluzioni applicabili con principio operativo, norme cardine + secondarie, categoria, invasività, tempistica, indicazioni e limitazioni. Export piano di risanamento Word.", icon:"🛠", color:"#2e7d52", file:"soluzioni-risanamento.html", category:"sapere"},
  {id:"strumenti-diagnostici", label:"Strumenti Diagnostici", sub:"71 strumenti · a norma / complementari", desc:"Catalogo strumenti per TUTTE le patologie Mixando: termografia, georadar, ultrasonici, sonici, sclerometro, SonReb, pacometro, martinetti, penetrometro, igrometria 11 metodi, resistografia, endoscopia, carotaggi, RADON CR-39/EPCC/attivo/soil-gas, MUFFE impatto/filtrazione/Hirst/tape-lift, IAQ NDIR/PID/GC-MS, MICROCLIMA BC datalogger/anemometro/luxmetro-UV, ACUSTICA EDILIZIA fonometro classe 1/calibratore/microfoni/dodecaedro/macchina di calpestio/vibrometri/banco rigidità dinamica s'. Norme UNI/EN/ASTM/ISO/IEC/WTA/BSI/RILEM/ANSI-AARST/CIE verificate.", icon:"🔬", color:"#0e7c87", file:"strumenti-diagnostici.html", category:"sapere"},
  {id:"manuale", label:"Manuale Tecnico", sub:"18 voci · glossario tecnico", desc:"Voci enciclopediche con formule e norme, inclusa l'Acustica, più un glossario tecnico di 46 termini con le fonti.", icon:"📚", color:"#5d6d7e", file:"manuale.html", category:"sapere"},
  {id:"libri", label:"Libri di Bioedilizia", sub:"190 titoli · ISBN e norme verificati", desc:"Riferimenti verificabili (ISBN/DOI/numeri di norma): umidità, sali, acustica, conservazione, IAQ e le opere dell'autore. Norme italiane ed europee aggiornate.", icon:"📖", color:"#a87d5b", file:"libri.html", category:"sapere"},
  {id:"storia", label:"Storia della diagnostica", sub:"Una scheda per tema · fonti verificate", desc:"Le tappe storiche della scienza dietro ogni patologia edilizia, in un solo modulo a schede: Acustica, Termografia, Sali, Risalita, Condensa/Glaser, Muffe, Infiltrazioni, Radon, IAQ, Vespai, Microclima, Cantieri. 12 temi, tappe con le fonti citate, niente invenzioni.", icon:"📜", color:"#34699e", file:"storia.html", category:"sapere"},
  {id:"approfondimenti", label:"Approfondimenti tecnici", sub:"Casi · Frontiere · Scuole · Procedure · Kit", desc:"Approfondimenti per patologia recuperati e ri-verificati: casi studio, frontiere della ricerca, scuole di pensiero, procedure normate e kit strumentali per Glaser, Termo, Sali, Risalita, Radon, Vespai, Infiltrazioni. Una scheda per patologia, fonti citate.", icon:"🔭", color:"#1e6091", file:"approfondimenti.html", category:"sapere"},

  /* SISTEMA */
  {id:"report", label:"Relazione finale", sub:"Aggrega le analisi in 1 Word/PDF", desc:"Combina gli snapshot raccolti da Glaser/Termo/Radon/futuri moduli in una sola perizia. Word, PDF, JSON.", icon:"📦", color:"#f9a825", file:"report.html", category:"sistema"},
  {id:"backup", label:"Backup tecnico", sub:"Esporta / Importa JSON grezzo", desc:"Esporta in JSON tutti i dati locali dei moduli (prefisso mx2::) per backup tecnico.", icon:"💾", color:"#34495e", file:"backup.html", category:"sistema"},
  {id:"strumenti", label:"Strumenti · Calcolatori", sub:"U-R, sd, w%, n", desc:"Calcolatori rapidi: trasmittanza, resistenza, sd vapore, contenuto acqua, ricambi.", icon:"🧰", color:"#16a085", file:"strumenti.html", category:"sistema"}
];

window.MIXANDO_CATEGORIES = [
  {id:"cantiere",    label:"Cantiere",             order:1},
  {id:"diagnostica", label:"Diagnostica",          order:2},
  {id:"salubrita",   label:"Salubrità ambientale", order:3},
  {id:"termografia", label:"Termografia",          order:4},
  {id:"umidita",     label:"Umidità",              order:5},
  {id:"sapere",      label:"Sapere",               order:6},
  {id:"sistema",     label:"Sistema",              order:7}
];
