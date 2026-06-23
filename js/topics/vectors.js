// ========== Vectors Topic Questions ==========
const VectorsGenerators = {

  // ----- Vector Magnitude -----
  "vector-magnitude": (diff) => {
    const x = randInt(-6, 6);
    const y = diff === 'easy' ? randInt(1, 5) : randInt(-6, 6);
    const mag = Math.sqrt(x*x + y*y);

    return {
      questionZh: `求向量 \\(\\vec{v} = ${x}\\mathbf{i} ${y>=0?'+':'-'} ${Math.abs(y)}\\mathbf{j}\\) 的模。`,
      questionEn: `Find the magnitude of the vector \\(\\vec{v} = ${x}\\mathbf{i} ${y>=0?'+':'-'} ${Math.abs(y)}\\mathbf{j}\\).`,
      answer: parseFloat(mag.toFixed(4)),
      answerDisplay: `\\(${mag.toFixed(4)}\\)`,
      answerType: 'numeric',
      hintZh: `\\(|\\vec{v}| = \\sqrt{x^2 + y^2}\\)`,
      hintEn: `\\(|\\vec{v}| = \\sqrt{x^2 + y^2}\\)`,
      solutionZh: `\\(|\\vec{v}| = \\sqrt{${x}^2 + ${y}^2} = \\sqrt{${x*x}+${y*y}} = ${mag.toFixed(4)}\\)`,
      solutionEn: `\\(|\\vec{v}| = \\sqrt{${x}^2 + ${y}^2} = \\sqrt{${x*x}+${y*y}} = ${mag.toFixed(4)}\\)`,
      vizType: 'vector',
      vizParams: { x, y },
      difficulty: diff,
    };
  },

  // ----- Vector Addition/Subtraction -----
  "vector-arithmetic": (diff) => {
    const a1 = randInt(-4, 4), a2 = randInt(-4, 4);
    const b1 = randInt(-4, 4), b2 = randInt(-4, 4);
    const op = randChoice(['+', '-']);
    const r1 = op === '+' ? a1 + b1 : a1 - b1;
    const r2 = op === '+' ? a2 + b2 : a2 - b2;

    const va = `\\mathbf{a} = ${a1}\\mathbf{i} ${a2>=0?'+':'-'} ${Math.abs(a2)}\\mathbf{j}`;
    const vb = `\\mathbf{b} = ${b1}\\mathbf{i} ${b2>=0?'+':'-'} ${Math.abs(b2)}\\mathbf{j}`;
    const opName = op === '+' ? '+' : '-';

    return {
      questionZh: `\\(${va}\\)，\\(${vb}\\)。求 \\(\\mathbf{a} ${opName} \\mathbf{b}\\)。`,
      questionEn: `\\(${va}\\), \\(${vb}\\). Find \\(\\mathbf{a} ${opName} \\mathbf{b}\\).`,
      answer: [r1, r2],
      answerDisplay: `\\(${r1}\\mathbf{i} ${r2>=0?'+':'-'} ${Math.abs(r2)}\\mathbf{j}\\)`,
      answerType: 'multiple',
      hintZh: `对应分量相加/相减。`,
      hintEn: `Add/subtract corresponding components.`,
      solutionZh: `\\(\\mathbf{a} ${opName} \\mathbf{b} = (${a1} ${opName} ${b1})\\mathbf{i} + (${a2} ${opName} ${b2})\\mathbf{j} = ${r1}\\mathbf{i} ${r2>=0?'+':'-'} ${Math.abs(r2)}\\mathbf{j}\\)`,
      solutionEn: `\\(\\mathbf{a} ${opName} \\mathbf{b} = (${a1} ${opName} ${b1})\\mathbf{i} + (${a2} ${opName} ${b2})\\mathbf{j} = ${r1}\\mathbf{i} ${r2>=0?'+':'-'} ${Math.abs(r2)}\\mathbf{j}\\)`,
      vizType: 'vector',
      vizParams: { a1, a2, b1, b2, op, r1, r2 },
      difficulty: diff,
    };
  },

  // ----- Scalar Multiplication -----
  "scalar-multiply": (diff) => {
    const x = randInt(-4, 4);
    const y = randInt(-4, 4);
    const k = diff === 'easy' ? randChoice([2, 3, 0.5]) : randChoice([-2, 0.5, 4]);
    const rx = k * x;
    const ry = k * y;

    return {
      questionZh: `向量 \\(\\vec{v} = ${x}\\mathbf{i} ${y>=0?'+':'-'} ${Math.abs(y)}\\mathbf{j}\\)，求 \\(${k}\\vec{v}\\)。`,
      questionEn: `Given \\(\\vec{v} = ${x}\\mathbf{i} ${y>=0?'+':'-'} ${Math.abs(y)}\\mathbf{j}\\), find \\(${k}\\vec{v}\\).`,
      answer: [rx, ry],
      answerDisplay: `\\(${rx}\\mathbf{i} ${ry>=0?'+':'-'} ${Math.abs(ry)}\\mathbf{j}\\)`,
      answerType: 'multiple',
      hintZh: `标量乘法：每个分量乘以 k。`,
      hintEn: `Scalar multiplication: multiply each component by k.`,
      solutionZh: `\\(${k}\\vec{v} = ${k}(${x}\\mathbf{i} ${y>=0?'+':'-'} ${Math.abs(y)}\\mathbf{j}) = ${rx}\\mathbf{i} ${ry>=0?'+':'-'} ${Math.abs(ry)}\\mathbf{j}\\)`,
      solutionEn: `\\(${k}\\vec{v} = ${k}(${x}\\mathbf{i} ${y>=0?'+':'-'} ${Math.abs(y)}\\mathbf{j}) = ${rx}\\mathbf{i} ${ry>=0?'+':'-'} ${Math.abs(ry)}\\mathbf{j}\\)`,
      vizType: 'vector',
      vizParams: { x, y, k },
      difficulty: diff,
    };
  },

  // ----- Dot Product -----
  "dot-product": (diff) => {
    const a1 = randInt(-5, 5), a2 = randInt(-5, 5);
    const b1 = diff === 'easy' ? randInt(1, 5) : randInt(-5, 5);
    const b2 = diff === 'easy' ? randInt(1, 5) : randInt(-5, 5);
    const dot = a1 * b1 + a2 * b2;

    return {
      questionZh: `计算 \\((${a1}\\mathbf{i} ${a2>=0?'+':'-'} ${Math.abs(a2)}\\mathbf{j}) \\cdot (${b1}\\mathbf{i} ${b2>=0?'+':'-'} ${Math.abs(b2)}\\mathbf{j})\\)`,
      questionEn: `Evaluate \\((${a1}\\mathbf{i} ${a2>=0?'+':'-'} ${Math.abs(a2)}\\mathbf{j}) \\cdot (${b1}\\mathbf{i} ${b2>=0?'+':'-'} ${Math.abs(b2)}\\mathbf{j})\\)`,
      answer: dot,
      answerDisplay: String(dot),
      answerType: 'numeric',
      hintZh: `\\(\\mathbf{a} \\cdot \\mathbf{b} = a_1 b_1 + a_2 b_2\\)`,
      hintEn: `\\(\\mathbf{a} \\cdot \\mathbf{b} = a_1 b_1 + a_2 b_2\\)`,
      solutionZh: `\\(\\mathbf{a} \\cdot \\mathbf{b} = ${a1} \\times ${b1} + ${a2} \\times ${b2} = ${a1*b1} + ${a2*b2} = ${dot}\\)`,
      solutionEn: `\\(\\mathbf{a} \\cdot \\mathbf{b} = ${a1} \\times ${b1} + ${a2} \\times ${b2} = ${a1*b1} + ${a2*b2} = ${dot}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Angle Between Vectors -----
  "angle-between": (diff) => {
    const a1 = randInt(1, 5), a2 = diff === 'easy' ? randInt(0, 3) : randInt(-3, 5);
    const b1 = randInt(1, 5), b2 = randInt(0, 4);
    const dot = a1 * b1 + a2 * b2;
    const magA = Math.sqrt(a1*a1 + a2*a2);
    const magB = Math.sqrt(b1*b1 + b2*b2);
    const cosTheta = dot / (magA * magB);
    const angleRad = Math.acos(cosTheta);
    const angleDeg = Math.round(angleRad * 180 / Math.PI * 10) / 10;

    return {
      questionZh: `求向量 \\(\\mathbf{a} = ${a1}\\mathbf{i} ${a2>=0?'+':'-'} ${Math.abs(a2)}\\mathbf{j}\\) 与 \\(\\mathbf{b} = ${b1}\\mathbf{i} ${b2>=0?'+':'-'} ${Math.abs(b2)}\\mathbf{j}\\) 之间的夹角（单位：度）。`,
      questionEn: `Find the angle between \\(\\mathbf{a} = ${a1}\\mathbf{i} ${a2>=0?'+':'-'} ${Math.abs(a2)}\\mathbf{j}\\) and \\(\\mathbf{b} = ${b1}\\mathbf{i} ${b2>=0?'+':'-'} ${Math.abs(b2)}\\mathbf{j}\\) (in degrees).`,
      answer: angleDeg,
      answerDisplay: `\\(${angleDeg}^\\circ\\)`,
      answerType: 'numeric',
      hintZh: `\\(\\cos\\theta = \\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|}\\)`,
      hintEn: `\\(\\cos\\theta = \\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|}\\)`,
      solutionZh: `\\(\\mathbf{a}\\cdot\\mathbf{b} = ${dot}\\)\\n\\(|\\mathbf{a}| = ${magA.toFixed(3)}\\), \\(|\\mathbf{b}| = ${magB.toFixed(3)}\\)\\n\\(\\cos\\theta = \\frac{${dot}}{${magA.toFixed(3)} \\times ${magB.toFixed(3)}} = ${cosTheta.toFixed(4)}\\)\\n\\(\\theta \\approx ${angleDeg}^\\circ\\)`,
      solutionEn: `\\(\\mathbf{a}\\cdot\\mathbf{b} = ${dot}\\)\\n\\(|\\mathbf{a}| = ${magA.toFixed(3)}\\), \\(|\\mathbf{b}| = ${magB.toFixed(3)}\\)\\n\\(\\cos\\theta = \\frac{${dot}}{${magA.toFixed(3)} \\times ${magB.toFixed(3)}} = ${cosTheta.toFixed(4)}\\)\\n\\(\\theta \\approx ${angleDeg}^\\circ\\)`,
      vizType: 'vector',
      vizParams: { a1, a2, b1, b2 },
      difficulty: diff,
    };
  },
};