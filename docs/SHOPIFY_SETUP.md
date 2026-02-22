# 🛍️ SHOPIFY SETUP FÜR WHITE-LABEL E-COMMERCE

Diese Anleitung zeigt dir, wie du Shopify so konfigurierst, dass Kunden **NIE** merken, dass Shopify im Hintergrund läuft.

---

## 🎯 ZIEL: KOMPLETT UNSICHTBARES SHOPIFY

Kunden sehen:
- ✅ Nur deine Domain (elya.at)
- ✅ Dein Branding überall
- ✅ Keine Shopify-Logos oder -Links

Shopify macht im Hintergrund:
- Produkte, Inventar, Bestellungen, Zahlungen

---

## 📋 SCHRITT-FÜR-SCHRITT ANLEITUNG

### **1. SHOPIFY ADMIN EINLOGGEN**

Gehe zu: `https://elyavision.myshopify.com/admin`

---

### **2. CHECKOUT BRANDING ANPASSEN**

#### **A. Checkout Settings öffnen:**
1. **Settings** (unten links) → **Checkout**
2. Scrolle zu **"Checkout language"** und **"Branding"**

#### **B. Shopify-Logo entfernen:**
1. Unter **"Branding"** → **"Customize checkout"** klicken
2. **Logo hochladen:** Lade dein Elya-Logo hoch (PNG, mind. 250x100px)
3. **Farben anpassen:**
   - **Primary color:** `#d4af37` (Dein Gold)
   - **Button color:** `#d4af37`
   - **Background:** `#ffffff`
   - **Text color:** `#1a2847` (Dein Dark Blue)

4. **Typography:**
   - **Heading:** Playfair Display
   - **Body:** Lato

5. **Favicon:** Lade dein Favicon hoch (32x32px)

6. **"Save"** klicken

#### **C. Shopify-Branding entfernen (Wichtig!):**
1. Gehe zu **Settings** → **Checkout**
2. Unter **"Order processing"** → **"After an order is paid"**
3. Wähle: **"Show a confirmation page"**
4. ✅ **DEAKTIVIERE:** "Show link back to online store" (falls vorhanden)
5. ✅ **AKTIVIERE:** "Automatically fulfill order's line items"

---

### **3. CUSTOMER ACCOUNTS DEAKTIVIEREN**

Da du **Guest Checkout** nutzt, brauchst du keine Customer Accounts:

1. **Settings** → **Customer accounts**
2. Wähle: **"Accounts are disabled"**
   - Damit können Kunden OHNE Login kaufen
   - Shopify fragt nicht nach Account-Erstellung

3. **Save**

---

### **4. CHECKOUT-SPRACHE AUF DEUTSCH**

1. **Settings** → **Languages**
2. Wähle **"Deutsch"** als Hauptsprache
3. Klicke auf **"Checkout & system"**
4. Übersetze alle Shopify-Texte zu deinem Branding:
   - "Powered by Shopify" → **LÖSCHEN** oder zu "" ändern
   - "Continue shopping" → "Weiter einkaufen"
   - Alle anderen Texte anpassen

5. **Save translations**

---

### **5. ZAHLUNGSMETHODEN EINRICHTEN**

1. **Settings** → **Payments**
2. Aktiviere:
   - **Shopify Payments** (Kreditkarte, Debit)
   - **PayPal Express**
   - **Klarna** (Sofort, Rechnung, Ratenkauf) - für Österreich wichtig!

3. Unter **"Payment capture"** → Wähle **"Automatically at checkout"**

---

### **6. VERSANDEINSTELLUNGEN**

1. **Settings** → **Shipping and delivery**
2. **Versandzonen hinzufügen:**
   - **Österreich:** Kostenlos ab €100, sonst €9,99
   - **Deutschland:** Kostenlos ab €100, sonst €12,99
   - **EU:** €15,99 (optional)

3. **Lieferzeiten:**
   - Standard: 3-5 Werktage
   - Express: 1-2 Werktage (optional)

---

### **7. STEUERN KONFIGURIEREN**

