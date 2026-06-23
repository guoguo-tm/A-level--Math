// ========== Statistics Topic Questions ==========
const StatisticsGenerators = {

  // ----- Mean, Median, Mode -----
  "mean-median-mode": (diff) => {
    const count = diff === 'easy' ? 5 : (diff === 'medium' ? 6 : 8);
    const min = diff === 'easy' ? 1 : -5;
    const max = diff === 'easy' ? 10 : 15;
    const nums = [];
    for (let i = 0; i < count; i++) nums.push(randInt(min, max));
    nums.sort((a, b) => a - b);

    const sum = nums.reduce((s, v) => s + v, 0);
    const mean = Math.round(sum / count * 100) / 100;
    const median = count % 2 === 0
      ? (nums[count / 2 - 1] + nums[count / 2]) / 2
      : nums[Math.floor(count / 2)];

    // Mode
    const freq = {};
    nums.forEach(n => freq[n] = (freq[n] || 0) + 1);
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number);
    const mode = modes.length === Object.keys(freq).length ? 'none' : modes.sort().join(', ');

    const dataStr = nums.join(', ');

    return {
      questionZh: `给定数据集：\\(${dataStr}\\)。求：均值（mean）、中位数（median）和众数（mode）。`,
      questionEn: `Given the dataset: \\(${dataStr}\\). Find the mean, median, and mode.`,
      answer: [mean, median, mode === 'none' ? 0 : parseFloat(modes[0])],
      answerDisplay: `Mean: ${mean}, Median: ${median}, Mode: ${mode}`,
      answerType: 'multiple',
      hintZh: `均值 = 总和/n，中位数 = 排序后的中间值，众数 = 出现最多的数。`,
      hintEn: `Mean = sum/n, Median = middle value after sorting, Mode = most frequent value.`,
      solutionZh: `总和 = ${sum}，n = ${count}\\n均值 = ${sum}/${count} = ${mean}\\n排序后：${nums.join(',')}\\n中位数 = ${median}\\n众数 = ${mode}`,
      solutionEn: `Sum = ${sum}, n = ${count}\\nMean = ${sum}/${count} = ${mean}\\nSorted: ${nums.join(',')}\\nMedian = ${median}\\nMode = ${mode}`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Probability -----
  "probability": (diff) => {
    // Simple probability: box with colored balls
    const red = randInt(2, 6);
    const blue = randInt(2, 6);
    const green = diff === 'easy' ? 0 : randInt(0, 4);
    const total = red + blue + green;
    const target = randChoice(['red', 'blue', 'green'].filter(c => ({red,blue,green}[c]) > 0));
    const targetCount = { red, blue, green }[target];
    const prob = targetCount / total;

    const colorZh = { red: '红', blue: '蓝', green: '绿' };
    const colorEn = { red: 'red', blue: 'blue', green: 'green' };

    const parts = [`${red} 个红球`, `${blue} 个蓝球`];
    const partsEn = [`${red} red`, `${blue} blue`];
    if (green > 0) { parts.push(`${green} 个绿球`); partsEn.push(`${green} green`); }

    return {
      questionZh: `一个袋子中有 ${parts.join('、')}。随机取一个球，求抽到${colorZh[target]}球的概率。`,
      questionEn: `A bag contains ${partsEn.join(', ')}. A ball is drawn at random. Find the probability it is ${colorEn[target]}.`,
      answer: parseFloat(prob.toFixed(4)),
      answerDisplay: `\\(\\frac{${targetCount}}{${total}} = ${prob.toFixed(4)}\\)`,
      answerType: 'numeric',
      hintZh: `概率 = 有利结果数 / 总结果数`,
      hintEn: `Probability = favourable outcomes / total outcomes`,
      solutionZh: `P(${colorZh[target]}) = ${targetCount}/${total} = ${prob.toFixed(4)}`,
      solutionEn: `P(${colorEn[target]}) = ${targetCount}/${total} = ${prob.toFixed(4)}`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Conditional Probability -----
  "conditional-prob": (diff) => {
    // P(A|B) = P(A∩B)/P(B)
    const nB = randInt(4, 8);
    const nAinterB = randInt(1, nB);
    const total = diff === 'easy' ? nB + randInt(1, 3) : nB + randInt(2, 6);
    const prob = nAinterB / nB;

    return {
      questionZh: `在 ${total} 名学生中，${nB} 人参加数学社团，其中 ${nAinterB} 人也参加物理社团。随机选一名数学社团的学生，求该生也参加物理社团的概率。`,
      questionEn: `Out of ${total} students, ${nB} are in the Maths Club, and ${nAinterB} of those are also in the Physics Club. Given a student is in the Maths Club, find the probability they are also in the Physics Club.`,
      answer: parseFloat(prob.toFixed(4)),
      answerDisplay: `\\(\\frac{${nAinterB}}{${nB}} = ${prob.toFixed(4)}\\)`,
      answerType: 'numeric',
      hintZh: `条件概率 P(A|B) = P(A∩B)/P(B)`,
      hintEn: `Conditional probability: P(A|B) = P(A∩B)/P(B)`,
      solutionZh: `P(物理|数学) = ${nAinterB}/${nB} = ${prob.toFixed(4)}`,
      solutionEn: `P(Physics|Maths) = ${nAinterB}/${nB} = ${prob.toFixed(4)}`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Binomial Distribution -----
  "binomial-dist": (diff) => {
    const n = diff === 'easy' ? randInt(3, 6) : randInt(5, 10);
    const p = diff === 'easy' ? 0.5 : randChoice([0.2, 0.3, 0.5, 0.6, 0.7]);
    const k = randInt(0, Math.min(3, n));

    // P(X = k) = C(n,k) * p^k * (1-p)^(n-k)
    const combin = binom(n, k);
    const prob = combin * Math.pow(p, k) * Math.pow(1 - p, n - k);

    return {
      questionZh: `\\(X \\sim B(${n}, ${p})\\)，求 \\(P(X = ${k})\\)。`,
      questionEn: `\\(X \\sim B(${n}, ${p})\\). Find \\(P(X = ${k})\\).`,
      answer: parseFloat(prob.toFixed(4)),
      answerDisplay: `\\(${prob.toFixed(4)}\\)`,
      answerType: 'numeric',
      hintZh: `二项分布公式：\\(P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}\\)`,
      hintEn: `Binomial formula: \\(P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}\\)`,
      solutionZh: `\\(P(X=${k}) = \\binom{${n}}{${k}} \\times ${p}^{${k}} \\times ${1-p}^{${n-k}} = ${combin} \\times ${Math.pow(p,k).toFixed(4)} \\times ${Math.pow(1-p,n-k).toFixed(4)} = ${prob.toFixed(4)}\\)`,
      solutionEn: `\\(P(X=${k}) = \\binom{${n}}{${k}} \\times ${p}^{${k}} \\times ${1-p}^{${n-k}} = ${combin} \\times ${Math.pow(p,k).toFixed(4)} \\times ${Math.pow(1-p,n-k).toFixed(4)} = ${prob.toFixed(4)}\\)`,
      vizType: 'binomial',
      vizParams: { n, p, k },
      difficulty: diff,
    };
  },

  // ----- Normal Distribution -----
  "normal-dist": (diff) => {
    // Standard normal: P(Z < z)
    const mu = 0;
    const sigma = 1;
    const z = diff === 'easy' ? randFloat(0, 1.5) : randFloat(-2, 2);

    // Use approximation of standard normal CDF
    const phi = normalCDF(z);
    const prob = Math.round(phi * 10000) / 10000;

    return {
      questionZh: `\\(Z \\sim N(0, 1)\\)，求 \\(P(Z < ${z})\\)。`,
      questionEn: `\\(Z \\sim N(0, 1)\\). Find \\(P(Z < ${z})\\).`,
      answer: prob,
      answerDisplay: `\\(${prob}\\)`,
      answerType: 'numeric',
      hintZh: `查标准正态分布表，或使用计算器。`,
      hintEn: `Use the standard normal distribution table, or a calculator.`,
      solutionZh: `查表或计算得 \\(\\Phi(${z}) = ${prob}\\)`,
      solutionEn: `From tables or calculation: \\(\\Phi(${z}) = ${prob}\\)`,
      vizType: 'normal',
      vizParams: { mu, sigma, z, prob },
      difficulty: diff,
    };
  },
};

// Approximation of standard normal CDF (Abramowitz and Stegun)
function normalCDF(x) {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const xAbs = Math.abs(x) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * xAbs);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-xAbs * xAbs);
  return 0.5 * (1.0 + sign * y);
}

// Binomial coefficient (reuse if not global)
function binom(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let r = 1;
  for (let i = 1; i <= k; i++) r = r * (n - i + 1) / i;
  return Math.round(r);
}