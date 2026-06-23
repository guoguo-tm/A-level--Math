// ========== App Bootstrap ==========
document.addEventListener('DOMContentLoaded', () => {
  // Apply dark mode if previously set
  if (APP_CONFIG.enableDarkMode) {
    document.body.classList.add('dark-mode');
  }

  // Initialize UI Controller (this starts everything)
  uiController.init();

  // Auto-save stats periodically
  setInterval(() => {
    statsManager.save();
  }, APP_CONFIG.autoSaveInterval);

  console.log('📐 A-Level Maths Lab initialized successfully!');
  console.log('Topics available:', Object.keys(TOPICS).length);
  console.log('Question generators:', Object.keys(questionGenerator.generators).length);
  console.log('Language:', i18n.getLang());
  console.log('Exam Board:', APP_CONFIG.examBoard);
});