/* ========================================
   PROFILE PAGE FUNCTIONALITY
   Handles profile data display, editing,
   and password changes
   ======================================== */

// Initialize profile page
document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in
    const currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = '/pages/login.html';
        return;
    }

    initializeProfile();
    initializeSectionNavigation();
    initializePersonalDataEditing();
    initializePasswordChange();
    initializeLogout();
});

/* ========================================
   INITIALIZE PROFILE
   ======================================== */

function initializeProfile() {
    const currentUser = getCurrentUser();

    if (!currentUser) return;

    // Display personal data
    document.getElementById('firstName-display').textContent = currentUser.firstName || '-';
    document.getElementById('lastName-display').textContent = currentUser.lastName || '-';
    document.getElementById('email-display').textContent = currentUser.email || '-';
    document.getElementById('phone-display').textContent = currentUser.phone || '-';

    // Format created date
    if (currentUser.createdAt) {
        const date = new Date(currentUser.createdAt);
        const formattedDate = date.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('createdAt-display').textContent = formattedDate;
    }

    // Set input values for editing
    document.getElementById('firstName-input').value = currentUser.firstName || '';
    document.getElementById('lastName-input').value = currentUser.lastName || '';
    document.getElementById('email-input').value = currentUser.email || '';
    document.getElementById('phone-input').value = currentUser.phone || '';
}

/* ========================================
   SECTION NAVIGATION
   ======================================== */

function initializeSectionNavigation() {
    const navItems = document.querySelectorAll('.profile-nav-item:not(.logout)');

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const section = this.dataset.section;
            showSection(section);

            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.profile-section');
    sections.forEach(section => section.classList.remove('active'));

    // Show selected section
    const selectedSection = document.getElementById(sectionName + '-section');
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

/* ========================================
   PERSONAL DATA EDITING
   ======================================== */

function initializePersonalDataEditing() {
    const editBtn = document.getElementById('editPersonalBtn');
    const saveBtn = document.getElementById('savePersonalBtn');
    const cancelBtn = document.getElementById('cancelPersonalBtn');
    const actionButtons = document.getElementById('personal-actions');
    const message = document.getElementById('personal-message');

    let isEditing = false;

    // Toggle edit mode
    editBtn.addEventListener('click', function () {
        isEditing = !isEditing;

        if (isEditing) {
            enablePersonalDataEditing();
            editBtn.textContent = 'Abbrechen';
            editBtn.classList.add('editing');
            actionButtons.style.display = 'flex';
        } else {
            disablePersonalDataEditing();
            editBtn.textContent = 'Bearbeiten';
            editBtn.classList.remove('editing');
            actionButtons.style.display = 'none';
            message.className = 'message';
            message.textContent = '';
        }
    });

    // Save changes
    saveBtn.addEventListener('click', function () {
        savePersonalData();
    });

    // Cancel editing
    cancelBtn.addEventListener('click', function () {
        disablePersonalDataEditing();
        editBtn.textContent = 'Bearbeiten';
        editBtn.classList.remove('editing');
        actionButtons.style.display = 'none';
        isEditing = false;
        message.className = 'message';
        message.textContent = '';
    });
}

function enablePersonalDataEditing() {
    const fields = ['firstName', 'lastName', 'email', 'phone'];

    fields.forEach(field => {
        const display = document.getElementById(field + '-display');
        const input = document.getElementById(field + '-input');

        if (display && input) {
            display.style.display = 'none';
            input.style.display = 'block';
        }
    });
}

function disablePersonalDataEditing() {
    const fields = ['firstName', 'lastName', 'email', 'phone'];

    fields.forEach(field => {
        const display = document.getElementById(field + '-display');
        const input = document.getElementById(field + '-input');

        if (display && input) {
            display.style.display = 'block';
            input.style.display = 'none';
        }
    });
}

function savePersonalData() {
    const message = document.getElementById('personal-message');

    const firstName = document.getElementById('firstName-input').value.trim();
    const lastName = document.getElementById('lastName-input').value.trim();
    const email = document.getElementById('email-input').value.trim();
    const phone = document.getElementById('phone-input').value.trim();

    // Validation
    if (!firstName) {
        showMessage('personal-message', 'Vorname ist erforderlich', 'error');
        return;
    }

    if (!lastName) {
        showMessage('personal-message', 'Nachname ist erforderlich', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showMessage('personal-message', 'Bitte geben Sie eine gültige E-Mail-Adresse ein', 'error');
        return;
    }

    // Update user profile
    const result = updateUserProfile({
        firstName,
        lastName,
        email,
        phone
    });

    if (result.success) {
        showMessage('personal-message', 'Profil erfolgreich aktualisiert', 'success');

        // Update display
        document.getElementById('firstName-display').textContent = firstName;
        document.getElementById('lastName-display').textContent = lastName;
        document.getElementById('email-display').textContent = email;
        document.getElementById('phone-display').textContent = phone || '-';

        // Exit edit mode
        setTimeout(() => {
            disablePersonalDataEditing();
            document.getElementById('editPersonalBtn').textContent = 'Bearbeiten';
            document.getElementById('editPersonalBtn').classList.remove('editing');
            document.getElementById('personal-actions').style.display = 'none';
        }, 1500);
    } else {
        showMessage('personal-message', result.error || 'Ein Fehler ist aufgetreten', 'error');
    }
}

/* ========================================
   PASSWORD CHANGE
   ======================================== */

function initializePasswordChange() {
    const form = document.getElementById('passwordForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        handlePasswordChange();
    });
}

function handlePasswordChange() {
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('password-message');

    // Clear previous errors
    clearPasswordErrors();

    // Validation
    if (!oldPassword) {
        showError('oldPasswordError', 'Altes Passwort ist erforderlich');
        return;
    }

    if (!newPassword) {
        showError('newPasswordError', 'Neues Passwort ist erforderlich');
        return;
    }

    if (newPassword !== confirmPassword) {
        showError('confirmPasswordError', 'Passwörter stimmen nicht überein');
        return;
    }

    // Change password
    const result = changePassword(oldPassword, newPassword);

    if (result.success) {
        showMessage('password-message', 'Passwort erfolgreich geändert', 'success');
        document.getElementById('passwordForm').reset();

        setTimeout(() => {
            message.className = 'message';
            message.textContent = '';
        }, 3000);
    } else {
        showMessage('password-message', result.error || 'Ein Fehler ist aufgetreten', 'error');
    }
}

function clearPasswordErrors() {
    const errors = ['oldPasswordError', 'newPasswordError', 'confirmPasswordError'];
    errors.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = '';
            element.classList.remove('show');
        }
    });
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.add('show');
    }
}

function showMessage(elementId, text, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
        element.className = 'message ' + type;
    }
}

/* ========================================
   LOGOUT
   ======================================== */

function initializeLogout() {
    const logoutBtn = document.getElementById('logoutProfileBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            if (confirm('Möchtest du dich wirklich abmelden?')) {
                logoutUser();
            }
        });
    }
}
