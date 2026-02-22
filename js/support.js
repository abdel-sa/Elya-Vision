// Support Form JavaScript
// Verwendet EmailJS für die E-Mail-Weiterleitung (https://www.emailjs.com/)
// Kostenlos bis 200 E-Mails/Monat

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('supportForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');
    
    // EmailJS Konfiguration
    const EMAILJS_PUBLIC_KEY = 'qDh0iYKKnpnpveip0';
    const EMAILJS_SERVICE_ID = 'service_prskhfi';
    const EMAILJS_TEMPLATE_ID = 'template_pf49qm6';
    
    // EmailJS initialisieren (wenn konfiguriert)
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
    
    // Formular Submit Handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validierung
        if (!validateForm()) {
            return;
        }
        
        // Loading State
        setLoadingState(true);
        
        // Formulardaten sammeln
        const formData = {
            subject: document.getElementById('subject').value,
            subject_text: document.getElementById('subject').options[document.getElementById('subject').selectedIndex].text,
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            order_number: document.getElementById('orderNumber').value.trim() || 'Nicht angegeben',
            message: document.getElementById('message').value.trim()
        };
        
        try {
            // Option 1: EmailJS (wenn konfiguriert)
            if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && typeof emailjs !== 'undefined') {
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData);
                showSuccess();
            }
            // Option 2: Fallback - Mailto Link (nur wenn EmailJS nicht konfiguriert)
            else {
                sendViaMailto(formData);
            }
        } catch (error) {
            console.error('Fehler beim Senden:', error);
            setLoadingState(false);
            // Inline-Fehlermeldung anzeigen (kein alert, kein mailto)
            showFormError('Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an elya.aftersales@gmail.com');
        }
    });
    
    // Formular Validierung
    function validateForm() {
        let isValid = true;
        
        // Alle Fehler zurücksetzen
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        // Betreff prüfen
        const subject = document.getElementById('subject');
        if (!subject.value) {
            showError(subject, 'Bitte wähle ein Anliegen aus.');
            isValid = false;
        }
        
        // Name prüfen
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError(name, 'Bitte gib deinen Namen ein.');
            isValid = false;
        }
        
        // E-Mail prüfen
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Bitte gib deine E-Mail-Adresse ein.');
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, 'Bitte gib eine gültige E-Mail-Adresse ein.');
            isValid = false;
        }
        
        // Nachricht prüfen
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError(message, 'Bitte gib deine Nachricht ein.');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Deine Nachricht sollte mindestens 10 Zeichen enthalten.');
            isValid = false;
        }
        
        // Datenschutz prüfen
        const privacy = document.getElementById('privacy');
        if (!privacy.checked) {
            const privacyGroup = privacy.closest('.form-group');
            privacyGroup.classList.add('error');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Fehler anzeigen
    function showError(input, message) {
        const group = input.closest('.form-group');
        group.classList.add('error');
        
        let errorEl = group.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            group.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }
    
    // Formular-Fehlermeldung anzeigen (inline, kein alert)
    function showFormError(message) {
        let errorBanner = document.getElementById('formErrorBanner');
        if (!errorBanner) {
            errorBanner = document.createElement('div');
            errorBanner.id = 'formErrorBanner';
            errorBanner.style.cssText = 'background:#fff3f3;border:1px solid #e74c3c;color:#c0392b;padding:16px 20px;border-radius:8px;margin-bottom:20px;font-family:Lato,sans-serif;font-size:14px;line-height:1.5;';
            form.parentNode.insertBefore(errorBanner, form);
        }
        errorBanner.textContent = message;
        errorBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Erfolg anzeigen
    function showSuccess() {
        setLoadingState(false);
        form.style.display = 'none';
        const formHeading = document.querySelector('.support-form-wrapper h2');
        if (formHeading) formHeading.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.classList.add('show');

        // Scroll zum Success Message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Mailto Fallback
    function sendViaMailto(data) {
        const recipient = 'elya.aftersales@gmail.com'; // Offizielle Elya Aftersales E-Mail
        
        const subject = encodeURIComponent(`[${data.subject_text}] Anfrage von ${data.name}`);
        const body = encodeURIComponent(
            `Anliegen: ${data.subject_text}\n` +
            `Name: ${data.name}\n` +
            `E-Mail: ${data.email}\n` +
            `Bestellnummer: ${data.order_number}\n\n` +
            `Nachricht:\n${data.message}`
        );
        
        // Öffne Mailto Link
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
        
        // Nach kurzer Verzögerung Erfolg zeigen
        setTimeout(() => {
            showSuccess();
        }, 1000);
    }
    
    // Loading State setzen
    function setLoadingState(loading) {
        if (loading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }
    
    // Echtzeit-Validierung bei Input
    document.querySelectorAll('.support-form input, .support-form select, .support-form textarea').forEach(input => {
        input.addEventListener('input', function() {
            const group = this.closest('.form-group');
            if (group.classList.contains('error')) {
                // Wenn der User anfängt zu tippen, Fehler entfernen
                if (this.value.trim()) {
                    group.classList.remove('error');
                }
            }
        });
    });
    
    // Formular zurücksetzen Button (falls gewünscht)
    const resetForm = document.getElementById('resetForm');
    if (resetForm) {
        resetForm.addEventListener('click', function() {
            form.reset();
            form.style.display = 'flex';
            const formHeading = document.querySelector('.support-form-wrapper h2');
            if (formHeading) formHeading.style.display = 'block';
            successMessage.style.display = 'none';
            successMessage.classList.remove('show');
            
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
        });
    }
});

// Alternative: Formspree Integration (noch einfacher, keine Registrierung nötig)
// Ersetze die form action mit: action="https://formspree.io/f/YOUR_FORM_ID"
// Und ändere die form method zu: method="POST"
// Dann wird das Formular automatisch an deine E-Mail gesendet
