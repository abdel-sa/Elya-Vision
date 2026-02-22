# 📸 Visueller Guide: Kollektion erstellen in Shopify

Dieser Guide zeigt **genau**, wie das Shopify-Interface aussieht!

---

## Schritt 1: Neue Kollektion erstellen

**Pfad:** Produkte → Kollektionen → **"Kollektion hinzufügen"**

---

## Schritt 2: Formular ausfüllen

### ✏️ Titel
```
┌─────────────────────────────────────────────┐
│ Bestsellers                                 │
└─────────────────────────────────────────────┘
```
- Geben Sie den Namen der Kollektion ein
- **Wichtig:** Verwenden Sie die englischen Namen für die Website!

### 📝 Beschreibung (optional)
```
┌─────────────────────────────────────────────┐
│ [Leer lassen oder Beschreibung eingeben]    │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
```

### 🔧 Kollektionstyp

Sie sehen zwei Optionen:

```
⚪ Manuell
   Füge Produkte einzeln zu dieser Kollektion hinzu.

🔘 Intelligent
   Bestehende und zukünftige Produkte, die den von dir
   festgelegten Bedingungen entsprechen, werden automatisch
   zu dieser Kollektion hinzugefügt.
```

**Wählen Sie für die meisten Kollektionen: "Intelligent"**

---

## Schritt 3: Bedingungen festlegen (nur bei "Intelligent")

Wenn Sie "Intelligent" gewählt haben, erscheint dieser Bereich:

### Bedingung hinzufügen:

```
┌──────────────────┬─────────────┬──────────────────┐
│ Produkt-Tag      │  ist gleich │  bestseller      │
└──────────────────┴─────────────┴──────────────────┘
```

**Verfügbare Felder:**
- Produkt-Tag
- Produkt-Titel
- Produkt-Typ
- Produkt-Anbieter
- Produkt-Preis
- Vergleichspreis
- Bestand
- Varianten-Titel

**Verfügbare Operatoren:**
- ist gleich
- ist nicht gleich
- beginnt mit
- endet mit
- enthält
- enthält nicht
- ist größer als
- ist kleiner als
- ist gesetzt
- ist nicht gesetzt

---

## Schritt 4: Veröffentlichung

```
Veröffentlichung                    [Verwalten]

Vertriebskanäle
  ☑️ Onlineshop
  ☑️ Point of Sale, Shop und Elyavision Headless
```

**Aktivieren Sie:**
- ☑️ **Onlineshop** (wichtig!)
- ☑️ **Elyavision Headless** (wichtig für Ihre Website!)

---

## Schritt 5: Bild (optional)

```
┌─────────────────────────────────────────────┐
│                                             │
│         Bild hinzufügen                     │
│                                             │
│  oder ziehe ein Bild hierher, um es         │
│  hochzuladen                                │
│                                             │
└─────────────────────────────────────────────┘
```

Sie können ein Bild für die Kollektion hochladen (optional).

---

## Schritt 6: Theme-Vorlage

```
Theme-Vorlage
┌─────────────────────────────────────────────┐
│ Standard-Kollektion                    ▼   │
└─────────────────────────────────────────────┘
```

Lassen Sie auf "Standard-Kollektion".

---

## Schritt 7: Suchmaschinen-Eintrag

```
Suchmaschinen-Eintrag

elyavision
https://elyavision.myshopify.com › collections › bestsellers
Bestsellers
```

Dies wird automatisch generiert basierend auf Ihrem Titel!

---

## Schritt 8: Speichern!

```
┌─────────────────┐
│   Speichern     │
└─────────────────┘
```

Klicken Sie unten rechts auf **"Speichern"**.

---

## 📋 Beispiele für alle Kollektionen

### Kollektion: Bestsellers
```
Titel: Bestsellers
Typ: 🔘 Intelligent
Bedingung: Produkt-Tag | ist gleich | bestseller
```

### Kollektion: Neuheiten
```
Titel: Neuheiten
Typ: 🔘 Intelligent
Bedingung: Produkt-Tag | ist gleich | neu
```

### Kollektion: Sale
```
Titel: Sale
Typ: 🔘 Intelligent
Bedingung 1: Produkt-Tag | ist gleich | sale
ODER
Bedingung 2: Vergleichspreis | ist gesetzt | [leer]
```

### Kollektion: Damenbrillen
```
Titel: Damenbrillen
Typ: ⚪ Manuell
Produkte: Werden später manuell hinzugefügt
```

### Kollektion: Herrenbrillen
```
Titel: Herrenbrillen
Typ: ⚪ Manuell
Produkte: Werden später manuell hinzugefügt
```

### Kollektion: Runde Brillen
```
Titel: Runde Brillen
Typ: 🔘 Intelligent
Bedingung: Produkt-Tag | ist gleich | rund
```

### Kollektion: Rechteckige Brillen
```
Titel: Rechteckige Brillen
Typ: 🔘 Intelligent
Bedingung: Produkt-Tag | ist gleich | rechteckig
```

### Kollektion: Pilotenbrillen
```
Titel: Pilotenbrillen
Typ: 🔘 Intelligent
Bedingung: Produkt-Tag | ist gleich | aviator
```

### Kollektion: Cat-Eye Brillen
```
Titel: Cat-Eye Brillen
Typ: 🔘 Intelligent
Bedingung: Produkt-Tag | ist gleich | cat-eye
```

### Kollektion: Randlose Brillen
```
Titel: Randlose Brillen
Typ: 🔘 Intelligent
Bedingung: Produkt-Tag | ist gleich | randlos
```

---

## ❓ Häufige Fragen

### Wo sehe ich meine Kollektionen?
- Gehen Sie zu **Produkte** → **Kollektionen**
- Sie sehen eine Liste aller Kollektionen

### Wie füge ich Produkte zu manuellen Kollektionen hinzu?
1. Öffnen Sie die Kollektion
2. Klicken Sie auf "Produkte suchen"
3. Wählen Sie die gewünschten Produkte aus
4. Klicken Sie auf "Hinzufügen"

### Was passiert, wenn ich ein Produkt mit Tag "rund" erstelle?
- Es wird **automatisch** zur "Runde Brillen"-Kollektion hinzugefügt
- Sie müssen nichts manuell tun!

### Kann ein Produkt in mehreren Kollektionen sein?
- **Ja!** Ein Produkt kann in beliebig vielen Kollektionen sein
- Beispiel: Eine Damen-Runde-Brille kann in:
  - `women` (manuell zugewiesen)
  - `round` (automatisch durch Tag "rund")
  - `bestsellers` (automatisch durch Tag "bestseller")

### Wie ändere ich eine Kollektion?
1. Gehen Sie zu **Produkte** → **Kollektionen**
2. Klicken Sie auf die Kollektion
3. Ändern Sie die gewünschten Felder
4. Klicken Sie auf "Speichern"

---

## ✅ Checkliste vor dem Speichern

Prüfen Sie vor dem Speichern:

- [ ] **Titel** ist korrekt (z.B. "Bestsellers", "Runde Brillen")
- [ ] **Kollektionstyp** ist gewählt (Intelligent oder Manuell)
- [ ] **Bedingungen** sind korrekt gesetzt (nur bei Intelligent)
- [ ] **Veröffentlichungskanäle** sind aktiviert:
  - [ ] Onlineshop
  - [ ] Elyavision Headless
- [ ] Auf **"Speichern"** geklickt!

---

**Erstellt:** Februar 2026
**Version:** 1.0
**Für:** Elya Vision Shopify Setup
