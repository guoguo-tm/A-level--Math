// ========== Algebra Topic Questions ==========
// Each generator returns { question, questionZh, questionEn, answer, answerDisplay, answerType, hint, hintZh, hintEn, solution, solutionZh, solutionEn, vizType, vizParams, difficulty }

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min, max, decimals = 1) {
  const v = Math.random() * (max - min) + min;
  const d = Math.pow(10, decimals);
  return Math.round(v * d) / d;
}
function randChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const AlgebraGenerators = {

  // ----- Solving Linear Equations -----
  "linear-eq": (diff) => {
    // ax + b = c
    const a = diff === 'easy' ? randInt(1, 4) : (diff === 'medium' ? randInt(2, 6) : randInt(3, 9));
    const x = randInt(-10, 10);
    // c = a*x + b, pick b so c is nice
    const b = diff === 'easy' ? randInt(1, 5) : randInt(-8, 8);
    const c = a * x + b;

    const eqStr = a === 1 ? `x + ${b} = ${c}` : `${a}x + ${b} = ${c}`;
    const eqStrNeg = a === 1 ? `x - ${Math.abs(b)} = ${c}` : (b < 0 ? `${a}x - ${Math.abs(b)} = ${c}` : eqStr);

    const displayEq = b >= 0 ? eqStr : (a === 1 ? `x - ${Math.abs(b)} = ${c}` : `${a}x - ${Math.abs(b)} = ${c}`);

    return {
      questionZh: `求解方程：\\(${displayEq}\\)`,
      questionEn: `Solve the equation: \\(${displayEq}\\)`,
      answer: x,
      answerDisplay: String(x),
      answerType: 'numeric',
      hintZh: `将常数项移到等号右边，再除以系数。`,
      hintEn: `Move the constant term to the right side, then divide by the coefficient.`,
      solutionZh: `\\(${displayEq}\\) → \\(${a}x = ${c} - ${b} = ${c-b}\\) → \\(x = \\frac{${c-b}}{${a}} = ${x}\\)`,
      solutionEn: `\\(${displayEq}\\) → \\(${a}x = ${c} - ${b} = ${c-b}\\) → \\(x = \\frac{${c-b}}{${a}} = ${x}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Quadratic Formula -----
  "quadratic-formula": (diff) => {
    let a, b, c, roots, discriminant;

    if (diff === 'easy') {
      // Two nice integer roots
      const r1 = randInt(-5, 5);
      const r2 = randInt(-5, 5);
      a = 1;
      b = -(r1 + r2);
      c = r1 * r2;
      roots = [r1, r2];
      discriminant = b*b - 4*a*c;
    } else if (diff === 'medium') {
      a = randInt(1, 3);
      const r1 = randInt(-6, 6);
      const r2 = randInt(-6, 6);
      b = -a * (r1 + r2);
      c = a * r1 * r2;
      roots = [r1, r2];
      discriminant = b*b - 4*a*c;
    } else {
      // May have surd roots
      a = randInt(1, 4);
      b = randInt(-8, 8);
      c = randInt(-12, 12);
      if (a === 0) a = 1;
      discriminant = b*b - 4*a*c;
      if (discriminant < 0) discriminant = Math.abs(discriminant); // ensure real
      const sqrtD = Math.sqrt(discriminant);
      roots = [(-b + sqrtD)/(2*a), (-b - sqrtD)/(2*a)];
    }

    const aStr = a === 1 ? '' : (a === -1 ? '-' : String(a));
    const eqStr = a === 1 ? `x^2` : (a === -1 ? `-x^2` : `${a}x^2`);
    const signB = b >= 0 ? '+' : '-';
    const signC = c >= 0 ? '+' : '-';
    const display = `\\(${eqStr} ${signB} ${Math.abs(b) === 1 && b !== 0 ? '' : Math.abs(b)}x ${signC} ${Math.abs(c)} = 0\\)`;

    const niceRoots = diff !== 'hard' || Number.isInteger(discriminant);

    return {
      questionZh: `求解二次方程：${display}`,
      questionEn: `Solve the quadratic equation: ${display}`,
      answer: niceRoots ? roots.sort((a,b)=>a-b) : [parseFloat(roots[0].toFixed(2)), parseFloat(roots[1].toFixed(2))],
      answerDisplay: niceRoots
        ? `\\(x = ${roots[0]}, x = ${roots[1]}\\)`
        : `\\(x \\approx ${roots[0].toFixed(2)}, x \\approx ${roots[1].toFixed(2)}\\)`,
      answerType: 'multiple',
      hintZh: `使用求根公式 \\(x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)`,
      hintEn: `Use the quadratic formula \\(x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)`,
      solutionZh: `判别式 \\(\\Delta = ${b}^2 - 4 \\times ${a} \\times ${c} = ${discriminant}\\)\\n\\(x = \\frac{-${b} \\pm \\sqrt{${discriminant}}}{2 \\times ${a}} = ${roots[0]}, ${roots[1]}\\)`,
      solutionEn: `Discriminant \\(\\Delta = ${b}^2 - 4 \\times ${a} \\times ${c} = ${discriminant}\\)\\n\\(x = \\frac{-${b} \\pm \\sqrt{${discriminant}}}{2 \\times ${a}} = ${roots[0]}, ${roots[1]}\\)`,
      vizType: 'quadratic',
      vizParams: { a, b, c, roots },
      difficulty: diff,
    };
  },

  // ----- Completing the Square -----
  "completing-square": (diff) => {
    // x² + bx + c → (x + p)² + q
    const h = randInt(-5, 5);
    const k = diff === 'easy' ? randInt(0, 10) : randInt(-10, 10);
    const a = 1;

    // x² + bx + c = (x + h)² + k
    // x² + 2hx + h² + k = x² + bx + c
    const b = 2 * h;
    const c = h * h + k;

    const bSign = b >= 0 ? '+' : '-';
    const cSign = c >= 0 ? '+' : '-';

    const display = `\\(x^2 ${bSign} ${Math.abs(b)}x ${cSign} ${Math.abs(c)}\\)`;
    const hSign = h >= 0 ? '+' : '-';
    const kSign = k >= 0 ? '+' : '-';

    return {
      questionZh: `将 ${display} 写成 \\((x + p)^2 + q\\) 的形式，并求出 p 和 q。`,
      questionEn: `Write ${display} in the form \\((x + p)^2 + q\\), and find p and q.`,
      answer: [h, k],
      answerDisplay: `\\(p = ${h}, q = ${k}\\)`,
      answerType: 'multiple',
      hintZh: `将一次项系数的一半作为 p，即 \\(p = \\frac{b}{2}\\)，然后调整常数。`,
      hintEn: `Take half the coefficient of x as p, i.e. \\(p = \\frac{b}{2}\\), then adjust the constant.`,
      solutionZh: `\\(x^2 ${bSign} ${Math.abs(b)}x ${cSign} ${Math.abs(c)} = (x ${hSign} ${Math.abs(h)})^2 ${kSign} ${Math.abs(k)}\\)\\n其中 \\(p = ${h}, q = ${k}\\)`,
      solutionEn: `\\(x^2 ${bSign} ${Math.abs(b)}x ${cSign} ${Math.abs(c)} = (x ${hSign} ${Math.abs(h)})^2 ${kSign} ${Math.abs(k)}\\)\\nSo \\(p = ${h}, q = ${k}\\)`,
      vizType: 'quadratic',
      vizParams: { a:1, b, c, vertex: { h: -h, k } },
      difficulty: diff,
    };
  },

  // ----- Inequalities -----
  "inequalities": (diff) => {
    // Solve ax + b > c or ax² + bx + c > 0
    let questionZh, questionEn, answer, answerDisplay, solutionZh, solutionEn, vizType, vizParams;

    if (diff === 'easy') {
      const a = randInt(2, 5);
      const b = randInt(-5, 5);
      const c = randInt(-10, 10);
      const threshold = (c - b) / a;
      const sign = randChoice(['>', '<', '≥', '≤']);
      const display = `\\(${a}x ${b>=0?'+':'-'} ${Math.abs(b)} ${sign} ${c}\\)`;

      let ansStr;
      if (sign === '>') ansStr = `x > ${threshold}`;
      else if (sign === '<') ansStr = `x < ${threshold}`;
      else if (sign === '≥') ansStr = `x \\geq ${threshold}`;
      else ansStr = `x \\leq ${threshold}`;

      questionZh = `解不等式：${display}`;
      questionEn = `Solve the inequality: ${display}`;
      answer = threshold;
      answerDisplay = `\\(${ansStr}\\)`;
      solutionZh = `\\(${a}x ${b>=0?'+':'-'} ${Math.abs(b)} ${sign} ${c}\\) → \\(${a}x ${sign} ${c-b}\\) → \\(${ansStr}\\)`;
      solutionEn = `\\(${a}x ${b>=0?'+':'-'} ${Math.abs(b)} ${sign} ${c}\\) → \\(${a}x ${sign} ${c-b}\\) → \\(${ansStr}\\)`;
      vizType = 'none';
      vizParams = null;
      answerType = 'numeric';

    } else {
      // Quadratic inequality
      const r1 = randInt(-4, 4);
      const r2 = randInt(r1 + 1, 6);
      const a = randChoice([1, -1]);
      // a(x-r1)(x-r2) = ax² - a(r1+r2)x + ar1r2
      const bVal = -a * (r1 + r2);
      const cVal = a * r1 * r2;
      const sign = randChoice(['>', '≥']);

      const aStr = a === 1 ? '' : '-';
      const bSign = bVal >= 0 ? '+' : '-';
      const cSign = cVal >= 0 ? '+' : '-';
      const display = `\\(${aStr}x^2 ${bSign} ${Math.abs(bVal)}x ${cSign} ${Math.abs(cVal)} ${sign} 0\\)`;

      let ansStr;
      if (a > 0) {
        ansStr = `x < ${r1} \\text{ 或 } x > ${r2}`;
      } else {
        ansStr = `${r1} < x < ${r2}`;
      }

      questionZh = `解不等式：${display}`;
      questionEn = `Solve the inequality: ${display}`;
      answer = a > 0 ? `${r1},${r2}` : `${r1} < x < ${r2}`;
      answerDisplay = `\\(${ansStr}\\)`;
      answerType = 'expression';
      solutionZh = `因式分解得 \\(${aStr}(x - ${r1})(x - ${r2}) ${sign} 0\\)\\n临界点为 \\(x = ${r1}, ${r2}\\)\\n在数轴上测试区间得 \\(${ansStr}\\)`;
      solutionEn = `Factorise: \\(${aStr}(x - ${r1})(x - ${r2}) ${sign} 0\\)\\nCritical values: \\(x = ${r1}, ${r2}\\)\\nTesting intervals on a number line gives \\(${ansStr}\\)`;
      vizType = 'quadratic';
      vizParams = { a, b: bVal, c: cVal, roots: [r1, r2] };
    }

    return {
      questionZh, questionEn, answer, answerDisplay, answerType: 'expression',
      hintZh: diff === 'easy' ? '将 x 的系数除过去。' : '先因式分解，再用数轴法判断区间。',
      hintEn: diff === 'easy' ? 'Divide by the coefficient of x.' : 'Factorise first, then use a number line to determine the intervals.',
      solutionZh, solutionEn, vizType, vizParams, difficulty: diff,
    };
  },

  // ----- Simultaneous Equations -----
  "simultaneous": (diff) => {
    const x = randInt(-5, 5);
    const y = randInt(-5, 5);

    let qZh, qEn, solZh, solEn, vizType, vizParams;

    if (diff === 'easy') {
      const a1 = randInt(1, 3), b1 = randInt(-3, 3);
      const a2 = randInt(2, 4), b2 = randInt(-3, 3);
      const c1 = a1*x + b1*y;
      const c2 = a2*x + b2*y;

      const eq1str = `\\(${a1}x ${b1>=0?'+':'-'} ${Math.abs(b1)}y = ${c1}\\)`;
      const eq2str = `\\(${a2}x ${b2>=0?'+':'-'} ${Math.abs(b2)}y = ${c2}\\)`;

      qZh = `解联立方程组：\\n${eq1str}\\n${eq2str}`;
      qEn = `Solve the simultaneous equations:\\n${eq1str}\\n${eq2str}`;
      solZh = `\\(x = ${x}, y = ${y}\\)`;
      solEn = `\\(x = ${x}, y = ${y}\\)`;
      vizType = 'simultaneous';
      vizParams = { a1, b1, c1, a2, b2, c2 };
    } else {
      // One linear, one quadratic
      const m = randInt(-3, 3);
      const cVal = y - m*x;
      const a = randChoice([1, 2]);
      const x2 = randInt(-4, 4);
      const y2 = m*x2 + cVal;
      const r = x*x + y*y;

      qZh = `解联立方程组：\\n\\(y = ${m}x + ${cVal}\\)\\n\\(x^2 + y^2 = ${r}\\)`;
      qEn = `Solve the simultaneous equations:\\n\\(y = ${m}x + ${cVal}\\)\\n\\(x^2 + y^2 = ${r}\\)`;
      solZh = `\\(x = ${x}, y = ${y}\\) 和 \\(x = ${x2}, y = ${y2}\\)`;
      solEn = `\\(x = ${x}, y = ${y}\\) and \\(x = ${x2}, y = ${y2}\\)`;
      vizType = 'simultaneous';
      vizParams = { linear: { m, c: cVal }, circle: { r: Math.sqrt(r) } };
    }

    return {
      questionZh: qZh,
      questionEn: qEn,
      answer: [x, y],
      answerDisplay: `\\(x = ${x}, y = ${y}\\)`,
      answerType: 'multiple',
      hintZh: '用代入法或消元法解。',
      hintEn: 'Solve by substitution or elimination.',
      solutionZh: solZh,
      solutionEn: solEn,
      vizType, vizParams, difficulty: diff,
    };
  },

  // ----- Polynomial Division -----
  "polynomial-division": (diff) => {
    // Divide (x-a)(x²+bx+c) by (x-a)
    const a = randInt(-4, 4);
    const b = randInt(-4, 4);
    const c = randInt(-6, 6);

    // (x-a)(x²+bx+c) = x³ + bx² + cx - ax² - abx - ac = x³ + (b-a)x² + (c-ab)x - ac
    const coeff3 = 1;
    const coeff2 = b - a;
    const coeff1 = c - a*b;
    const coeff0 = -a*c;

    const dividend = `x^3 ${coeff2>=0?'+':'-'} ${Math.abs(coeff2)}x^2 ${coeff1>=0?'+':'-'} ${Math.abs(coeff1)}x ${coeff0>=0?'+':'-'} ${Math.abs(coeff0)}`;
    const divisor = `x ${-a>=0?'+':'-'} ${Math.abs(-a)}`;
    const quotient = `x^2 ${b>=0?'+':'-'} ${Math.abs(b)}x ${c>=0?'+':'-'} ${Math.abs(c)}`;

    const vizParams = { dividendCoeffs: [coeff3, coeff2, coeff1, coeff0], divisorRoot: a, quotientCoeffs: [1, b, c] };

    return {
      questionZh: `进行多项式除法：\\((${dividend}) \\div (${divisor})\\)`,
      questionEn: `Perform polynomial division: \\((${dividend}) \\div (${divisor})\\)`,
      answer: `x^2 + ${b}x + ${c}`,
      answerDisplay: `\\(${quotient}\\)`,
      answerType: 'expression',
      hintZh: `因为除式是 \\(${divisor}\\)，可以直接用综合除法。`,
      hintEn: `Since the divisor is \\(${divisor}\\), you can use synthetic division.`,
      solutionZh: `\\((${dividend}) \\div (${divisor}) = ${quotient}\\)`,
      solutionEn: `\\((${dividend}) \\div (${divisor}) = ${quotient}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },
};