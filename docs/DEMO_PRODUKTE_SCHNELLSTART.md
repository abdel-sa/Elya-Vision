# 🚀 Demo-Produkte Schnellstart-Anleitung

## Wichtig: So werden Produkte auf der Website sichtbar!

Ihre Website verwendet **Shopify-Kollektionen**, um Produkte anzuzeigen. Damit ein Produkt auf der Website erscheint, **MUSS** es der richtigen Kollektion zugewiesen werden!

---

## 📋 Benötigte Kollektionen

Erstellen Sie zuerst diese Kollektionen in Shopify:

### Schritt 1: Kollektionen erstellen

Gehen Sie zu: **Produkte** → **Kollektionen** → **Kollektion hinzufügen**

---

### Kollektion 1: Bestsellers (Intelligent)

**1. Titel:**
```
Bestsellers
```

**2. Beschreibung:** (optional leer lassen)

**3. Kollektionstyp:**
- ⚪ Manuell
- 🔘 **Intelligent** ← Wählen Sie diese Option!

**4. Bedingungen:** (erscheint nach Auswahl "Intelligent")
- **Bedingung:** Produkt-Tag
- **ist gleich**
- **Wert:** `bestseller`

**5. Veröffentlichung:**
- ☑️ Onlineshop
- ☑️ Point of Sale
- ☑️ Elyavision Headless

**6. Speichern!**

---

### Kollektion 2: Neuheiten (Intelligent)

**Titel:** `Neuheiten` oder `New Arrivals`

**Kollektionstyp:** Intelligent

**Bedingungen:**
- Produkt-Tag **ist gleich** `neu`

---

### Kollektion 3: Sale (Intelligent)

**Titel:** `Sale`

**Kollektionstyp:** Intelligent

**Bedingungen:**
- **Option 1:** Produkt-Tag **ist gleich** `sale`
- **ODER Option 2:** Vergleichspreis **ist gesetzt**

💡 **Tipp:** Nutzen Sie Option 2, dann werden automatisch alle Produkte mit Vergleichspreis als Sale markiert!

---

### Kollektion 4: Damenbrillen (Manuell)

**Titel:** `Damenbrillen` oder `Women`

**Kollektionstyp:** 🔘 **Manuell**

**Produkte hinzufügen:**
- Nach dem Erstellen der Kollektion
- Klicken Sie auf "Produkte suchen" → Wählen Sie alle Damen-Produkte aus
- Oder: Weisen Sie die Kollektion beim Produkt-Erstellen zu

---

### Kollektion 5: Herrenbrillen (Manuell)

**Titel:** `Herrenbrillen` oder `Men`

**Kollektionstyp:** 🔘 **Manuell**

---

### Kollektion 6-10: Stil-Kollektionen (Intelligent)

Erstellen Sie diese Kollektionen **alle mit Typ "Intelligent"**:

| Titel | Tag-Bedingung |
|-------|---------------|
| `Runde Brillen` | Tag **ist gleich** `rund` |
| `Rechteckige Brillen` | Tag **ist gleich** `rechteckig` |
| `Pilotenbrillen` | Tag **ist gleich** `aviator` |
| `Cat-Eye Brillen` | Tag **ist gleich** `cat-eye` |
| `Randlose Brillen` | Tag **ist gleich** `randlos` |

---

## ✅ Checkliste: Alle Kollektionen erstellt?

Nach dem Erstellen sollten Sie diese **10 Kollektionen** haben:

- [ ] **bestsellers** (Intelligent, Tag = `bestseller`)
- [ ] **new-arrivals** (Intelligent, Tag = `neu`)
- [ ] **sale** (Intelligent, Tag = `sale` oder Vergleichspreis gesetzt)
- [ ] **women** (Manuell)
- [ ] **men** (Manuell)
- [ ] **round** (Intelligent, Tag = `rund`)
- [ ] **rectangle** (Intelligent, Tag = `rechteckig`)
- [ ] **aviator** (Intelligent, Tag = `aviator`)
- [ ] **cat-eye** (Intelligent, Tag = `cat-eye`)
- [ ] **rimless** (Intelligent, Tag = `randlos`)

---

## 💡 Wichtig: Intelligente vs. Manuelle Kollektionen

