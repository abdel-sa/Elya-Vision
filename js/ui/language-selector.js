/**
 * Language Selector UI Component
 * Handles language switching and dropdown interactions
 */

import { getCurrentLanguage, setCurrentLanguage, updatePageTranslations } from '../services/i18n-service.js';

/**
 * Initialize language selector
 */
export function initLanguageSelector() {
  const languageBtn = document.getElementById('languageBtn');
  const languageDropdown = document.getElementById('languageDropdown');
  const languageOptions = document.querySelectorAll('.language-option');
  const languageCodeEl = document.querySelector('.language-code');

  if (!languageBtn || !languageDropdown) {
    console.log('⚠️ Language selector elements not found');
    return;
  }

  // Set initial language display
  const currentLang = getCurrentLanguage();
  if (languageCodeEl) {
    languageCodeEl.textContent = currentLang.toUpperCase();
  }

  // Mark active language option
  languageOptions.forEach((option) => {
    if (option.dataset.lang === currentLang) {
      option.classList.add('active');
    }
  });

  // Toggle dropdown on button click
  languageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
      languageDropdown.classList.remove('active');
    }
  });

  // Handle language selection
  languageOptions.forEach((option) => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedLang = option.dataset.lang;

      if (selectedLang === getCurrentLanguage()) {
        languageDropdown.classList.remove('active');
        return;
      }

      // Update language
      if (setCurrentLanguage(selectedLang)) {
        console.log(`✅ Language changed to: ${selectedLang.toUpperCase()}`);

        // Reload page to apply language changes
        window.location.reload();
      }
    });
  });

  // Update page translations on init
  updatePageTranslations();

  console.log('✅ Language selector initialized');
}
