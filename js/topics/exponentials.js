// ========== Exponentials & Logarithms Topic Questions ==========
const ExponentialsGenerators = {

  // ----- Evaluate Logarithms -----
  "evaluate-log": (diff) => {
    // log_a(b) = ?
    const base = randChoice([2, 3, 5, 10]);
    const exp = diff === 'easy' ? randInt(1, 4) : randInt(1, 5);
    const value = Math.pow(base, exp);

    return {
      questionZh: `计算：\\(\\log_{${base}} ${value}\\)`,
      questionEn: `Evaluate: \\(\\log_{${base}} ${value}\\)`,
      answer: exp,
      answerDisplay: String(exp),
      answerType: 'numeric',
      hintZh: `\\(\\log_a b = x\\) 意味着 \\(a^x = b\\)`,
      hintEn: `\\(\\log_a b = x\\) means \\(a^x = b\\)`,
      solutionZh: `\\(\\log_{${base}} ${value} = ${exp}\\) 因为 \\(${base}^{${exp}} = ${value}\\)`,
      solutionEn: `\\(\\log_{${base}} ${value} = ${exp}\\) because \\(${base}^{${exp}} = ${value}\\)`,
      vizType: 'exponential',
      vizParams: { base, exp, value },
      difficulty: diff,
    };
  },

  // ----- Log Laws -----
  "log-laws": (diff) => {
    // Simplify log_a(x) + log_a(y) etc
    const base = randChoice([2, 3, 5]);
    const m = randInt(2, 5);
    const n = diff === 'easy' ? randInt(2, 4) : randInt(1, 6);

    // log_a(m) + log_a(n) = log_a(mn)
    const mn = m * n;
    const exp = Math.round(Math.log(mn) / Math.log(base) * 1000) / 1000;

    return {
      questionZh: `化简：\\(\\log_{${base}} ${m} + \\log_{${base}} ${n}\\)`,
      questionEn: `Simplify: \\(\\log_{${base}} ${m} + \\log_{${base}} ${n}\\)`,
      answer: parseFloat(exp.toFixed(4)),
      answerDisplay: `\\(\\log_{${base}} ${mn}\\)`,
      answerType: 'numeric',
      hintZh: `对数加法法则：\\(\\log_a x + \\log_a y = \\log_a (xy)\\)`,
      hintEn: `Log addition rule: \\(\\log_a x + \\log_a y = \\log_a (xy)\\)`,
      solutionZh: `\\(\\log_{${base}} ${m} + \\log_{${base}} ${n} = \\log_{${base}} (${m} \\times ${n}) = \\log_{${base}} ${mn} = ${exp}\\)`,
      solutionEn: `\\(\\log_{${base}} ${m} + \\log_{${base}} ${n} = \\log_{${base}} (${m} \\times ${n}) = \\log_{${base}} ${mn} = ${exp}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Solve Exponential Equations -----
  "solve-exponential": (diff) => {
    // a^x = b
    const base = randChoice([2, 3, 5]);
    const exp = diff === 'easy' ? randInt(1, 5) : randInt(2, 7);
    const value = Math.pow(base, exp);

    return {
      questionZh: `解方程：\\(${base}^x = ${value}\\)`,
      questionEn: `Solve: \\(${base}^x = ${value}\\)`,
      answer: exp,
      answerDisplay: String(exp),
      answerType: 'numeric',
      hintZh: `两边取 \\(\\log_{${base}}\\) 或使用对数定义。`,
      hintEn: `Take \\(\\log_{${base}}\\) on both sides, or use the definition of log.`,
      solutionZh: `\\(${base}^x = ${base}^{${exp}}\\) → \\(x = ${exp}\\)`,
      solutionEn: `\\(${base}^x = ${base}^{${exp}}\\) → \\(x = ${exp}\\)`,
      vizType: 'exponential',
      vizParams: { base, solution: exp },
      difficulty: diff,
    };
  },

  // ----- Exponential Growth/Decay -----
  "growth-decay": (diff) => {
    // P = P0 * e^(kt) or P = P0 * r^t
    const P0 = randInt(100, 500);
    const rate = diff === 'easy' ? randInt(5, 15) : randInt(3, 20);
    const t = diff === 'easy' ? randInt(2, 4) : randInt(2, 8);

    // P = P0 * (1 + r/100)^t for growth
    const growth = Math.pow(1 + rate / 100, t);
    const Pfinal = Math.round(P0 * growth * 100) / 100;

    return {
      questionZh: `一笔投资 \\(${P0}\\) 元，年利率为 \\(${rate}\\%\\)，按复利计算。求 \\(${t}\\) 年后的本利和。`,
      questionEn: `An investment of £${P0} earns ${rate}% compound interest per year. Find the value after ${t} years.`,
      answer: Pfinal,
      answerDisplay: `\\(${Pfinal}\\)`,
      answerType: 'numeric',
      hintZh: `复利公式：\\(A = P(1 + r)^t\\)，其中 r = ${rate}/100`,
      hintEn: `Compound interest: \\(A = P(1 + r)^t\\) where r = ${rate}/100`,
      solutionZh: `\\(A = ${P0}(1 + \\frac{${rate}}{100})^{${t}} = ${Pfinal}\\)`,
      solutionEn: `\\(A = ${P0}(1 + \\frac{${rate}}{100})^{${t}} = ${Pfinal}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Natural Log & e -----
  "natural-log": (diff) => {
    // Solve e^x = k or ln(x) = k
    const k = diff === 'easy' ? randInt(1, 5) : randFloat(1, 5);
    const exp = k;
    const val = Math.exp(k);

    return {
      questionZh: `解方程：\\(e^x = ${val.toFixed(2)}\\)`,
      questionEn: `Solve: \\(e^x = ${val.toFixed(2)}\\)`,
      answer: parseFloat(k.toFixed(4)),
      answerDisplay: `\\(${parseFloat(k.toFixed(4))}\\)`,
      answerType: 'numeric',
      hintZh: `取自然对数 \\(\\ln\\)：\\(\\ln(e^x) = x\\)`,
      hintEn: `Take the natural log: \\(\\ln(e^x) = x\\)`,
      solutionZh: `\\(x = \\ln(${val.toFixed(2)}) = ${parseFloat(k.toFixed(4))}\\)`,
      solutionEn: `\\(x = \\ln(${val.toFixed(2)}) = ${parseFloat(k.toFixed(4))}\\)`,
      vizType: 'exponential',
      vizParams: { fn: 'exp', solution: k },
      difficulty: diff,
    };
  },
};