### Intelligent (Empfohlen für die meisten Kollektionen)
- ✅ Produkte werden **automatisch** hinzugefügt
- ✅ Basierend auf **Bedingungen** (Tags, Preis, etc.)
- ✅ **Beispiel:** Alle Produkte mit Tag "rund" → automatisch in "Runde Brillen"
- ✅ **Vorteil:** Einmal einrichten, dann automatisch!

### Manuell
- ⚠️ Produkte müssen **manuell** hinzugefügt werden
- ⚠️ Jedes Produkt einzeln auswählen
- ✅ **Nutzen für:** `women` und `men` Kollektionen

---

## 🎯 Demo-Produkte: Schritt-für-Schritt

### Beispiel 1: Damenbrille (Rund, Gucci)

**1. Produkt erstellen**
- Gehen Sie zu **Produkte** → **Produkt hinzufügen**

**2. Titel**
```
Gucci GG0855 Runde Damenbrille Gold
```

**3. Beschreibung**
```
Elegante runde Damenbrille von Gucci in Gold.

✨ Highlights:
• Premium Metallrahmen
• Hochwertige Gläser
• Handgefertigt in Italien
• Inkl. Original-Etui

📐 Maße:
• Breite: 140mm
• Stegbreite: 16mm
```

**4. Medien**
- Laden Sie mindestens 1-3 Bilder hoch

**5. Preis**
- Preis: `329,00`

**6. Inventar**
- SKU: `GUCCI-GG0855-GLD`
- ☑️ Inventar verfolgen: Ja
- Menge: `5`

**7. Produktorganisation** ⭐ **WICHTIG!**

**Typ:**
```
Brille
```

**Anbieter (Marke):**
```
GUCCI
```

**Kollektionen:** (Mehrfachauswahl!)
```
☑️ women
☑️ round
☑️ bestsellers
```

**Tags:**
```
gucci, damen, rund, gold, brille, luxus, neu
```

**8. Veröffentlichung**
- Status: **Aktiv**
- ☑️ Onlineshop
- ☑️ Elyavision Headless

**9. Speichern!**

---

### Beispiel 2: Herrenbrille (Rechteckig, Tom Ford)

**Titel:**
```
Tom Ford FT5634 Rechteckige Herrenbrille Schwarz
```

**Preis:**
```
459,00
```

**Produktorganisation:**

**Typ:**
```
Brille
```

**Anbieter:**
```
TOM FORD
```

**Kollektionen:**
```
☑️ men
☑️ rectangle
☑️ bestsellers
```

**Tags:**
```
tom-ford, herren, rechteckig, schwarz, brille, luxus
```

---

### Beispiel 3: Sonnenbrille (Aviator, Prada)

**Titel:**
```
Prada PR 50WS Aviator Sonnenbrille Herren
```

**Preis:**
```
389,00
```

**Produktorganisation:**

**Typ:**
```
Sonnenbrille
```

**Anbieter:**
```
PRADA
```

**Kollektionen:**
```
☑️ men
☑️ aviator
☑️ new-arrivals
```

**Tags:**
```
prada, herren, aviator, pilot, sonnenbrille, luxus, neu
```

---

### Beispiel 4: Sale-Produkt (Cat-Eye, Damen)

**Titel:**
```
Miu Miu MU 02WV Cat-Eye Damenbrille Rose
```

**Preis:**
```
199,00
```

**Vergleichspreis:** ⭐
```
299,00
```

**Produktorganisation:**

**Typ:**
```
Brille
```

**Anbieter:**
```
MIU MIU
```

**Kollektionen:**
```
☑️ women
☑️ cat-eye
☑️ sale
```

**Tags:**
```
miu-miu, damen, cat-eye, rose, brille, luxus, sale, rabatt
```

---

## 📊 Vollständige Demo-Produktliste

Erstellen Sie diese **10 Demo-Produkte** für einen vollständigen Test:

### 1. Damen Runde Brille (Gucci)
- **Kollektionen:** `women`, `round`, `bestsellers`
- **Tags:** `gucci, damen, rund, gold`

### 2. Herren Rechteckige Brille (Tom Ford)
- **Kollektionen:** `men`, `rectangle`, `bestsellers`
- **Tags:** `tom-ford, herren, rechteckig, schwarz`

### 3. Herren Aviator Sonnenbrille (Prada)
- **Kollektionen:** `men`, `aviator`, `new-arrivals`
- **Tags:** `prada, herren, aviator, sonnenbrille, neu`

