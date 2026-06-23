// ========== Sequences & Series Topic Questions ==========
const SequencesGenerators = {

  // ----- Arithmetic Sequences -----
  "arithmetic-nth": (diff) => {
    const a1 = randInt(2, 10);
    const d = diff === 'easy' ? randInt(1, 4) : (diff === 'medium' ? randInt(-3, 5) : randInt(-5, 8));
    const n = diff === 'easy' ? randInt(3, 10) : randInt(5, 20);
    const an = a1 + (n - 1) * d;

    const dSign = d >= 0 ? '+' : '-';

    return {
      questionZh: `等差数列的首项为 \\(${a1}\\)，公差为 \\(${d}\\)，求第 \\(${n}\\) 项。`,
      questionEn: `An arithmetic sequence has first term \\(${a1}\\) and common difference \\(${d}\\). Find the \\(${n}\^{th}\\) term.`,
      answer: an,
      answerDisplay: String(an),
      answerType: 'numeric',
      hintZh: `使用公式：\\(a_n = a_1 + (n-1)d\\)`,
      hintEn: `Use the formula: \\(a_n = a_1 + (n-1)d\\)`,
      solutionZh: `\\(a_{${n}} = ${a1} + (${n}-1) \\times ${d} = ${a1} + ${n-1} \\times ${d} = ${an}\\)`,
      solutionEn: `\\(a_{${n}} = ${a1} + (${n}-1) \\times ${d} = ${a1} + ${n-1} \\times ${d} = ${an}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Arithmetic Series Sum -----
  "arithmetic-sum": (diff) => {
    const a1 = randInt(1, 10);
    const n = diff === 'easy' ? randInt(5, 15) : randInt(10, 30);
    const d = diff === 'easy' ? randInt(1, 4) : randInt(-3, 5);
    const an = a1 + (n - 1) * d;
    const sum = (n / 2) * (a1 + an);

    return {
      questionZh: `求等差数列 \\(${a1}, ${a1+d}, ${a1+2*d}, ...\\) 前 \\(${n}\\) 项的和。`,
      questionEn: `Find the sum of the first \\(${n}\\) terms of the arithmetic sequence \\(${a1}, ${a1+d}, ${a1+2*d}, ...\\).`,
      answer: sum,
      answerDisplay: String(sum),
      answerType: 'numeric',
      hintZh: `使用公式：\\(S_n = \\frac{n}{2}(a_1 + a_n)\\) 或 \\(S_n = \\frac{n}{2}[2a_1 + (n-1)d]\\)`,
      hintEn: `Use \\(S_n = \\frac{n}{2}(a_1 + a_n)\\) or \\(S_n = \\frac{n}{2}[2a_1 + (n-1)d]\\)`,
      solutionZh: `\\(a_{${n}} = ${a1} + (${n}-1) \\times ${d} = ${an}\\)\\n\\(S_{${n}} = \\frac{${n}}{2}(${a1} + ${an}) = ${sum}\\)`,
      solutionEn: `\\(a_{${n}} = ${a1} + (${n}-1) \\times ${d} = ${an}\\)\\n\\(S_{${n}} = \\frac{${n}}{2}(${a1} + ${an}) = ${sum}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Geometric Sequences -----
  "geometric-nth": (diff) => {
    const r = randChoice([2, 3, 4, 0.5, 0.5, -2, -3]);
    const a1 = diff === 'easy' ? randInt(1, 5) : randInt(1, 10);
    const n = diff === 'easy' ? randInt(3, 6) : randInt(4, 10);

    let an;
    if (Number.isInteger(r)) {
      an = a1 * Math.pow(r, n - 1);
    } else {
      an = a1 * Math.pow(r, n - 1);
      an = parseFloat(an.toFixed(4));
    }

    return {
      questionZh: `等比数列的首项为 \\(${a1}\\)，公比为 \\(${r}\\)，求第 \\(${n}\\) 项。`,
      questionEn: `A geometric sequence has first term \\(${a1}\\) and common ratio \\(${r}\\). Find the \\(${n}\^{th}\\) term.`,
      answer: an,
      answerDisplay: String(an),
      answerType: 'numeric',
      hintZh: `使用公式：\\(a_n = a_1 \\cdot r^{n-1}\\)`,
      hintEn: `Use the formula: \\(a_n = a_1 \\cdot r^{n-1}\\)`,
      solutionZh: `\\(a_{${n}} = ${a1} \\times ${r}^{${n-1}} = ${a1} \\times ${Math.pow(r, n-1)} = ${an}\\)`,
      solutionEn: `\\(a_{${n}} = ${a1} \\times ${r}^{${n-1}} = ${a1} \\times ${Math.pow(r, n-1)} = ${an}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Geometric Series Sum -----
  "geometric-sum": (diff) => {
    const r = randChoice([2, 3, 0.5, 0.5]);
    const a1 = randInt(1, 5);
    const n = diff === 'easy' ? randInt(3, 6) : randInt(5, 10);

    let sum;
    if (r === 1) {
      sum = a1 * n;
    } else {
      sum = a1 * (1 - Math.pow(r, n)) / (1 - r);
    }
    sum = parseFloat(sum.toFixed(4));

    return {
      questionZh: `求等比数列 \\(${a1}, ${a1*r}, ${a1*r*r}, ...\\) 前 \\(${n}\\) 项的和。`,
      questionEn: `Find the sum of the first \\(${n}\\) terms of the geometric sequence \\(${a1}, ${a1*r}, ${a1*r*r}, ...\\).`,
      answer: sum,
      answerDisplay: String(sum),
      answerType: 'numeric',
      hintZh: `使用公式：\\(S_n = \\frac{a_1(1 - r^n)}{1 - r}\\)（r ≠ 1）`,
      hintEn: `Use \\(S_n = \\frac{a_1(1 - r^n)}{1 - r}\\) (r ≠ 1)`,
      solutionZh: `\\(S_{${n}} = ${a1} \\cdot \\frac{1 - ${r}^{${n}}}{1 - ${r}} = ${sum}\\)`,
      solutionEn: `\\(S_{${n}} = ${a1} \\cdot \\frac{1 - ${r}^{${n}}}{1 - ${r}} = ${sum}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Sum to Infinity (Geometric) -----
  "sum-to-infinity": (diff) => {
    // Need |r| < 1
    const r = randChoice([0.5, 0.25, 0.2, -0.5, 0.4, 2/3]);
    const a = randInt(3, 12);
    const sumInf = a / (1 - r);

    return {
      questionZh: `求无穷等比数列 \\(${a}, ${a*r}, ${a*r*r}, ...\\) 的无穷和。`,
      questionEn: `Find the sum to infinity of the geometric series \\(${a}, ${a*r}, ${a*r*r}, ...\\).`,
      answer: parseFloat(sumInf.toFixed(4)),
      answerDisplay: `\\(${sumInf}\\)`,
      answerType: 'numeric',
      hintZh: `使用公式：\\(S_{\\infty} = \\frac{a_1}{1 - r}\\)，要求 |r| < 1。`,
      hintEn: `Use \\(S_{\\infty} = \\frac{a_1}{1 - r}\\), requires |r| < 1.`,
      solutionZh: `\\(S_{\\infty} = \\frac{${a}}{1 - ${r}} = ${sumInf}\\)`,
      solutionEn: `\\(S_{\\infty} = \\frac{${a}}{1 - ${r}} = ${sumInf}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Binomial Expansion -----
  "binomial-expansion": (diff) => {
    // (1 + x)^n or (a + bx)^n
    const n = diff === 'easy' ? randInt(3, 6) : randInt(5, 10);
    const k = diff === 'easy' ? randInt(1, 3) : randInt(2, 5);
    // Find k-th term: C(n, k) * x^k
    const coeff = binom(n, k);

    return {
      questionZh: `写出 \\((1 + x)^{${n}}\\) 的展开式中 \\(x^{${k}}\\) 的系数。`,
      questionEn: `Find the coefficient of \\(x^{${k}}\\) in the expansion of \\((1 + x)^{${n}}\\).`,
      answer: coeff,
      answerDisplay: String(coeff),
      answerType: 'numeric',
      hintZh: `二项式系数：\\(\\binom{n}{k} = \\frac{n!}{k!(n-k)!}\\)`,
      hintEn: `Binomial coefficient: \\(\\binom{n}{k} = \\frac{n!}{k!(n-k)!}\\)`,
      solutionZh: `\\(\\binom{${n}}{${k}} = \\frac{${n}!}{${k}!(${n}-${k})!} = ${coeff}\\)`,
      solutionEn: `\\(\\binom{${n}}{${k}} = \\frac{${n}!}{${k}!(${n}-${k})!} = ${coeff}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },
};

function binom(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let r = 1;
  for (let i = 1; i <= k; i++) r = r * (n - i + 1) / i;
  return Math.round(r);
}