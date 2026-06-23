// ========== Question Generator Engine ==========
class QuestionGenerator {
  constructor() {
    // Merge all topic generators
    this.generators = {};

    // Register algebra generators
    if (typeof AlgebraGenerators !== 'undefined') {
      Object.keys(AlgebraGenerators).forEach(k => {
        this.generators[`algebra.${k}`] = { fn: AlgebraGenerators[k], topic: 'algebra' };
      });
    }
    // Register calculus generators
    if (typeof CalculusGenerators !== 'undefined') {
      Object.keys(CalculusGenerators).forEach(k => {
        this.generators[`calculus.${k}`] = { fn: CalculusGenerators[k], topic: 'calculus' };
      });
    }
    // Register trigo generators
    if (typeof TrigonometryGenerators !== 'undefined') {
      Object.keys(TrigonometryGenerators).forEach(k => {
        this.generators[`trigo.${k}`] = { fn: TrigonometryGenerators[k], topic: 'trigo' };
      });
    }
    // Register sequences generators
    if (typeof SequencesGenerators !== 'undefined') {
      Object.keys(SequencesGenerators).forEach(k => {
        this.generators[`sequences.${k}`] = { fn: SequencesGenerators[k], topic: 'sequences' };
      });
    }
    // Register exponentials generators
    if (typeof ExponentialsGenerators !== 'undefined') {
      Object.keys(ExponentialsGenerators).forEach(k => {
        this.generators[`exponentials.${k}`] = { fn: ExponentialsGenerators[k], topic: 'exponentials' };
      });
    }
    // Register vectors generators
    if (typeof VectorsGenerators !== 'undefined') {
      Object.keys(VectorsGenerators).forEach(k => {
        this.generators[`vectors.${k}`] = { fn: VectorsGenerators[k], topic: 'vectors' };
      });
    }
    // Register statistics generators
    if (typeof StatisticsGenerators !== 'undefined') {
      Object.keys(StatisticsGenerators).forEach(k => {
        this.generators[`statistics.${k}`] = { fn: StatisticsGenerators[k], topic: 'statistics' };
      });
    }
    // Register mechanics generators
    if (typeof MechanicsGenerators !== 'undefined') {
      Object.keys(MechanicsGenerators).forEach(k => {
        this.generators[`mechanics.${k}`] = { fn: MechanicsGenerators[k], topic: 'mechanics' };
      });
    }

    this.currentQuestion = null;
    this.currentTopic = 'algebra';
    this.currentDifficulty = 'medium';
  }

  /**
   * Generate a new question.
   * @param {string} topic - topic id (e.g., 'algebra', 'calculus', etc.)
   * @param {string} difficulty - 'easy', 'medium', or 'hard'
   * @returns {object} question object
   */
  generate(topic, difficulty) {
    this.currentTopic = topic || this.currentTopic;
    this.currentDifficulty = difficulty || this.currentDifficulty;

    // Get generators for this topic
    const topicGens = Object.keys(this.generators)
      .filter(k => this.generators[k].topic === this.currentTopic);

    if (topicGens.length === 0) {
      // Fallback - try any available
      const allKeys = Object.keys(this.generators);
      if (allKeys.length === 0) return this.fallbackQuestion();
      const fallback = this.generators[randChoice(allKeys)];
      this.currentQuestion = fallback.fn(this.currentDifficulty);
      this.currentQuestion.topicId = fallback.topic;
      return this.currentQuestion;
    }

    // Pick a random generator from the topic
    const genKey = randChoice(topicGens);
    const gen = this.generators[genKey];
    this.currentQuestion = gen.fn(this.currentDifficulty);
    this.currentQuestion.topicId = gen.topic;
    this.currentQuestion.questionType = genKey;

    return this.currentQuestion;
  }

  /**
   * Get display text for current question based on language
   */
  getQuestionText() {
    if (!this.currentQuestion) return '';
    const lang = i18n.getLang();
    return lang === 'zh' ? this.currentQuestion.questionZh : this.currentQuestion.questionEn;
  }

  getHintText() {
    if (!this.currentQuestion) return '';
    const lang = i18n.getLang();
    return lang === 'zh' ? this.currentQuestion.hintZh : this.currentQuestion.hintEn;
  }

  getSolutionText() {
    if (!this.currentQuestion) return '';
    const lang = i18n.getLang();
    return lang === 'zh' ? this.currentQuestion.solutionZh : this.currentQuestion.solutionEn;
  }

  /**
   * Get available topics with their question types
   */
  getTopicsWithGenerators() {
    const result = {};
    Object.keys(this.generators).forEach(k => {
      const t = this.generators[k].topic;
      if (!result[t]) result[t] = [];
      result[t].push(k);
    });
    return result;
  }

  /**
   * Fallback question if no generators are defined
   */
  fallbackQuestion() {
    const a = randInt(1, 6);
    const b = randInt(1, 10);
    const c = randInt(a + b, a + b + 20);
    const x = (c - b) / a;

    return {
      questionZh: `解方程：\\(${a}x + ${b} = ${c}\\)`,
      questionEn: `Solve the equation: \\(${a}x + ${b} = ${c}\\)`,
      answer: x,
      answerDisplay: String(x),
      answerType: 'numeric',
      hintZh: `将 ${b} 移到右边，再除以 ${a}。`,
      hintEn: `Move ${b} to the right side, then divide by ${a}.`,
      solutionZh: `\\(${a}x = ${c - b}\\) → \\(x = ${x}\\)`,
      solutionEn: `\\(${a}x = ${c - b}\\) → \\(x = ${x}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: 'easy',
      topicId: 'algebra',
    };
  }
}

const questionGenerator = new QuestionGenerator();