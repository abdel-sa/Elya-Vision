# 📦 Shopify Produktverwaltung - Komplette Anleitung

## Inhaltsverzeichnis
1. [Produkt hinzufügen](#1-produkt-hinzufügen)
2. [Produktdetails ausfüllen](#2-produktdetails-ausfüllen)
3. [Medien hochladen](#3-medien-hochladen)
4. [Preise festlegen](#4-preise-festlegen)
5. [Inventar verwalten](#5-inventar-verwalten)
6. [Produktvarianten erstellen](#6-produktvarianten-erstellen)
7. [Produkt zu Sale hinzufügen](#7-produkt-zu-sale-hinzufügen)
8. [Produkt bearbeiten](#8-produkt-bearbeiten)
9. [Produkt entfernen](#9-produkt-entfernen)
10. [Wichtige Tipps](#10-wichtige-tipps)

---

## 1. Produkt hinzufügen

### Schritt 1: Produktseite öffnen
1. Melden Sie sich bei Shopify an: `https://admin.shopify.com`
2. Klicken Sie im linken Menü auf **"Produkte"**
3. Klicken Sie oben rechts auf den Button **"Produkt hinzufügen"**

![Produkt erstellen Button](https://via.placeholder.com/800x400/f5f5f5/666?text=Produkt+erstellen+Button)

---

## 2. Produktdetails ausfüllen

### Schritt 2.1: Titel eingeben
- **Feld:** "Titel"
- **Beispiel:** `Tom Ford FT5634 Rechteckige Herrenbrille`
- **Tipp:** Nutzen Sie folgendes Format:
  ```
  [MARKE] [MODELL] [STIL] [KATEGORIE]
  ```

### Schritt 2.2: Beschreibung verfassen
- **Feld:** "Beschreibung" (Rich Text Editor)
- **Beispiel:**
  ```
  Luxuriöse Herrenbrille von Tom Ford in klassischem Rechteck-Design.

  ✨ Highlights:
  • Premium Acetat-Rahmen
  • Hochwertige Gläser mit UV-Schutz
  • Handgefertigt in Italien
  • Inkl. Original-Etui & Zertifikat

  📐 Maße:
  • Breite: 145mm
  • Stegbreite: 18mm
  • Bügellänge: 140mm
  ```

### Schritt 2.3: Kategorie auswählen
- **Feld:** "Produktkategorie auswählen"
- Scrollen Sie nach unten und wählen Sie:
  - **Hauptkategorie:** `Accessoires` → `Brillen & Sonnenbrillen`
  - **Unterkategorie:**
    - Für Brillen: `Korrektionsbrillen`
    - Für Sonnenbrillen: `Sonnenbrillen`

---

## 3. Medien hochladen

### Schritt 3: Produktbilder hinzufügen
1. Klicken Sie auf **"Neu hochladen"** im Medien-Bereich
2. Wählen Sie **mindestens 3-5 Bilder** aus:
   - Frontansicht
   - Seitenansicht (links/rechts)
   - Detailaufnahmen (Logo, Scharniere)
   - Lifestyle-Bild (optional)

**Bildanforderungen:**
- Format: `.jpg`, `.png`, `.webp`
- Mindestgröße: `1200x1200 px`
- Empfohlen: `2000x2000 px`
- Hintergrund: Weiß oder transparent
- Dateiname: `marke-modell-ansicht.jpg` (z.B. `tomford-ft5634-front.jpg`)

**Sortierung:**
- Erstes Bild = Hauptbild (wird auf der Startseite angezeigt)
- Ziehen Sie die Bilder in die gewünschte Reihenfolge

---

## 4. Preise festlegen

### Schritt 4.1: Regulären Preis eingeben
- **Feld:** "Preis"
- **Eingabe:** `299,00` (ohne €-Symbol)
- **Wichtig:** Verwenden Sie Komma für Dezimalstellen

### Schritt 4.2: Vergleichspreis (optional)
- **Feld:** "Vergleichspreis"
- **Wann nutzen:** Nur für Sale-Produkte!
- **Beispiel:**
  - Preis: `199,00` (aktueller Sale-Preis)
  - Vergleichspreis: `299,00` (ursprünglicher Preis)
  - → Shopify zeigt automatisch: ~~299,00€~~ **199,00€**

### Schritt 4.3: Stückpreis (optional)
- **Feld:** "Stückpreis"
- **Normalerweise leer lassen** (nur relevant bei Mengenverkauf)

### Schritt 4.4: Kosten pro Artikel (optional)
- **Feld:** "Kosten pro Artikel"
- **Verwendung:** Ihr Einkaufspreis (für Gewinnberechnung)
- **Wird NICHT öffentlich angezeigt**
- **Beispiel:** `150,00`

---

## 5. Inventar verwalten

### Schritt 5.1: SKU eingeben
- **Feld:** "SKU" (Stock Keeping Unit)
- **Format:** `[MARKE]-[MODELL]-[FARBE]`
- **Beispiel:** `TF-FT5634-001-BLK`
  - TF = Tom Ford
  - FT5634 = Modellnummer
  - 001 = Variante
  - BLK = Schwarz

### Schritt 5.2: Barcode (optional)
- **Feld:** "Barcode"
- Falls vorhanden: EAN/UPC Code eintragen
- Ansonsten: Leer lassen

### Schritt 5.3: Inventar verfolgen
- ☑️ **"Inventar verfolgen"** aktivieren
- **Wichtig:** Immer aktivieren für Lagerbestandskontrolle!

### Schritt 5.4: Menge eingeben
- **Feld:** "Menge" bei Ihrem Standort
- **Beispiel:** `3` (wenn Sie 3 Stück auf Lager haben)

### Schritt 5.5: Verkauf bei Ausverkauf
- **Optionen:**
  - ⚪ "Weiter verkaufen, wenn nicht vorrätig" → NICHT empfohlen
  - 🔘 **"Verkauf einstellen, wenn nicht vorrätig"** → EMPFOHLEN

---

## 6. Produktvarianten erstellen

### Wann Varianten nutzen?
Verwenden Sie Varianten für:
- **Farben:** Schwarz, Braun, Gold, etc.
- **Größen:** 52mm, 54mm, 56mm
- **Material:** Acetat, Metall, Titanium

### Schritt 6.1: Varianten aktivieren
1. Scrollen Sie zum Bereich **"Varianten"**
2. Klicken Sie auf **"Optionen wie Größe oder Farbe hinzufügen"**

### Schritt 6.2: Optionsname festlegen
- **Option 1:** `Farbe`
  - Werte: `Schwarz | Braun | Gold`
- **Option 2:** `Brillengröße` (optional)
  - Werte: `52mm | 54mm | 56mm`

### Schritt 6.3: Variantenwerte eingeben
**Beispiel für Farben:**
```
Option Name: Farbe
Option Values:
  - Schwarz
  - Braun
  - Gold
```

**Wichtig:** Jede Variante erstellt ein eigenes Inventar!

### Schritt 6.4: Varianten bearbeiten
Nach dem Erstellen sehen Sie eine Liste aller Kombinationen:

| Farbe   | SKU              | Preis   | Bestand |
|---------|------------------|---------|---------|
| Schwarz | TF-FT5634-BLK    | 299,00  | 2       |
| Braun   | TF-FT5634-BRN    | 299,00  | 1       |
| Gold    | TF-FT5634-GLD    | 299,00  | 3       |

Klicken Sie auf jede Variante, um:
- Eigenen Preis festzulegen (falls unterschiedlich)
- Eigenes Bild zuzuweisen
- Eigene SKU zu vergeben

---

## 7. Produkt zu Sale hinzufügen

Es gibt **3 Methoden**, um Produkte zu Sale hinzuzufügen:

### Methode 1: Vergleichspreis (Empfohlen) ⭐

**Schritt 1:** Bearbeiten Sie das Produkt
1. Gehen Sie zu **Produkte** → Wählen Sie das Produkt
2. Scrollen Sie zu **"Preis"**

**Schritt 2:** Setzen Sie Vergleichspreis
- **Preis:** `199,00` (neuer Sale-Preis)
- **Vergleichspreis:** `299,00` (alter Preis)
- **Ergebnis:** Shopify zeigt automatisch "-33%" Badge

**Schritt 3:** Sale-Tag hinzufügen
- Scrollen Sie zu **"Tags"**
- Fügen Sie hinzu: `sale`, `discount`, `20-off`

**Schritt 4:** Speichern
- Klicken Sie oben rechts auf **"Speichern"**

---

### Methode 2: Sale-Kollektion erstellen

**Schritt 1: Kollektion erstellen**
1. Gehen Sie zu **Produkte** → **Kollektionen**
2. Klicken Sie auf **"Kollektion erstellen"**
3. **Titel:** `Sale`
4. **Beschreibung:** `Entdecken Sie unsere reduzierten Brillen und Sonnenbrillen`

**Schritt 2: Bedingungen festlegen**
- **Kollektionstyp:** "Automatisiert"
- **Bedingungen:**
  ```
  Produkt-Tag ist gleich "sale"
  ODER
  Vergleichspreis ist größer als Preis
  ```

**Schritt 3: Speichern**
- Alle Produkte mit Sale-Tag oder Vergleichspreis erscheinen automatisch

---

### Methode 3: Preisregel erstellen (für zeitlich begrenzte Sales)

**Schritt 1: Preisregel erstellen**
1. Gehen Sie zu **Rabatte**
2. Klicken Sie auf **"Rabatt erstellen"**
3. Wählen Sie **"Prozentrabatt"**

**Schritt 2: Details eingeben**
- **Code:** `SOMMER20` (oder automatisch bei Kollektionen)
- **Typ:** Automatischer Rabatt
- **Wert:** `20%` Rabatt
- **Gilt für:** Bestimmte Kollektionen → Sale-Kollektion

**Schritt 3: Zeitraum festlegen**
- **Startdatum:** `01.06.2026 00:00`
- **Enddatum:** `30.06.2026 23:59`

---

## 8. Produkt bearbeiten

### Schritt 8.1: Produkt öffnen
1. Gehen Sie zu **Produkte**
2. Suchen Sie das Produkt über die Suchleiste
3. Klicken Sie auf den Produktnamen

### Schritt 8.2: Änderungen vornehmen
- Titel ändern
- Beschreibung aktualisieren
- Preise anpassen
- Bilder hinzufügen/entfernen
- Inventar korrigieren

### Schritt 8.3: Speichern
- Klicken Sie oben rechts auf **"Speichern"**
- **Wichtig:** Änderungen sind sofort live!

---

## 9. Produkt entfernen

### Variante 1: Produkt löschen (permanent)

**⚠️ ACHTUNG: Kann NICHT rückgängig gemacht werden!**

**Schritt 1:** Öffnen Sie das Produkt
1. Gehen Sie zu **Produkte**
2. Klicken Sie auf das zu löschende Produkt

**Schritt 2:** Löschen
1. Scrollen Sie ganz nach unten
2. Klicken Sie auf **"Produkt löschen"** (roter Button)
3. Bestätigen Sie mit **"Löschen"**

**Was passiert:**
- ❌ Produkt ist komplett entfernt
- ❌ Bestellhistorie bleibt, aber Produktlink ist tot
- ❌ NICHT wiederherstellbar

---

### Variante 2: Produkt deaktivieren (empfohlen)

**Schritt 1:** Öffnen Sie das Produkt

**Schritt 2:** Status ändern
1. Rechte Sidebar → **"Status"**
2. Ändern Sie von `Aktiv` → `Entwurf`

**Schritt 3:** Verfügbarkeit anpassen
- Entfernen Sie alle Häkchen bei **"Veröffentlichung"**
  - ☐ Onlineshop
  - ☐ Point of Sale
  - ☐ Elyavision Headless

**Schritt 4:** Speichern
- Klicken Sie auf **"Speichern"**

**Vorteile:**
- ✅ Produkt ist unsichtbar für Kunden
- ✅ Kann jederzeit reaktiviert werden
- ✅ Bestellhistorie bleibt intakt

---

### Variante 3: Ausverkauft markieren

**Schritt 1:** Öffnen Sie das Produkt

**Schritt 2:** Inventar auf 0 setzen
1. Scrollen Sie zu **"Inventar"**
2. Setzen Sie **Menge** auf `0`
3. Aktivieren Sie: "Verkauf einstellen, wenn nicht vorrätig"

**Schritt 3:** Speichern
- Das Produkt bleibt sichtbar, zeigt aber "Ausverkauft"

---

## 10. Wichtige Tipps

### ✅ Produktorganisation

#### Tags verwenden
Fügen Sie sinnvolle Tags hinzu für einfaches Filtern:
- **Marke:** `tom-ford`, `gucci`, `prada`, `chanel`
- **Typ:** `sonnenbrille`, `brille`, `optisch`
- **Geschlecht:** `herren`, `damen`, `unisex`
- **Stil:** `aviator`, `rund`, `rechteckig`, `cat-eye`
- **Status:** `sale`, `neu`, `bestseller`, `limitiert`

**Beispiel für Tom Ford Sonnenbrille:**
```
tom-ford, sonnenbrille, herren, aviator, luxus, neu
```

---

#### Kollektionen nutzen
Erstellen Sie logische Kollektionen:
- **Nach Marke:** "Tom Ford", "Gucci", "Prada"
- **Nach Geschlecht:** "Herren", "Damen", "Unisex"
- **Nach Typ:** "Sonnenbrillen", "Brillen"
- **Nach Stil:** "Runde Brillen", "Cat-Eye", "Pilotenbrillen"
- **Nach Status:** "Sale", "Neu", "Bestseller"

---

### ✅ SEO Optimierung

#### Title-Tags optimieren
**Format:**
```
[Marke] [Modell] [Stil] [Typ] | Elya
```

**Beispiel:**
```
Tom Ford FT0752 Aviator Sonnenbrille | Elya
```

#### Meta-Beschreibung
**Feld:** "Suchmaschinen-Eintrag" → "Bearbeiten"
**Länge:** 150-160 Zeichen
**Beispiel:**
```
Luxuriöse Tom Ford FT0752 Aviator Sonnenbrille aus Italien. Premium-Qualität, UV-Schutz, inkl. Etui. Kostenloser Versand ab 100€.
```

#### URL-Handle
**Feld:** "Suchmaschinen-Eintrag" → "URL und Handle"
**Format:** `marke-modell-stil`
**Beispiel:** `tom-ford-ft0752-aviator`

---

### ✅ Checkliste vor Veröffentlichung

Bevor Sie ein Produkt veröffentlichen, prüfen Sie:

- [ ] **Titel** ist aussagekräftig und enthält Marke + Modell
- [ ] **Beschreibung** ist vollständig (mind. 100 Wörter)
- [ ] **Mindestens 3-5 hochwertige Bilder** hochgeladen
- [ ] **Preis** ist korrekt eingegeben
- [ ] **Vergleichspreis** nur bei Sale-Produkten gesetzt
- [ ] **SKU** ist eingetragen
- [ ] **Inventar** ist aktiviert und Menge eingegeben
- [ ] **Tags** sind gesetzt (Marke, Typ, Stil, etc.)
- [ ] **Kollektionen** sind zugewiesen
- [ ] **SEO-Titel** und **Meta-Beschreibung** sind optimiert
- [ ] **Produktkategorie** ist ausgewählt
- [ ] **Status** ist auf "Aktiv" gesetzt
- [ ] **Veröffentlichungskanäle** sind gewählt (Onlineshop, etc.)

---

## Beispiel: Komplettes Produkt hinzufügen

### Szenario: Tom Ford Sonnenbrille

**1. Titel:**
```
Tom Ford FT0752 Aviator Sonnenbrille Herren
```

**2. Beschreibung:**
```
Klassische Tom Ford Aviator Sonnenbrille für den modernen Mann.

✨ HIGHLIGHTS:
• Premium Metallrahmen in Gold
• Polarisierte Gläser mit 100% UV-Schutz
• Handgefertigt in Italien
• Ikonisches Tom Ford Logo auf den Bügeln
• Inkl. Original Tom Ford Etui, Putztuch & Echtheitszertifikat

📐 MASSE:
• Glasbreite: 58mm
• Stegbreite: 14mm
• Bügellänge: 140mm

💎 MATERIAL:
• Rahmen: Metall (Gold)
• Gläser: Polycarbonat polarisiert
• Nasenpads: Verstellbar

🎁 LIEFERUMFANG:
• Tom Ford FT0752 Sonnenbrille
• Original Etui
• Mikrofaser-Putztuch
• Echtheitszertifikat
```

**3. Medien:**
- Bild 1: Front view
- Bild 2: Side view (links)
- Bild 3: Detail: Tom Ford Logo
- Bild 4: Auf Gesicht (Model)
- Bild 5: Mit Etui

**4. Kategorie:**
- Accessoires → Brillen & Sonnenbrillen → Sonnenbrillen

**5. Preise:**
- Preis: `459,00`
- Vergleichspreis: (leer - kein Sale)
- Kosten: `280,00` (Einkaufspreis)

**6. Inventar:**
- SKU: `TF-FT0752-GLD-58`
- Barcode: (leer)
- ☑️ Inventar verfolgen: Ja
- Menge: `5`
- Verkauf bei Ausverkauf: "Verkauf einstellen"

**7. Varianten:**
- Option 1: Farbe
  - Gold (Standard)
  - Schwarz
  - Silber

Für jede Variante:
- Eigenes Bild zuweisen
- Eigene SKU: `TF-FT0752-BLK-58`, `TF-FT0752-SIL-58`
- Bestand eintragen

**8. Versand:**
- Gewicht: `0,15 kg`
- Verpackung: Shop-Standard
- Herkunftsland: Italien

**9. Produktorganisation:**
- **Typ:** Sonnenbrille
- **Anbieter:** Tom Ford
- **Kollektionen:**
  - Sonnenbrillen
  - Tom Ford
  - Herren
  - Aviator
  - Luxus
- **Tags:**
  ```
  tom-ford, sonnenbrille, aviator, herren, luxus, gold, polarisiert, neu, italien
  ```

**10. Theme-Vorlage:**
- Standard-Produkt

**11. Suchmaschinen-Eintrag:**
- **Seiten-Titel:**
  ```
  Tom Ford FT0752 Aviator Sonnenbrille Gold | Elya
  ```
- **Meta-Beschreibung:**
  ```
  Luxuriöse Tom Ford FT0752 Aviator Sonnenbrille in Gold. Polarisiert, 100% UV-Schutz, handgefertigt in Italien. Inkl. Etui. Kostenloser Versand.
  ```
- **URL:**
  ```
  tom-ford-ft0752-aviator-gold
  ```

**12. Status & Veröffentlichung:**
- Status: **Aktiv**
- Veröffentlichungskanäle:
  - ☑️ Onlineshop
  - ☑️ Point of Sale
  - ☑️ Elyavision Headless

**13. Speichern!**
- Klicken Sie oben rechts auf **"Speichern"**

---

## Häufige Fehler vermeiden

### ❌ Fehler 1: Kein Vergleichspreis bei regulären Produkten
- **Falsch:** Vergleichspreis immer ausfüllen
- **Richtig:** Nur bei Sale-Produkten verwenden

### ❌ Fehler 2: Zu wenig Bilder
- **Falsch:** Nur 1-2 Bilder
- **Richtig:** Mindestens 3-5 Bilder aus verschiedenen Winkeln

### ❌ Fehler 3: Keine Tags
- **Falsch:** Produkt ohne Tags hochladen
- **Richtig:** Mindestens 5-8 relevante Tags hinzufügen

### ❌ Fehler 4: Produkt löschen statt deaktivieren
- **Falsch:** Produkt permanent löschen
- **Richtig:** Status auf "Entwurf" setzen

### ❌ Fehler 5: Inventar nicht verfolgen
- **Falsch:** "Inventar verfolgen" nicht aktiviert
- **Richtig:** Immer aktivieren für Bestandskontrolle

### ❌ Fehler 6: Schlechte Produktbeschreibung
- **Falsch:** "Tolle Brille von Tom Ford"
- **Richtig:** Detaillierte Beschreibung mit Highlights, Maßen, Material

---

## Support & Hilfe

Falls Sie Fragen haben:
- **E-Mail:** elya.aftersales@gmail.com
- **Shopify Help Center:** https://help.shopify.com/de
- **Shopify Community:** https://community.shopify.com/

---

**Erstellt:** Februar 2026
**Version:** 1.0
**Autor:** Elya Vision Team

---

## Weitere Ressourcen

- [Shopify Produktdokumentation](https://help.shopify.com/de/manual/products)
- [Shopify Kollektionen](https://help.shopify.com/de/manual/products/collections)
- [Shopify SEO Guide](https://help.shopify.com/de/manual/promoting-marketing/seo)
- [Shopify Inventarverwaltung](https://help.shopify.com/de/manual/products/inventory)
