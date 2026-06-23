// ========== API Configuration ==========
const API_CONFIG = {
  modelProvider: "OpenAI",
  model: "gpt-5.5",
  baseUrl: "https://shaobianer.com",
  apiKey: "sk-03d431ea64e48804e09d1eecd140aa07af161f117c1b62a2e65a55c977554138",
  wireApi: "responses",
  requiresAuth: true,
};

// ========== App Configuration ==========
const APP_CONFIG = {
  defaultLanguage: "zh", // 'zh' | 'en'
  examBoard: "Edexcel", // 'Edexcel' | 'AQA' | 'OCR'
  maxHistoryItems: 200,
  animationSpeed: 1.0,
  enableDarkMode: false,
  autoSaveInterval: 30000, // ms
};

// ========== Topic Metadata ==========
const TOPICS = {
  "algebra":          { id: "algebra",    nameZh: "代数",         nameEn: "Algebra",           icon: "📐", module: "pure" },
  "quadratics":       { id: "quadratics", nameZh: "二次函数",     nameEn: "Quadratics",        icon: "📈", module: "pure" },
  "functions":        { id: "functions",  nameZh: "函数",         nameEn: "Functions",         icon: "🔄", module: "pure" },
  "trigonometry":     { id: "trigo",      nameZh: "三角学",       nameEn: "Trigonometry",      icon: "🔺", module: "pure" },
  "calculus":         { id: "calculus",   nameZh: "微积分",       nameEn: "Calculus",          icon: "∫",  module: "pure" },
  "sequences":        { id: "sequences",  nameZh: "数列与级数",   nameEn: "Sequences & Series",icon: "🔢", module: "pure" },
  "vectors":          { id: "vectors",    nameZh: "向量",         nameEn: "Vectors",           icon: "➡️", module: "pure" },
  "exponentials":     { id: "exponentials",nameZh:"指数与对数",   nameEn: "Exponentials & Logs",icon:"📊", module: "pure" },
  "statistics":       { id: "statistics", nameZh: "统计学",       nameEn: "Statistics",        icon: "📉", module: "stats" },
  "mechanics":        { id: "mechanics",  nameZh: "力学",         nameEn: "Mechanics",         icon: "⚡", module: "mech" },
};

// ========== Save/Load Config ==========
function saveSettings() {
  localStorage.setItem("alevel_config", JSON.stringify(APP_CONFIG));
  localStorage.setItem("alevel_api", JSON.stringify(API_CONFIG));
}

function loadSettings() {
  try {
    const cfg = JSON.parse(localStorage.getItem("alevel_config"));
    if (cfg) Object.assign(APP_CONFIG, cfg);
    const api = JSON.parse(localStorage.getItem("alevel_api"));
    if (api) Object.assign(API_CONFIG, api);
  } catch(e) { /* use defaults */ }
}
loadSettings();