1. **Settings** → **Taxes and duties**
2. **Österreich:** 20% USt (automatisch)
3. **Deutschland:** 19% MwSt (automatisch)
4. ✅ Aktiviere: **"Include tax in prices"**
   - Dann siehst du im Shop €199 statt €199 + €39,80 USt

---

### **8. RECHTLICHE SEITEN (PFLICHT IN ÖSTERREICH!)**

1. **Settings** → **Legal**
2. Erstelle/Bearbeite:
   - **Impressum** (Refund policy → umbenennen)
   - **Datenschutzerklärung** (Privacy policy)
   - **AGB** (Terms of service)
   - **Widerrufsbelehrung** (Shipping policy → umbenennen)

3. Nutze **WKO-Generatoren:**
   - [WKO Impressum](https://www.wko.at/service/wirtschaftsrecht-gewerberecht/musterimpressum.html)
   - [WKO Datenschutz](https://www.wko.at/datenschutz-generator)

---

### **9. E-MAIL-BENACHRICHTIGUNGEN ANPASSEN**

1. **Settings** → **Notifications**
2. Passe alle E-Mail-Templates an:
   - **Order confirmation** → "Deine Elya-Bestellung"
   - **Shipping confirmation** → "Deine Brillen sind unterwegs"
   - Entferne alle "Shopify"-Erwähnungen
   - Füge dein Logo ein

3. **Footer anpassen:**
   - Entferne "This email was sent from Shopify"
   - Füge deine Kontaktdaten hinzu

---

### **10. CUSTOM DOMAIN FÜR CHECKOUT (OPTIONAL)**

⚠️ **Achtung:** Custom Checkout Domain ist NUR für **Shopify Plus** verfügbar (€2000+/Monat)

**Alternative für normale Shopify-Pläne:**

#### **Option A: Subdomain-Redirect (Workaround)**
1. Erstelle eine Subdomain: `checkout.elya.at`
2. Richte einen **URL-Redirect** ein:
   ```
   checkout.elya.at → elyavision.myshopify.com/checkout
   ```
3. Nachteil: URL zeigt dann doch Shopify-Domain

#### **Option B: Hauptdomain nutzen**
1. Verbinde deine Hauptdomain `elya.at` mit Shopify:
2. **Settings** → **Domains** → **"Connect existing domain"**
3. Füge DNS-Records hinzu:
   ```
   A-Record: @ → 23.227.38.65
   CNAME: www → shops.myshopify.com
   ```
4. Vorteil: Checkout läuft dann über `elya.at/checkout`

---

### **11. PRODUKTE HOCHLADEN**

1. **Products** → **Add product**
2. Für jedes Produkt:
   - **Title:** Produktname (z.B. "Gucci GG1234S")
   - **Description:** Beschreibung
   - **Price:** z.B. 299
   - **Images:** Mind. 3 Bilder pro Produkt
   - **Vendor:** Markenname (Gucci, Prada, etc.)
   - **Product type:** "Sonnenbrillen" oder "Brillen"
   - **Tags:** "neu", "bestseller", "farbe:schwarz", etc.
   - **Collections:** "Sonnenbrillen", "Bestsellers", "New Arrivals"

3. **Varianten hinzufügen** (falls nötig):
   - Farbe: Schwarz, Gold, Braun
   - Größe: S, M, L (falls relevant)

---

### **12. COLLECTIONS ERSTELLEN**

1. **Products** → **Collections** → **"Create collection"**
2. Erstelle:
   - **Sonnenbrillen** (Typ: "Automated", Bedingung: Product type = "Sonnenbrillen")
   - **Brillen** (Typ: "Automated", Bedingung: Product type = "Brillen")
   - **Bestsellers** (Typ: "Manual", füge manuell hinzu)
   - **New Arrivals** (Typ: "Automated", Bedingung: Tag = "neu")
   - **Sale** (Typ: "Automated", Bedingung: Compare at price > 0)

---

### **13. SHOPIFY-BRANDING KOMPLETT ENTFERNEN**

#### **Checkout-Seite:**
1. **Settings** → **Checkout** → **"Customize checkout"**
2. Füge **Custom CSS** hinzu (falls Shopify Plus):
   ```css
   /* Entfernt "Powered by Shopify" */
   .shopify-link {
       display: none !important;
   }

   /* Entfernt Shopify-Logo im Footer */
   footer a[href*="shopify"] {
       display: none !important;
   }
   ```

#### **E-Mails:**
1. **Settings** → **Notifications** → **Footer** bearbeiten
2. Entferne:
   ```
   {{ shop.name }} is powered by Shopify
   ```
3. Ersetze mit deinen Kontaktdaten

---

### **14. TESTING VOR LAUNCH**

1. **Test-Bestellung durchführen:**
   - Aktiviere **Settings** → **Payments** → **"Bogus Gateway"**
   - Test-Kreditkarte: `1` (für Success)
   - Prüfe alle E-Mails

2. **Mobile Testing:**
   - Öffne Shop auf Smartphone
   - Teste Checkout-Flow

3. **Browser-Testing:**
   - Chrome, Firefox, Safari, Edge

---

## ✅ CHECKLISTE VOR LAUNCH

- [ ] Logo und Farben im Checkout angepasst
- [ ] Shopify-Branding entfernt (soweit möglich)
- [ ] Customer Accounts deaktiviert (Guest Checkout)
- [ ] Zahlungsmethoden aktiviert (Kreditkarte, PayPal, Klarna)
- [ ] Versandeinstellungen konfiguriert
- [ ] Steuern konfiguriert (20% Österreich)
- [ ] Rechtliche Seiten erstellt (Impressum, Datenschutz, AGB, Widerruf)
- [ ] E-Mail-Templates angepasst (kein "Shopify" mehr)
- [ ] Domain verbunden (elya.at)
- [ ] Mindestens 15-20 Produkte hochgeladen
- [ ] Collections erstellt (Sonnenbrillen, Brillen, Bestsellers, Sale)
- [ ] Test-Bestellung durchgeführt
- [ ] Mobile & Desktop getestet

---

## 🚀 LAUNCH!

Wenn alle Punkte erledigt sind:

1. **Settings** → **Sales channels** → **Online Store**
2. Entferne Passwort-Schutz: **"Remove password"**
3. Dein Shop ist LIVE! 🎉

---

## 💡 TIPPS FÜR MAXIMALE UNSICHTBARKEIT

1. **Verwende immer deine eigene Domain** (elya.at)
2. **Nie "elyavision.myshopify.com" teilen** - nur deine Domain
3. **Alle E-Mails mit deinem Branding** - kein Shopify-Logo
4. **Checkout-URL ist der Knackpunkt:**
   - Normale Shopify-Pläne zeigen `elyavision.myshopify.com/checkout`
   - Shopify Plus erlaubt `checkout.elya.at`
   - Kompromiss: Verbinde Hauptdomain, dann zeigt es `elya.at/checkout`

---

## ❓ FAQ

**Q: Kann ich das Shopify-Logo im Checkout KOMPLETT entfernen?**
A: Ja, mit eigenem Logo und Branding-Anpassungen. Aber "Powered by Shopify" im Footer bleibt (außer bei Shopify Plus).

**Q: Sehen Kunden "Shopify" in der URL?**
A: Nur wenn du keine eigene Domain verbindest. Mit verbundener Domain (elya.at) zeigt es deine Domain.

**Q: Brauche ich ein Shopify Plus Abo?**
A: Nein! Der Basic Plan (€29/Monat) reicht für Guest Checkout und Branding-Anpassungen. Nur Custom Checkout Domain braucht Plus.

**Q: Wie verfolgen Kunden ihre Bestellung?**
A: Sie bekommen eine Tracking-Link per E-Mail. Oder nutzen deine Order Tracking Seite (profile.html).

---

**🎉 Fertig! Dein Shop ist jetzt White-Label und bereit für den Launch!**
