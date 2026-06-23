// ========== Grading Engine ==========
class GradingEngine {
  constructor() {
    this.tolerance = 0.001; // Relative tolerance for numeric answers
    this.sigFigTolerance = 0.01; // For significant figure matching
  }

  /**
   * Grade an answer against the expected correct answer(s).
   * @param {string|number} userAnswer - The student's submitted answer
   * @param {object} question - The question object with answer info
   * @returns {object} { correct: boolean, feedback: string, correctAnswer: string, solution: string }
   */
  grade(userAnswer, question) {
    if (!question) return { correct: false, feedback: 'No question data', correctAnswer: '', solution: '' };

    const raw = String(userAnswer).trim();
    if (!raw) {
      return {
        correct: false,
        feedback: i18n.getLang() === 'zh' ? '请先输入你的答案。' : 'Please enter your answer first.',
        correctAnswer: question.answerDisplay || String(question.answer),
        solution: question.solution || ''
      };
    }

    const type = question.answerType || 'numeric';
    let correct = false;

    switch (type) {
      case 'numeric':
        correct = this.gradeNumeric(raw, question.answer);
        break;
      case 'expression':
        correct = this.gradeExpression(raw, question.answer);
        break;
      case 'multiple':
        correct = this.gradeMultiple(raw, question.answer);
        break;
      case 'choice':
        correct = this.gradeChoice(raw, question.answer, question.choices);
        break;
      case 'fraction':
        correct = this.gradeFraction(raw, question.answer);
        break;
      case 'coordinate':
        correct = this.gradeCoordinate(raw, question.answer);
        break;
      default:
        correct = this.gradeNumeric(raw, question.answer);
    }

    const lang = i18n.getLang();

    return {
      correct,
      feedback: correct
        ? (lang === 'zh' ? '回答完全正确！做得好！🎉' : 'Correct! Well done! 🎉')
        : (lang === 'zh' ? '答案不对，再看看题目吧。' : 'Not quite right. Review the problem and try again.'),
      correctAnswer: question.answerDisplay || String(question.answer),
      solution: question.solution || ''
    };
  }

  // ===== Numeric Grading =====
  gradeNumeric(raw, expected) {
    const userVal = parseFloat(raw);
    if (isNaN(userVal)) return false;

    // Check for exact match
    if (Array.isArray(expected)) {
      return expected.some(e => this.numericClose(userVal, parseFloat(e)));
    }
    return this.numericClose(userVal, parseFloat(expected));
  }

  numericClose(a, b) {
    if (isNaN(a) || isNaN(b)) return false;
    const absDiff = Math.abs(a - b);
    if (absDiff < 1e-9) return true; // exact
    const maxVal = Math.max(Math.abs(a), Math.abs(b), 1);
    return absDiff / maxVal < this.tolerance;
  }

  // ===== Expression Grading (simple symbolic comparison) =====
  gradeExpression(raw, expected) {
    // Normalize: remove spaces, convert common symbols
    const normalize = (s) => String(s)
      .replace(/\s+/g, '')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-') // minus sign
      .replace(/x/g, '*') // 'x' as multiplication in context
      .toLowerCase();

    const userNorm = normalize(raw);
    const expectedNorm = normalize(expected);

    if (userNorm === expectedNorm) return true;

    // Try numeric evaluation at sample points for function comparison
    if (typeof expected === 'string' && expected.includes('x')) {
      // Not implemented deeply - just do string compare
      return userNorm === expectedNorm;
    }

    return false;
  }

  // ===== Multiple Answers =====
  gradeMultiple(raw, expected) {
    // Split by comma or semicolon
    const userParts = raw.split(/[,;，；]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const expectedArr = (Array.isArray(expected) ? expected : [expected]).map(Number);

    if (userParts.length !== expectedArr.length) return false;

    // Sort both and compare
    const sortedUser = [...userParts].sort((a, b) => a - b);
    const sortedExpected = [...expectedArr].sort((a, b) => a - b);

    return sortedUser.every((v, i) => this.numericClose(v, sortedExpected[i]));
  }

  // ===== Multiple Choice =====
  gradeChoice(raw, answer, choices) {
    // Match by option letter or by exact value
    const trimmed = raw.trim().toUpperCase();
    if (trimmed === String(answer).toUpperCase()) return true;
    // Also try matching the actual choice value
    if (choices) {
      const idx = choices.findIndex(c => String(c) === raw.trim());
      if (idx >= 0 && String.fromCharCode(65 + idx) === String(answer)) return true;
    }
    return false;
  }

  // ===== Fraction Grading =====
  gradeFraction(raw, expected) {
    // Accept "a/b" or decimal
    const parts = raw.split('/');
    if (parts.length === 2) {
      const num = parseFloat(parts[0]);
      const den = parseFloat(parts[1]);
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        return this.numericClose(num / den, parseFloat(expected));
      }
    }
    // Fallback to numeric
    return this.gradeNumeric(raw, expected);
  }

  // ===== Coordinate Grading =====
  gradeCoordinate(raw, expected) {
    // Accept "(x, y)" or "x, y"
    const cleaned = raw.replace(/[()（）]/g, '');
    const parts = cleaned.split(/[,，]+/).map(s => parseFloat(s.trim()));
    if (parts.length !== 2) return false;
    if (isNaN(parts[0]) || isNaN(parts[1])) return false;

    if (Array.isArray(expected) && expected.length === 2) {
      return this.numericClose(parts[0], expected[0]) && this.numericClose(parts[1], expected[1]);
    }
    return false;
  }
}

const gradingEngine = new GradingEngine();