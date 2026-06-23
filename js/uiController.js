// ========== UI Controller ==========
class UIController {
  constructor() {
    this.viz = null;
    this.vizManager = null;
    this.activeTab = 'practice';
    this.currentTopic = 'algebra';
    this.currentDifficulty = 'medium';
    this.isHintShown = false;
    this.isSubmitted = false;
    this.isSettingsOpen = false;

    this.elements = {};
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.renderTopicBar();
    this.generateNewQuestion();
    this.updateStatsFooter();
    this.renderWelcomeMessage();
    this.applyLanguage();

    // Initialize canvas after DOM ready
    setTimeout(() => this.initCanvas(), 100);
    window.addEventListener('resize', () => {
      if (this.viz) { this.viz.resize(); this.viz.render(); }
    });
  }

  cacheElements() {
    const $ = (sel) => document.getElementById(sel) || document.querySelector(sel);
    this.elements = {
      // Header
      appTitle: document.getElementById('app-title'),
      appSubtitle: document.getElementById('app-subtitle'),
      btnLang: document.getElementById('btn-lang'),
      btnSettings: document.getElementById('btn-settings'),

      // Tabs
      tabPractice: document.getElementById('tab-practice'),
      tabExplore: document.getElementById('tab-explore'),
      tabStats: document.getElementById('tab-stats'),

      // Topic bar
      topicBar: document.getElementById('topic-bar'),
      difficultySelect: document.getElementById('difficulty-select'),
      btnNewQuestion: document.getElementById('btn-new-question'),

      // Question panel (left)
      topicBadge: document.getElementById('topic-badge'),
      difficultyBadge: document.getElementById('difficulty-badge'),
      questionBody: document.getElementById('question-body'),
      btnHint: document.getElementById('btn-hint'),
      hintText: document.getElementById('hint-text'),

      // Viz panel (center)
      vizCanvas: document.getElementById('viz-canvas'),
      vizPlaceholder: document.getElementById('viz-placeholder'),
      vizControls: document.getElementById('viz-controls'),

      // Answer panel (right)
      answerInput: document.getElementById('answer-input'),
      btnSubmit: document.getElementById('btn-submit'),
      answerFeedback: document.getElementById('answer-feedback'),
      correctAnswerDisplay: document.getElementById('correct-answer-display'),
      solutionBox: document.getElementById('solution-box'),
      btnContinue: document.getElementById('btn-continue'),
      btnRetry: document.getElementById('btn-retry'),

      // Stats panel
      panelPractice: document.getElementById('panel-practice'),
      panelStats: document.getElementById('panel-stats'),
      statsGrid: document.getElementById('stats-grid'),
      topicStatsList: document.getElementById('topic-stats-list'),

      // AI Drawer
      drawerOverlay: document.getElementById('drawer-overlay'),
      aiDrawer: document.getElementById('ai-drawer'),
      drawerClose: document.getElementById('drawer-close'),
      drawerMessages: document.getElementById('drawer-messages'),
      drawerInput: document.getElementById('drawer-input'),
      drawerSend: document.getElementById('drawer-send'),
      aiFloatBtn: document.getElementById('ai-float-btn'),

      // Settings modal
      settingsOverlay: document.getElementById('settings-overlay'),
      settingsClose: document.getElementById('settings-close'),
      settingsLanguage: document.getElementById('settings-language'),
      settingsExamBoard: document.getElementById('settings-exam-board'),
      settingsApiKey: document.getElementById('settings-api-key'),
      settingsModel: document.getElementById('settings-model'),
      settingsBaseUrl: document.getElementById('settings-base-url'),
      settingsDarkMode: document.getElementById('settings-dark-mode'),
      settingsSave: document.getElementById('settings-save'),

      // Footer
      footerAccuracy: document.getElementById('footer-accuracy'),
      footerTotal: document.getElementById('footer-total'),
      footerStreak: document.getElementById('footer-streak'),
    };
  }

