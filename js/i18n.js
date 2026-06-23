// ========== i18n Language Packs (Chinese & English) ==========
const LANG = {
  zh: {
    // Header
    appTitle: "📐 A-Level 数学实验室",
    subTitle: "自动出题 · 可视化课件 · AI 智能辅导",
    toggleEn: "EN",
    toggleZh: "中文",

    // Navigation
    tabPractice: "练习模式",
    tabExplore: "可视化探索",
    tabStats: "学习统计",

    // Topic bar
    topicLabel: "知识模块：",
    difficultyLabel: "难度：",
    difficultyEasy: "基础",
    difficultyMedium: "中等",
    difficultyHard: "进阶",
    newQuestion: "出新题",
    hint: "提示",

    // Answer area
    answerLabel: "你的答案：",
    answerPlaceholder: "输入你的答案...",
    submit: "提交批改",
    correct: "✅ 正确！",
    incorrect: "❌ 不正确",
    correctAnswer: "正确答案：",
    solution: "解题步骤：",
    continue: "继续下一题",
    retry: "重试",
    showHint: "查看提示",
    hintText: "💡 提示：",

    // Visualization
    vizPlay: "▶ 播放",
    vizPause: "⏸ 暂停",
    vizReset: "↺ 重置",
    vizSpeed: "速度：",

    // Stats
    statsTitle: "学习统计",
    statsTotal: "总题数",
    statsCorrect: "正确数",
    statsRate: "正确率",
    statsToday: "今日",
    statsWeek: "本周",
    statsByTopic: "按知识点分布",

    // AI Assistant
    aiTitle: "🤖 AI 学习助手",
    aiPlaceholder: "输入你的问题...",
    aiSend: "发送",
    aiThinking: "思考中...",
    aiError: "抱歉，出错了，请稍后重试。",
    aiWelcome: "你好！我是你的 A-Level 数学学习助手。\n\n你可以问我：\n• 这道题该怎么解？\n• 请解释一下链式法则\n• 给我出一道更难的积分题\n• 概率分布是什么？",

    // Settings
    settingsTitle: "⚙️ 设置",
    settingsLanguage: "界面语言",
    settingsExamBoard: "A-Level 考试局",
    settingsApiKey: "API Key",
    settingsModel: "AI 模型",
    settingsBaseUrl: "API 地址",
    settingsSave: "保存设置",
    settingsDarkMode: "深色模式",
    settingsSaved: "✅ 设置已保存",

    // Math topics (overrides)
    topicAlgebra: "代数",
    topicQuadratics: "二次函数",
    topicFunctions: "函数",
    topicTrigo: "三角学",
    topicCalculus: "微积分",
    topicSequences: "数列与级数",
    topicVectors: "向量",
    topicExponentials: "指数与对数",
    topicStatistics: "统计学",
    topicMechanics: "力学",

    // General
    loading: "加载中...",
    noData: "暂无数据",
    back: "返回",
    close: "关闭",
  },

  en: {
    // Header
    appTitle: "📐 A-Level Maths Lab",
    subTitle: "Auto-generate · Visualise · AI Tutor",
    toggleEn: "EN",
    toggleZh: "中文",

    // Navigation
    tabPractice: "Practice",
    tabExplore: "Visual Explorer",
    tabStats: "Statistics",

    // Topic bar
    topicLabel: "Topic:",
    difficultyLabel: "Difficulty:",
    difficultyEasy: "Easy",
    difficultyMedium: "Medium",
    difficultyHard: "Hard",
    newQuestion: "New Question",
    hint: "Hint",

    // Answer area
    answerLabel: "Your Answer:",
    answerPlaceholder: "Enter your answer...",
    submit: "Submit",
    correct: "✅ Correct!",
    incorrect: "❌ Incorrect",
    correctAnswer: "Correct Answer:",
    solution: "Solution:",
    continue: "Continue",
    retry: "Retry",
    showHint: "Show Hint",
    hintText: "💡 Hint:",

    // Visualization
    vizPlay: "▶ Play",
    vizPause: "⏸ Pause",
    vizReset: "↺ Reset",
    vizSpeed: "Speed:",

    // Stats
    statsTitle: "Learning Statistics",
    statsTotal: "Total",
    statsCorrect: "Correct",
    statsRate: "Accuracy",
    statsToday: "Today",
    statsWeek: "This Week",
    statsByTopic: "By Topic",

    // AI Assistant
    aiTitle: "🤖 AI Assistant",
    aiPlaceholder: "Ask me anything...",
    aiSend: "Send",
    aiThinking: "Thinking...",
    aiError: "Sorry, something went wrong. Please try again.",
    aiWelcome: "Hello! I'm your A-Level Maths AI tutor.\n\nYou can ask me:\n• How to solve this problem?\n• Explain the chain rule\n• Give me a harder integration problem\n• What is a probability distribution?",

    // Settings
    settingsTitle: "⚙️ Settings",
    settingsLanguage: "Language",
    settingsExamBoard: "Exam Board",
    settingsApiKey: "API Key",
    settingsModel: "Model",
    settingsBaseUrl: "API Base URL",
    settingsSave: "Save",
    settingsDarkMode: "Dark Mode",
    settingsSaved: "✅ Settings Saved",

    // Math topics (overrides)
    topicAlgebra: "Algebra",
    topicQuadratics: "Quadratics",
    topicFunctions: "Functions",
    topicTrigo: "Trigonometry",
    topicCalculus: "Calculus",
    topicSequences: "Sequences & Series",
    topicVectors: "Vectors",
    topicExponentials: "Exponentials & Logs",
    topicStatistics: "Statistics",
    topicMechanics: "Mechanics",

    // General
    loading: "Loading...",
    noData: "No Data",
    back: "Back",
    close: "Close",
  }
};

// ========== i18n Manager ==========
class I18n {
  constructor() {
    this.lang = APP_CONFIG.defaultLanguage || "zh";
  }

  t(key) {
    return (LANG[this.lang] && LANG[this.lang][key]) || LANG["zh"][key] || key;
  }

  getLang() { return this.lang; }
  setLang(l) { this.lang = l; APP_CONFIG.defaultLanguage = l; saveSettings(); }

  // Update all elements with data-i18n attributes
  applyToDOM() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const text = this.t(key);
      if (el.tagName === "INPUT" && el.type === "text") {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });
    document.querySelectorAll("[data-i18n-title]").forEach(el => {
      el.title = this.t(el.getAttribute("data-i18n-title"));
    });
  }
}

const i18n = new I18n();