### 4. Damen Cat-Eye Brille (Miu Miu) - SALE
- **Kollektionen:** `women`, `cat-eye`, `sale`
- **Tags:** `miu-miu, damen, cat-eye, sale`
- **Vergleichspreis:** `299,00` → **Preis:** `199,00`

### 5. Herren Randlose Brille (Cartier)
- **Kollektionen:** `men`, `rimless`, `bestsellers`
- **Tags:** `cartier, herren, randlos, luxus`

### 6. Damen Rechteckige Sonnenbrille (Chanel)
- **Kollektionen:** `women`, `rectangle`, `bestsellers`
- **Tags:** `chanel, damen, rechteckig, sonnenbrille`

### 7. Herren Runde Brille (Cazal)
- **Kollektionen:** `men`, `round`, `new-arrivals`
- **Tags:** `cazal, herren, rund, neu`

### 8. Damen Aviator Sonnenbrille (Dita)
- **Kollektionen:** `women`, `aviator`, `new-arrivals`
- **Tags:** `dita, damen, aviator, sonnenbrille, neu`

### 9. Herren Cat-Eye Brille (Bottega Veneta)
- **Kollektionen:** `men`, `cat-eye`, `sale`
- **Tags:** `bottega-veneta, herren, cat-eye, sale`
- **Vergleichspreis:** `450,00` → **Preis:** `320,00`

### 10. Damen Randlose Brille (Celine)
- **Kollektionen:** `women`, `rimless`, `bestsellers`
- **Tags:** `celine, damen, randlos, luxus`

---

## ✅ Checkliste: Produkt richtig anlegen

Für JEDES Produkt prüfen:

- [ ] **Titel** ist aussagekräftig (Marke + Modell + Stil + Kategorie)
- [ ] **Beschreibung** ausgefüllt (min. 50 Wörter)
- [ ] **Mindestens 1 Bild** hochgeladen
- [ ] **Preis** eingegeben
- [ ] **SKU** vergeben (z.B. `GUCCI-GG0855-GLD`)
- [ ] **Inventar verfolgen** aktiviert
- [ ] **Menge** eingegeben (z.B. `5`)
- [ ] **Typ** ausgefüllt (`Brille` oder `Sonnenbrille`)
- [ ] **Anbieter** ausgefüllt (Marke in GROSSBUCHSTABEN)
- [ ] **Kollektionen** zugewiesen (min. 2-3 Kollektionen!)
- [ ] **Tags** hinzugefügt (min. 5 Tags)
- [ ] **Status** auf "Aktiv" gesetzt
- [ ] **Veröffentlichungskanäle** aktiviert

---

## 🎨 Wo erscheinen die Produkte?

### Homepage (index.html)
- **Bestsellers-Sektion:** Produkte aus `bestsellers`-Kollektion
- **New Arrivals-Sektion:** Produkte aus `new-arrivals`-Kollektion
- **Sale-Sektion:** Produkte aus `sale`-Kollektion

### Damen-Seite (damen.html)
- Produkte aus `women`-Kollektion

### Herren-Seite (herren.html)
- Produkte aus `men`-Kollektion

### Get The Look (get-the-look.html)
- **Runde Brillen:** `round`-Kollektion
- **Rechteckige Brillen:** `rectangle`-Kollektion
- **Pilotenbrillen:** `aviator`-Kollektion
- **Cat-Eye Brillen:** `cat-eye`-Kollektion
- **Randlose Brillen:** `rimless`-Kollektion

### Brand-Seiten (brand.html?brand=gucci)
- Gefiltert nach **Anbieter** (Marke)

---

## 🔍 Wichtige Feld-Zuordnungen

### Anbieter (Vendor) = Marke
Schreiben Sie die Marke in **GROSSBUCHSTABEN**:
```
TOM FORD
GUCCI
PRADA
CHANEL
MIU MIU
CAZAL
DITA
CARTIER
BOTTEGA VENETA
CELINE
FENDI
```

### Typ = Produkttyp
Nur diese beiden Werte verwenden:
```
Brille
Sonnenbrille
```

### Tags = Wichtig für Filter & Suche
Format: **kleinbuchstaben, komma-getrennt**
```
Beispiel: gucci, damen, rund, gold, brille, luxus, neu
```

