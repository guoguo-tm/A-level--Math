// ========== Stats Manager ==========
class StatsManager {
  constructor() {
    this.storageKey = 'alevel_stats';
    this.data = this.load();
  }

  // Default structure
  getDefault() {
    return {
      totalQuestions: 0,
      totalCorrect: 0,
      streak: 0,
      bestStreak: 0,
      byTopic: {}, // { topicId: { total: n, correct: n } }
      byDifficulty: { easy: { total: 0, correct: 0 }, medium: { total: 0, correct: 0 }, hard: { total: 0, correct: 0 } },
      history: [], // [{ topic, difficulty, correct, timestamp }]
      daily: {}, // { 'YYYY-MM-DD': { total, correct } }
    };
  }

  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      const parsed = raw ? JSON.parse(raw) : null;
      // Merge with defaults to handle new fields
      return { ...this.getDefault(), ...parsed };
    } catch(e) {
      return this.getDefault();
    }
  }

  save() {
    try {
      // Limit history size
      if (this.data.history.length > APP_CONFIG.maxHistoryItems) {
        this.data.history = this.data.history.slice(-APP_CONFIG.maxHistoryItems);
      }
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch(e) { /* storage full */ }
  }

  recordAnswer(topic, difficulty, correct) {
    this.data.totalQuestions++;
    if (correct) {
      this.data.totalCorrect++;
      this.data.streak++;
      if (this.data.streak > this.data.bestStreak) this.data.bestStreak = this.data.streak;
    } else {
      this.data.streak = 0;
    }

    // By topic
    if (!this.data.byTopic[topic]) this.data.byTopic[topic] = { total: 0, correct: 0 };
    this.data.byTopic[topic].total++;
    if (correct) this.data.byTopic[topic].correct++;

    // By difficulty
    const diff = difficulty || 'medium';
    if (this.data.byDifficulty[diff]) {
      this.data.byDifficulty[diff].total++;
      if (correct) this.data.byDifficulty[diff].correct++;
    }

    // History
    this.data.history.push({
      topic, difficulty: diff, correct, timestamp: Date.now()
    });

    // Daily
    const today = new Date().toISOString().slice(0, 10);
    if (!this.data.daily[today]) this.data.daily[today] = { total: 0, correct: 0 };
    this.data.daily[today].total++;
    if (correct) this.data.daily[today].correct++;

    this.save();
  }

  // ===== Getters =====
  getTotal() { return this.data.totalQuestions; }
  getCorrect() { return this.data.totalCorrect; }
  getAccuracy() {
    return this.data.totalQuestions > 0
      ? Math.round((this.data.totalCorrect / this.data.totalQuestions) * 100)
      : 0;
  }
  getStreak() { return this.data.streak; }
  getBestStreak() { return this.data.bestStreak; }

  getTopicAccuracy(topicId) {
    const t = this.data.byTopic[topicId];
    if (!t || t.total === 0) return 0;
    return Math.round((t.correct / t.total) * 100);
  }

  getTopicTotal(topicId) {
    const t = this.data.byTopic[topicId];
    return t ? t.total : 0;
  }

  getDifficultyAccuracy(diff) {
    const d = this.data.byDifficulty[diff];
    if (!d || d.total === 0) return 0;
    return Math.round((d.correct / d.total) * 100);
  }

  getTodayStats() {
    const today = new Date().toISOString().slice(0, 10);
    const d = this.data.daily[today];
    return d || { total: 0, correct: 0 };
  }

  getWeekStats() {
    let total = 0, correct = 0;
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const day = this.data.daily[key];
      if (day) { total += day.total; correct += day.correct; }
    }
    return { total, correct };
  }

  getRecentHistory(n = 10) {
    return this.data.history.slice(-n).reverse();
  }

  getAllTopicStats() {
    return Object.entries(this.data.byTopic).map(([id, data]) => ({
      id,
      total: data.total,
      correct: data.correct,
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    })).sort((a, b) => b.total - a.total);
  }

  // ===== Reset =====
  reset() {
    this.data = this.getDefault();
    this.save();
  }
}

const statsManager = new StatsManager();