  bindEvents() {
    const e = this.elements;

    // Language toggle
    e.btnLang.addEventListener('click', () => this.toggleLanguage());

    // Settings
    e.btnSettings.addEventListener('click', () => this.openSettings());
    e.settingsOverlay.addEventListener('click', (ev) => {
      if (ev.target === e.settingsOverlay) this.closeSettings();
    });
    e.settingsClose.addEventListener('click', () => this.closeSettings());
    e.settingsSave.addEventListener('click', () => this.saveSettings());

    // Tabs
    e.tabPractice.addEventListener('click', () => this.switchTab('practice'));
    e.tabExplore.addEventListener('click', () => this.switchTab('explore'));
    e.tabStats.addEventListener('click', () => this.switchTab('stats'));

    // Topic & Difficulty
    e.difficultySelect.addEventListener('change', () => {
      this.currentDifficulty = e.difficultySelect.value;
      this.generateNewQuestion();
    });
    e.btnNewQuestion.addEventListener('click', () => this.generateNewQuestion());

    // Question
    e.btnHint.addEventListener('click', () => this.showHint());

    // Answer
    e.btnSubmit.addEventListener('click', () => this.submitAnswer());
    e.answerInput.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') this.submitAnswer();
    });
    e.btnContinue.addEventListener('click', () => this.generateNewQuestion());
    e.btnRetry.addEventListener('click', () => this.resetAnswer());

    // AI Drawer
    e.aiFloatBtn.addEventListener('click', () => this.toggleDrawer());
    e.drawerOverlay.addEventListener('click', () => this.toggleDrawer());
    e.drawerClose.addEventListener('click', () => this.toggleDrawer());
    e.drawerSend.addEventListener('click', () => this.sendAIMessage());
    e.drawerInput.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' && !ev.shiftKey) {
        ev.preventDefault();
        this.sendAIMessage();
      }
    });

    // Dark mode
    if (e.settingsDarkMode) {
      e.settingsDarkMode.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', e.settingsDarkMode.checked);
      });
    }
  }

  // ========== Language ==========
  toggleLanguage() {
    const newLang = i18n.getLang() === 'zh' ? 'en' : 'zh';
    i18n.setLang(newLang);
    this.applyLanguage();
    this.generateNewQuestion();
    // Update welcome message
    this.renderWelcomeMessage();
  }

  applyLanguage() {
    i18n.applyToDOM();
    // Update dynamic elements
    this.updateTopicBadge();
    this.updateDifficultyBadge();
    this.updateStatsFooter();
    // Viz theme
    if (this.viz) {
      this.viz.applyTheme(document.body.classList.contains('dark-mode'));
    }
  }

  // ========== Tabs ==========
  switchTab(tab) {
    this.activeTab = tab;
    const e = this.elements;
    e.tabPractice.classList.toggle('active', tab === 'practice');
    e.tabExplore.classList.toggle('active', tab === 'explore');
    e.tabStats.classList.toggle('active', tab === 'stats');

    if (tab === 'stats') {
      e.panelPractice.classList.add('hidden');
      e.panelStats.classList.remove('hidden');
      this.renderStats();
    } else {
      e.panelPractice.classList.remove('hidden');
      e.panelStats.classList.add('hidden');
    }
  }

  // ========== Topic Bar ==========
  renderTopicBar() {
    const bar = this.elements.topicBar;
    if (!bar) return;

    // Clear existing pills
    bar.querySelectorAll('.topic-pill').forEach(el => el.remove());

    Object.values(TOPICS).forEach(topic => {
      const pill = document.createElement('span');
      pill.className = 'topic-pill';
      pill.dataset.topic = topic.id;
      pill.innerHTML = `<span class="topic-icon">${topic.icon}</span> ${i18n.getLang() === 'zh' ? topic.nameZh : topic.nameEn}`;

      if (topic.id === this.currentTopic) pill.classList.add('active');

      pill.addEventListener('click', () => {
        this.currentTopic = topic.id;
        bar.querySelectorAll('.topic-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.generateNewQuestion();
        this.updateTopicBadge();
        this.applyLanguage();
      });

      // Insert before difficulty select
      const diffSelect = this.elements.difficultySelect;
      if (diffSelect) bar.insertBefore(pill, diffSelect);
    });
  }

  updateTopicBadge() {
    const topic = TOPICS[this.currentTopic];
    if (!topic) return;
    const badge = this.elements.topicBadge;
    if (badge) {
      badge.textContent = i18n.getLang() === 'zh' ? topic.nameZh : topic.nameEn;
    }
  }

  updateDifficultyBadge() {
    const badge = this.elements.difficultyBadge;
    if (!badge) return;
    const diff = this.currentDifficulty;
    badge.className = 'difficulty-badge ' + diff;
    const labels = { easy: i18n.t('difficultyEasy'), medium: i18n.t('difficultyMedium'), hard: i18n.t('difficultyHard') };
    badge.textContent = labels[diff] || diff;
  }

  // ========== Question ==========
  generateNewQuestion() {
    this.isSubmitted = false;
    this.isHintShown = false;

    // Generate
    const q = questionGenerator.generate(this.currentTopic, this.currentDifficulty);

    // Update UI
    const e = this.elements;
    e.questionBody.innerHTML = questionGenerator.getQuestionText();
    e.hintText.classList.add('hidden');
    e.hintText.textContent = '';
    e.answerFeedback.classList.add('hidden');
    e.answerFeedback.textContent = '';
    e.correctAnswerDisplay.classList.add('hidden');
    e.solutionBox.classList.add('hidden');
    e.btnContinue.classList.add('hidden');
    e.btnRetry.classList.add('hidden');
    e.btnSubmit.classList.remove('hidden');
    e.answerInput.value = '';
    e.answerInput.disabled = false;
    e.answerInput.focus();

    // Update badges
    this.updateTopicBadge();
    this.updateDifficultyBadge();

    // Update visualization
    this.updateVisualization(q);

    // Render KaTeX
    this.renderKaTeX();
  }

  showHint() {
    this.isHintShown = true;
    const e = this.elements;
    e.hintText.innerHTML = i18n.t('hintText') + ' ' + questionGenerator.getHintText();
    e.hintText.classList.remove('hidden');
    this.renderKaTeX();
  }

  // ========== Answer ==========
  submitAnswer() {
    if (this.isSubmitted) return;

    const e = this.elements;
    const rawAnswer = e.answerInput.value;
    const q = questionGenerator.currentQuestion;

    if (!q) return;

    const result = gradingEngine.grade(rawAnswer, q);

    this.isSubmitted = true;
    e.answerInput.disabled = true;

    // Show feedback
    e.answerFeedback.textContent = result.feedback;
    e.answerFeedback.className = 'answer-feedback ' + (result.correct ? 'correct' : 'incorrect');
    e.answerFeedback.classList.remove('hidden');

    // Show correct answer if wrong
    if (!result.correct) {
      e.correctAnswerDisplay.innerHTML = i18n.t('correctAnswer') + ' ' + result.correctAnswer;
      e.correctAnswerDisplay.classList.remove('hidden');
    }

    // Show solution
    e.solutionBox.innerHTML = `<strong>${i18n.t('solution')}</strong><br>` + questionGenerator.getSolutionText().replace(/\\n/g, '<br>');
    e.solutionBox.classList.remove('hidden');

    // Show buttons
    e.btnSubmit.classList.add('hidden');
    e.btnContinue.classList.remove('hidden');
    e.btnRetry.classList.remove('hidden');

    // Record stats
    statsManager.recordAnswer(this.currentTopic, this.currentDifficulty, result.correct);
    this.updateStatsFooter();

    this.renderKaTeX();
  }

  resetAnswer() {
    const e = this.elements;
    e.answerInput.value = '';
    e.answerInput.disabled = false;
    e.answerFeedback.classList.add('hidden');
    e.correctAnswerDisplay.classList.add('hidden');
    e.solutionBox.classList.add('hidden');
    e.btnSubmit.classList.remove('hidden');
    e.btnContinue.classList.add('hidden');
    e.btnRetry.classList.add('hidden');
    e.answerInput.focus();
    this.isSubmitted = false;
  }

  // ========== Visualization ==========
  initCanvas() {
    const canvas = this.elements.vizCanvas;
    if (!canvas) return;

    this.viz = new MathViz(canvas);
    this.vizManager = new VisualizationManager(this.viz);

    // Apply dark mode if active
    if (document.body.classList.contains('dark-mode')) {
      this.viz.applyTheme(true);
    }

    // Render placeholder
    this.vizManager.drawPlaceholder();
  }

  updateVisualization(question) {
    if (!this.vizManager) {
      // Canvas not yet initialized, retry
      setTimeout(() => this.updateVisualization(question), 200);
      return;
    }
    this.vizManager.update(question);
  }

  // ========== Stats ==========
  updateStatsFooter() {
    const e = this.elements;
    if (e.footerAccuracy) e.footerAccuracy.textContent = `${i18n.t('statsRate')}: ${statsManager.getAccuracy()}%`;
    if (e.footerTotal) e.footerTotal.textContent = `${i18n.t('statsTotal')}: ${statsManager.getTotal()}`;
    if (e.footerStreak) e.footerStreak.textContent = `🔥 ${statsManager.getStreak()}`;
  }

  renderStats() {
    // Stats grid
    const total = statsManager.getTotal();
    const correct = statsManager.getCorrect();
    const accuracy = statsManager.getAccuracy();
    const today = statsManager.getTodayStats();
    const week = statsManager.getWeekStats();

    const grid = this.elements.statsGrid;
    if (grid) {
      const weekAccuracy = week.total > 0 ? Math.round((week.correct / week.total) * 100) : 0;
      grid.innerHTML = `
        <div class="stat-card">
          <div class="stat-value">${total}</div>
          <div class="stat-label">${i18n.t('statsTotal')}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${accuracy}%</div>
          <div class="stat-label">${i18n.t('statsRate')}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${today.total}</div>
          <div class="stat-label">${i18n.t('statsToday')}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${weekAccuracy}%</div>
          <div class="stat-label">${i18n.t('statsWeek')}</div>
        </div>
      `;
    }

    // Topic stats list
    const list = this.elements.topicStatsList;
    if (list) {
      const allStats = statsManager.getAllTopicStats();
      list.innerHTML = allStats.map(s => {
        const topic = TOPICS[s.id];
        const name = topic ? (i18n.getLang() === 'zh' ? topic.nameZh : topic.nameEn) : s.id;
        return `
          <div class="topic-stat-item">
            <span class="topic-stat-name">${topic ? topic.icon : ''} ${name}</span>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width:${s.accuracy}%"></div>
            </div>
            <span class="topic-stat-pct">${s.accuracy}%</span>
          </div>
        `;
      }).join('') || `<div class="text-muted">${i18n.t('noData')}</div>`;
    }
  }

  // ========== AI Drawer ==========
  toggleDrawer() {
    aiAssistant.isOpen ? this.closeDrawer() : this.openDrawer();
  }

  openDrawer() {
    aiAssistant.open();
    const e = this.elements;
    e.drawerOverlay.classList.add('open');
    e.aiDrawer.classList.add('open');
    e.drawerInput.focus();
  }

  closeDrawer() {
    aiAssistant.close();
    const e = this.elements;
    e.drawerOverlay.classList.remove('open');
    e.aiDrawer.classList.remove('open');
  }

  renderWelcomeMessage() {
    const msg = aiAssistant.getWelcomeMessage();
    aiAssistant.messages = [msg];
    this.renderAIMessages();
  }

  renderAIMessages() {
    const container = this.elements.drawerMessages;
    if (!container) return;

    container.innerHTML = aiAssistant.messages.map(m => {
      const cls = m.role === 'user' ? 'user' : 'bot';
      return `<div class="ai-msg ${cls}">${this.escapeHtml(m.content)}</div>`;
    }).join('');

    container.scrollTop = container.scrollHeight;
  }

  async sendAIMessage() {
    const input = this.elements.drawerInput;
    const text = input.value.trim();
    if (!text || aiAssistant.isLoading) return;

    input.value = '';
    input.disabled = true;
    this.elements.drawerSend.disabled = true;

    // Show user message
    aiAssistant.messages.push({ role: 'user', content: text, timestamp: Date.now() });
    this.renderAIMessages();

    // Show thinking
    const thinkingEl = document.createElement('div');
    thinkingEl.className = 'ai-msg bot';
    thinkingEl.textContent = i18n.t('aiThinking');
    this.elements.drawerMessages.appendChild(thinkingEl);
    this.elements.drawerMessages.scrollTop = this.elements.drawerMessages.scrollHeight;

    // Send to API
    const response = await aiAssistant.sendMessage(text);

    // Remove thinking
    thinkingEl.remove();

    // Render all messages
    this.renderAIMessages();

    input.disabled = false;
    this.elements.drawerSend.disabled = false;
    input.focus();

    // Render KaTeX in messages
    this.renderKaTeX();
  }

  // ========== Settings ==========
  openSettings() {
    this.isSettingsOpen = true;
    const e = this.elements;
    e.settingsOverlay.classList.add('open');
    // Load current values
    e.settingsLanguage.value = i18n.getLang();
    e.settingsExamBoard.value = APP_CONFIG.examBoard;
    e.settingsApiKey.value = API_CONFIG.apiKey;
    e.settingsBaseUrl.value = API_CONFIG.baseUrl;
    e.settingsDarkMode.checked = document.body.classList.contains('dark-mode');

    // Populate model dropdown
    this.populateModelSelect();
  }

  /**
   * Populate the model dropdown with API_MODELS presets.
   * Uses multiple fallback strategies to always find a match.
   */
  populateModelSelect() {
    var select = this.elements.settingsModel;
    if (!select) return;
    select.innerHTML = '';

    // Strategy 1: exact match (model + baseUrl)
    var currentModelId = null;
    for (var i = 0; i < API_MODELS.length; i++) {
      if (API_MODELS[i].model === API_CONFIG.model && API_MODELS[i].baseUrl === API_CONFIG.baseUrl) {
        currentModelId = API_MODELS[i].id;
        break;
      }
    }

    // Strategy 2: match by model name only
    if (!currentModelId) {
      for (var j = 0; j < API_MODELS.length; j++) {
        if (API_MODELS[j].model === API_CONFIG.model) {
          currentModelId = API_MODELS[j].id;
          break;
        }
      }
    }

    // Strategy 3: match by provider
    if (!currentModelId) {
      for (var k = 0; k < API_MODELS.length; k++) {
        if (API_MODELS[k].provider === API_CONFIG.modelProvider) {
          currentModelId = API_MODELS[k].id;
          break;
        }
      }
    }

    // Fallback: use first model in the list
    if (!currentModelId && API_MODELS.length > 0) {
      currentModelId = API_MODELS[0].id;
    }

    // Build option elements
    for (var n = 0; n < API_MODELS.length; n++) {
      var m = API_MODELS[n];
      var opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = m.name;
      if (m.id === currentModelId) {
        opt.selected = true;
      }
      select.appendChild(opt);
    }
  }

  closeSettings() {
    this.isSettingsOpen = false;
    this.elements.settingsOverlay.classList.remove('open');
  }

  saveSettings() {
    const e = this.elements;

    // Language
    const newLang = e.settingsLanguage.value;
    if (newLang !== i18n.getLang()) {
      i18n.setLang(newLang);
      this.applyLanguage();
      this.generateNewQuestion();
    }

    // Exam board
    APP_CONFIG.examBoard = e.settingsExamBoard.value;

    // API - Apply model preset from dropdown
    var selectedModelId = e.settingsModel.value;
    if (selectedModelId && typeof API_MODELS !== 'undefined') {
      for (var i = 0; i < API_MODELS.length; i++) {
        if (API_MODELS[i].id === selectedModelId) {
          var preset = API_MODELS[i];
          API_CONFIG.modelProvider = preset.provider;
          API_CONFIG.model = preset.model;
          API_CONFIG.baseUrl = preset.baseUrl;
          API_CONFIG.apiKey = preset.apiKey;
          break;
        }
      }
    }
    // Also update apiKey and baseUrl from manual inputs if changed
    if (e.settingsApiKey.value && e.settingsApiKey.value !== API_CONFIG.apiKey) {
      API_CONFIG.apiKey = e.settingsApiKey.value;
    }
    if (e.settingsBaseUrl.value && e.settingsBaseUrl.value !== API_CONFIG.baseUrl) {
      API_CONFIG.baseUrl = e.settingsBaseUrl.value;
    }

    // Dark mode
    const dark = e.settingsDarkMode.checked;
    document.body.classList.toggle('dark-mode', dark);
    APP_CONFIG.enableDarkMode = dark;
    if (this.viz) this.viz.applyTheme(dark);

    saveSettings();
    this.closeSettings();

    // Flash saved indicator
    alert(i18n.t('settingsSaved'));
  }

  // ========== Utilities ==========
  renderKaTeX() {
    // Render KaTeX if available
    if (typeof renderMathInElement !== 'undefined') {
      renderMathInElement(document.body, {
        delimiters: [
          { left: '\\\\(', right: '\\\\)', display: false },
          { left: '\\\\[', right: '\\\\]', display: true },
        ],
        throwOnError: false,
      });
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

const uiController = new UIController();