**Pflicht-Tags:**
- Marke (kleinbuchstaben): `gucci`, `prada`, `tom-ford`, etc.
- Geschlecht: `damen`, `herren`, `unisex`
- Stil: `rund`, `rechteckig`, `aviator`, `cat-eye`, `randlos`
- Typ: `brille`, `sonnenbrille`
- Optional: `luxus`, `neu`, `sale`, `bestseller`

---

## 🚨 Häufige Fehler

### ❌ Fehler 1: Keine Kollektionen zugewiesen
**Problem:** Produkt ist nicht sichtbar auf der Website
**Lösung:** Mindestens 2-3 Kollektionen zuweisen!

### ❌ Fehler 2: Falsche Anbieter-Schreibweise
**Problem:** Markenfilter funktioniert nicht
**Lösung:** Anbieter in GROSSBUCHSTABEN schreiben (z.B. `TOM FORD`, nicht `Tom Ford`)

### ❌ Fehler 3: Keine Tags gesetzt
**Problem:** Produkt wird nicht gefunden bei Suche/Filter
**Lösung:** Mindestens 5-7 Tags pro Produkt

### ❌ Fehler 4: Produkt nicht veröffentlicht
**Problem:** Produkt erscheint nicht
**Lösung:** Status auf "Aktiv" setzen + Veröffentlichungskanäle aktivieren

### ❌ Fehler 5: Automatisierte Kollektionen ohne Tag
**Problem:** Produkt erscheint nicht in automatisierten Kollektionen
**Lösung:** Entsprechende Tags hinzufügen (z.B. Tag `round` für `round`-Kollektion)

---

## 🧪 Test nach dem Upload

### 1. Homepage testen
- Öffnen Sie: `index.html`
- Prüfen Sie:
  - ✅ Bestsellers-Sektion zeigt Produkte
  - ✅ New Arrivals-Sektion zeigt Produkte
  - ✅ Sale-Sektion zeigt Produkte

### 2. Kategorieseiten testen
- Öffnen Sie: `damen.html` und `herren.html`
- Prüfen Sie:
  - ✅ Damen-Produkte auf damen.html
  - ✅ Herren-Produkte auf herren.html

### 3. Get The Look testen
- Öffnen Sie: `get-the-look.html`
- Prüfen Sie:
  - ✅ Runde Brillen-Sektion
  - ✅ Rechteckige Brillen-Sektion
  - ✅ Aviator-Sektion
  - ✅ Cat-Eye-Sektion
  - ✅ Randlose-Sektion

### 4. Marken-Seiten testen
- Öffnen Sie: `brand.html?brand=gucci`
- Prüfen Sie:
  - ✅ Nur Gucci-Produkte werden angezeigt

### 5. Suche & Filter testen
- Klicken Sie auf Suche-Icon
- Suchen Sie nach "Gucci"
- Prüfen Sie:
  - ✅ Suchergebnisse erscheinen
  - ✅ Filter funktionieren

---

## 📝 Quick-Copy: Produkt-Template

Kopieren Sie diese Vorlage für schnelles Erstellen:

```
TITEL:
[MARKE] [MODELL] [STIL] [TYP] [GESCHLECHT]

BESCHREIBUNG:
Elegante [BESCHREIBUNG] von [MARKE].

✨ Highlights:
• Premium [MATERIAL]
• Hochwertige Gläser
• Handgefertigt in [LAND]
• Inkl. Original-Etui

📐 Maße:
• Breite: [XX]mm
• Stegbreite: [XX]mm

PREIS: [XXX,00]
SKU: [MARKE]-[MODELL]-[FARBE]

PRODUKTORGANISATION:
Typ: [Brille/Sonnenbrille]
Anbieter: [MARKE IN GROSSBUCHSTABEN]
Kollektionen: [women/men], [round/rectangle/aviator/cat-eye/rimless], [bestsellers/new-arrivals/sale]
Tags: [marke], [geschlecht], [stil], [farbe], [typ], luxus

STATUS: Aktiv
VERÖFFENTLICHUNG: ☑️ Onlineshop, ☑️ Elyavision Headless
```

---

## 🎉 Fertig!

Nach dem Hochladen von mindestens **5-10 Demo-Produkten** sollte Ihre Website vollständig funktionieren!

**Fragen?** Schreiben Sie an: elya.aftersales@gmail.com

---

**Erstellt:** Februar 2026
**Version:** 1.0
**Für:** Elya Vision Demo-Setup
