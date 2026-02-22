/**
 * Cookie Manager
 * Handles GDPR compliant cookie consent for Austria/EU
 */

const STORAGE_KEY = 'elya_cookie_consent';
const CONSENT_TYPES = {
    NECESSARY: 'necessary',
    ANALYTICS: 'analytics',
    MARKETING: 'marketing'
};

export class CookieManager {
    constructor() {
        this.consent = this.loadConsent();
        this.banner = null;
    }

    init() {
        if (!this.consent) {
            this.showBanner();
        } else {
            this.applyConsent(this.consent);
        }

        // Expose open settings globally for footer link
        window.openCookieSettings = () => this.showBanner(true);
    }

    loadConsent() {
        const stored = localStorage.getItem(STORAGE_KEY);
        try {
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    }

    saveConsent(settings) {
        this.consent = settings;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        this.applyConsent(settings);
        this.hideBanner();
    }

    applyConsent(settings) {
        // Here we would enable/disable scripts based on consent
        // For now, we just log it as we don't have active analytics yet
        if (settings.analytics) {
            console.log('Stats: Analytics accepted - Loading scripts...');
            // e.g. initGoogleAnalytics();
        }

        if (settings.marketing) {
            console.log('Marketing: Pixel accepted - Loading scripts...');
            // e.g. initFacebookPixel();
        }
    }

    showBanner(isSettings = false) {
        if (this.banner) {
            this.banner.remove();
        }

        const html = `
            <div class="cookie-banner" id="cookieBanner">
                <div class="cookie-banner-content">
                    <h3>Privatsphäre-Einstellungen</h3>
                    <p>
                        Wir verwenden Cookies und ähnliche Technologien, um Ihr Erlebnis auf unserer Website zu verbessern. 
                        Einige sind für den Betrieb der Seite notwendig, andere helfen uns, Nutzungsstatistiken zu erstellen 
                        und personalisierte Inhalte anzuzeigen. Weitere Informationen finden Sie in unserer 
                        <a href="/pages/datenschutz.html">Datenschutzerklärung</a>.
                    </p>
                    ${isSettings ? this.getSettingsHTML() : ''}
                </div>
                <div class="cookie-banner-actions">
                    <button class="cookie-btn btn-accept" id="acceptAllBtn">Alles akzeptieren</button>
                    <button class="cookie-btn" id="acceptNecessaryBtn">Nur notwendige</button>
                    ${!isSettings ? '<button class="cookie-btn" id="openSettingsBtn" style="font-size: 0.8rem; border: none; text-decoration: underline;">Einstellungen</button>' : ''}
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
        this.banner = document.getElementById('cookieBanner');

        // Small delay for animation
        setTimeout(() => this.banner.classList.add('is-visible'), 100);

        this.attachListeners();
    }

    getSettingsHTML() {
        return `
            <div class="cookie-settings">
                <div class="switch-wrapper">
                    <label>
                        <strong>Notwendig</strong>
                        <p style="margin:0; font-size:0.8rem">Erforderlich für den Betrieb der Seite (Warenkorb, Login).</p>
                    </label>
                    <input type="checkbox" checked disabled>
                </div>
                <div class="switch-wrapper">
                    <label>
                        <strong>Analyse & Statistik</strong>
                        <p style="margin:0; font-size:0.8rem">Hilft uns zu verstehen, wie Besucher mit der Website interagieren.</p>
                    </label>
                    <input type="checkbox" id="analyticsConsent" ${this.consent?.analytics ? 'checked' : ''}>
                </div>
                <div class="switch-wrapper">
                    <label>
                        <strong>Marketing</strong>
                        <p style="margin:0; font-size:0.8rem">Für personalisierte Werbung und Social Media Funktionen.</p>
                    </label>
                    <input type="checkbox" id="marketingConsent" ${this.consent?.marketing ? 'checked' : ''}>
                </div>
            </div>
        `;
    }

    hideBanner() {
        if (this.banner) {
            this.banner.classList.remove('is-visible');
            setTimeout(() => this.banner.remove(), 400);
            this.banner = null;
        }
    }

    attachListeners() {
        document.getElementById('acceptAllBtn').addEventListener('click', () => {
            this.saveConsent({
                necessary: true,
                analytics: true,
                marketing: true,
                timestamp: new Date().toISOString()
            });
        });

        document.getElementById('acceptNecessaryBtn').addEventListener('click', () => {
            // Check if we are in settings mode and checkboxes are checked
            const analytics = document.getElementById('analyticsConsent')?.checked || false;
            const marketing = document.getElementById('marketingConsent')?.checked || false;

            this.saveConsent({
                necessary: true,
                analytics: analytics,
                marketing: marketing,
                timestamp: new Date().toISOString()
            });
        });

        const settingsBtn = document.getElementById('openSettingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showBanner(true);
            });
        }
    }
}

// Instance for global usage
export const cookieManager = new CookieManager();
