// ========== Calculus Topic Questions ==========
const CalculusGenerators = {

  // ----- Differentiation: Power Rule -----
  "derivative-power": (diff) => {
    const n = diff === 'easy' ? randInt(2, 5) : (diff === 'medium' ? randInt(-3, 6) : randFloat(-3, 5, 1));
    const a = diff === 'easy' ? 1 : randInt(1, 5);
    const exponent = Number(n);
    const aStr = a === 1 ? '' : String(a);

    let funcStr;
    if (n === 1) funcStr = `${aStr}x`;
    else if (n === 0) funcStr = String(a);
    else funcStr = `${aStr}x^{${n}}`;

    const derivativeN = a * exponent;
    const derivativePower = exponent - 1;
    let ansStr;
    if (derivativePower === 0) ansStr = String(derivativeN);
    else if (derivativePower === 1) ansStr = `${derivativeN}x`;
    else ansStr = `${derivativeN}x^{${derivativePower}}`;

    return {
      questionZh: `求 \\(f(x) = ${funcStr}\\) 的导数 \\(f'(x)\\)。`,
      questionEn: `Find the derivative \\(f'(x)\\) of \\(f(x) = ${funcStr}\\).`,
      answer: ansStr,
      answerDisplay: `\\(${ansStr}\\)`,
      answerType: 'expression',
      hintZh: `使用幂函数求导法则：\\(\\frac{d}{dx}(x^n) = nx^{n-1}\\)`,
      hintEn: `Use the power rule: \\(\\frac{d}{dx}(x^n) = nx^{n-1}\\)`,
      solutionZh: `\\(f'(x) = ${a} \\cdot ${exponent} \\cdot x^{${exponent}-1} = ${ansStr}\\)`,
      solutionEn: `\\(f'(x) = ${a} \\cdot ${exponent} \\cdot x^{${exponent}-1} = ${ansStr}\\)`,
      vizType: 'derivative',
      vizParams: { fn: `${a}*Math.pow(x,${exponent})`, dfn: `${a*exponent}*Math.pow(x,${exponent-1})` },
      difficulty: diff,
    };
  },

  // ----- Derivative of Polynomial -----
  "derivative-polynomial": (diff) => {
    // f(x) = ax³ + bx² + cx + d
    const a = diff === 'easy' ? randInt(1, 3) : randInt(1, 5);
    const b = diff === 'easy' ? randInt(1, 4) : randInt(-5, 5);
    const c = diff === 'easy' ? randInt(1, 4) : randInt(-5, 5);
    const d = randInt(-5, 5);

    const terms = [];
    const dTerms = [];
    if (a !== 0) {
      const aStr = a === 1 ? '' : (a === -1 ? '-' : String(a));
      terms.push(`${aStr}x^3`);
      const da = 3*a;
      const daStr = da === 1 ? '' : String(da);
      dTerms.push(`${daStr}x^2`);
    }
    if (b !== 0) {
      const sign = (terms.length ? (b >= 0 ? '+' : '-') : '');
      const bAbs = Math.abs(b) === 1 ? '' : Math.abs(b);
      terms.push(`${sign} ${bAbs}x^2`);
      const db = 2*b;
      const dbSign = (dTerms.length ? (db >= 0 ? '+' : '-') : '');
      const dbAbs = Math.abs(db) === 1 ? '' : Math.abs(db);
      dTerms.push(`${dbSign} ${dbAbs}x`);
    }
    if (c !== 0) {
      const sign = (terms.length ? (c >= 0 ? '+' : '-') : '');
      terms.push(`${sign} ${Math.abs(c)}x`);
      dTerms.push(`${dTerms.length ? (c >= 0 ? '+' : '-') : ''} ${Math.abs(c)}`);
    }
    if (d !== 0 || terms.length === 0) {
      const sign = (terms.length ? (d >= 0 ? '+' : '-') : '');
      terms.push(`${sign} ${Math.abs(d)}`);
    }
    // d constant vanishes from derivative
    const funcStr = terms.join(' ').replace(/\s+- /g, ' - ').replace(/^\s+/, '');
    const dStr = dTerms.join(' ').replace(/\s+- /g, ' - ').replace(/^\s+/, '');

    return {
      questionZh: `求 \\(f(x) = ${funcStr}\\) 的导数 \\(f'(x)\\)。`,
      questionEn: `Find the derivative \\(f'(x)\\) of \\(f(x) = ${funcStr}\\).`,
      answer: dStr,
      answerDisplay: `\\(${dStr}\\)`,
      answerType: 'expression',
      hintZh: `对每一项分别求导，常数项的导数为 0。`,
      hintEn: `Differentiate each term separately. The derivative of a constant is 0.`,
      solutionZh: `\\(f'(x) = ${3*a}x^2 ${2*b>=0?'+':'-'} ${Math.abs(2*b)}x ${c>=0?'+':'-'} ${Math.abs(c)}\\)`,
      solutionEn: `\\(f'(x) = ${3*a}x^2 ${2*b>=0?'+':'-'} ${Math.abs(2*b)}x ${c>=0?'+':'-'} ${Math.abs(c)}\\)`,
      vizType: 'derivative',
      vizParams: { a, b, c, d },
      difficulty: diff,
    };
  },

  // ----- Tangent Line -----
  "tangent-line": (diff) => {
    // f(x) = x² + bx + c, find tangent at x = x0
    const b = diff === 'easy' ? randInt(1, 3) : randInt(-4, 4);
    const c = randInt(-5, 5);
    const x0 = randInt(-3, 3);

    const y0 = x0*x0 + b*x0 + c;
    const slope = 2*x0 + b; // f'(x0)

    // tangent: y - y0 = slope(x - x0) → y = slope*x - slope*x0 + y0
    const intercept = -slope*x0 + y0;
    const funcStr = `x^2 ${b>=0?'+':'-'} ${Math.abs(b)}x ${c>=0?'+':'-'} ${Math.abs(c)}`;
    const tanStr = `y = ${slope}x ${intercept>=0?'+':'-'} ${Math.abs(intercept)}`;

    return {
      questionZh: `求曲线 \\(y = ${funcStr}\\) 在点 \\((${x0}, ${y0})\\) 处的切线方程。`,
      questionEn: `Find the equation of the tangent to the curve \\(y = ${funcStr}\\) at the point \\((${x0}, ${y0})\\).`,
      answer: tanStr,
      answerDisplay: `\\(${tanStr}\\)`,
      answerType: 'expression',
      hintZh: `切线斜率 = 导数在 x₀ 处的值 = f'(x₀)，再用点斜式。`,
      hintEn: `Slope of tangent = derivative at x₀ = f'(x₀). Then use point-slope form.`,
      solutionZh: `\\(f'(x) = 2x ${b>=0?'+':'-'} ${Math.abs(b)}\\)\\n斜率 = \\(f'(${x0}) = 2(${x0}) ${b>=0?'+':'-'} ${Math.abs(b)} = ${slope}\\)\\n切线：\\(y - ${y0} = ${slope}(x - ${x0})\\) → \\(${tanStr}\\)`,
      solutionEn: `\\(f'(x) = 2x ${b>=0?'+':'-'} ${Math.abs(b)}\\)\\nSlope = \\(f'(${x0}) = 2(${x0}) ${b>=0?'+':'-'} ${Math.abs(b)} = ${slope}\\)\\nTangent: \\(y - ${y0} = ${slope}(x - ${x0})\\) → \\(${tanStr}\\)`,
      vizType: 'tangent',
      vizParams: { b, c, x0, y0, slope, intercept },
      difficulty: diff,
    };
  },

  // ----- Stationary Points -----
  "stationary-points": (diff) => {
    // f(x) = x³ + bx² + cx + d, find stationary points
    // f'(x) = 3x² + 2bx + c = 0 → roots are sps
    // Construct from known roots
    const sp1 = randInt(-3, 3);
    const sp2 = diff === 'easy' ? randInt(sp1 + 1, sp1 + 4) : randInt(-4, 4);
    // f'(x) = 3x² - 3(sp1+sp2)x + 3*sp1*sp2 → f'(x) = 3x² + 2bx + c
    // So 2b = -3(sp1+sp2) → b = -1.5(sp1+sp2), c = 3*sp1*sp2
    const b = -1.5 * (sp1 + sp2);
    const c = 3 * sp1 * sp2;
    const d = randInt(-5, 5);

    const y1 = sp1*sp1*sp1 + b*sp1*sp1 + c*sp1 + d;
    const y2 = sp2*sp2*sp2 + b*sp2*sp2 + c*sp2 + d;

    // Nature: second derivative f''(x) = 6x + 2b
    const nature1 = (6*sp1 + 2*b) > 0 ? 'min' : 'max';
    const nature2 = (6*sp2 + 2*b) > 0 ? 'min' : 'max';
    const natureName = (n) => n === 'min' ? (i18n.getLang() === 'zh' ? '极小值' : 'minimum') : (i18n.getLang() === 'zh' ? '极大值' : 'maximum');

    const funcStr = `x^3 ${b>=0?'+':'-'} ${Math.abs(b)}x^2 ${c>=0?'+':'-'} ${Math.abs(c)}x ${d>=0?'+':'-'} ${Math.abs(d)}`;

    return {
      questionZh: `求 \\(f(x) = ${funcStr}\\) 的所有驻点，并判断其性质（极大值/极小值）。`,
      questionEn: `Find all stationary points of \\(f(x) = ${funcStr}\\) and determine their nature (max/min).`,
      answer: [sp1, y1],
      answerDisplay: `\\((${sp1}, ${y1})\\) — ${natureName(nature1)}，\\((${sp2}, ${y2})\\) — ${natureName(nature2)}`,
      answerType: 'coordinate',
      hintZh: `驻点满足 f'(x) = 0，再通过二阶导数判断极大/极小。`,
      hintEn: `Stationary points satisfy f'(x) = 0. Use the second derivative to determine max/min.`,
      solutionZh: `\\(f'(x) = 3x^2 ${2*b>=0?'+':'-'} ${Math.abs(2*b)}x ${c>=0?'+':'-'} ${Math.abs(c)} = 0\\)\\n根：\\(x = ${sp1}\\) 和 \\(x = ${sp2}\\)\\n\\(f''(x) = 6x ${2*b>=0?'+':'-'} ${Math.abs(2*b)}\\)\\n\\(f''(${sp1}) = ${6*sp1+2*b}\\) → ${natureName(nature1)}\\n\\(f''(${sp2}) = ${6*sp2+2*b}\\) → ${natureName(nature2)}`,
      solutionEn: `\\(f'(x) = 3x^2 ${2*b>=0?'+':'-'} ${Math.abs(2*b)}x ${c>=0?'+':'-'} ${Math.abs(c)} = 0\\)\\nRoots: \\(x = ${sp1}\\) and \\(x = ${sp2}\\)\\n\\(f''(x) = 6x ${2*b>=0?'+':'-'} ${Math.abs(2*b)}\\)\\n\\(f''(${sp1}) = ${6*sp1+2*b}\\) → ${natureName(nature1)}\\n\\(f''(${sp2}) = ${6*sp2+2*b}\\) → ${natureName(nature2)}`,
      vizType: 'stationary',
      vizParams: { b, c, d, sps: [[sp1,y1],[sp2,y2]], natures: [nature1, nature2] },
      difficulty: diff,
    };
  },

  // ----- Integration: Power Rule -----
  "integral-power": (diff) => {
    // ∫ axⁿ dx
    const a = diff === 'easy' ? 1 : randInt(2, 5);
    const n = diff === 'easy' ? randInt(1, 4) : (diff === 'medium' ? randInt(0, 5) : randFloat(-1, 4, 1));
    const exponent = Number(n);
    if (exponent === -1) { exponent = randInt(1, 4); } // avoid ln for now

    const aStr = a === 1 ? '' : String(a);
    let integrand;
    if (exponent === 0) integrand = String(a);
    else if (exponent === 1) integrand = `${aStr}x`;
    else integrand = `${aStr}x^{${exponent}}`;

    const newPower = exponent + 1;
    const newCoeff = a / newPower;
    let nat;
    if (newPower === 1) nat = `${newCoeff}x`;
    else nat = `\\frac{${a}}{${newPower}}x^{${newPower}}`;

    // Convert to nice fraction if possible
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const g = gcd(Math.abs(a), Math.abs(newPower));
    let ansDisplay;
    if (g > 1 && newPower !== 1) {
      ansDisplay = `\\frac{${a/g}}{${newPower/g}}x^{${newPower}}`;
    } else {
      ansDisplay = nat;
    }
    const suffix = ' + C';

    return {
      questionZh: `求不定积分：\\(\\int ${integrand} \\, dx\\)`,
      questionEn: `Find the indefinite integral: \\(\\int ${integrand} \\, dx\\)`,
      answer: ansDisplay + suffix,
      answerDisplay: `\\(${ansDisplay}${suffix}\\)`,
      answerType: 'expression',
      hintZh: `使用幂函数积分法则：\\(\\int x^n dx = \\frac{x^{n+1}}{n+1} + C\\)`,
      hintEn: `Use the power rule for integration: \\(\\int x^n dx = \\frac{x^{n+1}}{n+1} + C\\)`,
      solutionZh: `\\(\\int ${integrand} \\, dx = ${a} \\cdot \\frac{x^{${exponent}+1}}{${exponent}+1}${suffix} = ${ansDisplay}${suffix}\\)`,
      solutionEn: `\\(\\int ${integrand} \\, dx = ${a} \\cdot \\frac{x^{${exponent}+1}}{${exponent}+1}${suffix} = ${ansDisplay}${suffix}\\)`,
      vizType: 'integral',
      vizParams: { fn: `${a}*Math.pow(x,${exponent})`, antiderFn: `(${a}/${newPower})*Math.pow(x,${newPower})` },
      difficulty: diff,
    };
  },

  // ----- Definite Integral Area -----
  "definite-integral": (diff) => {
    // ∫ₐᵇ (x² or similar) dx
    const fnType = diff === 'easy' ? 'x2' : randChoice(['x2', 'x3', 'linear']);
    let a, b, fnStr, integrand, result;

    if (fnType === 'x2') {
      a = randInt(0, 2);
      b = randInt(a + 1, a + 4);
      fnStr = `x^2`;
      integrand = 'x^2';
      result = (b*b*b - a*a*a) / 3;
    } else if (fnType === 'x3') {
      a = randInt(0, 2);
      b = randInt(a + 1, a + 3);
      fnStr = `x^3`;
      integrand = 'x^3';
      result = (b*b*b*b - a*a*a*a) / 4;
    } else {
      a = randInt(-2, 2);
      b = randInt(a + 1, a + 4);
      const m = randInt(1, 3);
      const cVal = randInt(0, 3);
      fnStr = m === 1 ? `x + ${cVal}` : `${m}x + ${cVal}`;
      integrand = `${m}x + ${cVal}`;
      result = (m/2)*(b*b - a*a) + cVal*(b - a);
    }

    return {
      questionZh: `计算定积分：\\(\\int_{${a}}^{${b}} ${integrand} \\, dx\\)`,
      questionEn: `Evaluate the definite integral: \\(\\int_{${a}}^{${b}} ${integrand} \\, dx\\)`,
      answer: parseFloat(result.toFixed(4)),
      answerDisplay: `\\(${result}\\)`,
      answerType: 'numeric',
      hintZh: `先求不定积分（原函数），再代入上下限计算。`,
      hintEn: `First find the indefinite integral (antiderivative), then substitute the limits.`,
      solutionZh: `\\(\\int ${integrand} \\, dx = ${fnType === 'x2' ? '\\frac{x^3}{3}' : fnType === 'x3' ? '\\frac{x^4}{4}' : `\\frac{${fnStr.split('x')[0]||1}}{2}x^2 + ${integrand.split('+')[1]||0}x`}\\)\\n代入 \\(x = ${b}\\) 减去 \\(x = ${a}\\)：\\n\\(${fnType === 'x2' ? `${b}^3/3 - ${a}^3/3` : fnType === 'x3' ? `${b}^4/4 - ${a}^4/4` : ''} = ${result}\\)`,
      solutionEn: `\\(\\int ${integrand} \\, dx = ${fnType === 'x2' ? '\\frac{x^3}{3}' : fnType === 'x3' ? '\\frac{x^4}{4}' : `\\frac{${fnStr.split('x')[0]||1}}{2}x^2 + ${integrand.split('+')[1]||0}x`}\\)\\nSubstitute \\(x = ${b}\\) minus \\(x = ${a}\\):\\n\\(${result}\\)`,
      vizType: 'definite-integral',
      vizParams: { fnExpr: integrand, a, b, area: result },
      difficulty: diff,
    };
  },

  // ----- Area Between Curves -----
  "area-between": (diff) => {
    // y = x² and y = kx, find area between
    // Intersection: x² = kx → x(x-k) = 0 → x=0, x=k
    const k = randInt(2, 5);
    const a = 0;
    const b = k;
    // Area = ∫₀ᵏ (kx - x²) dx = [kx²/2 - x³/3]₀ᵏ = k³/2 - k³/3 = k³/6
    const area = k*k*k / 6;

    return {
      questionZh: `求曲线 \\(y = x^2\\) 与直线 \\(y = ${k}x\\) 之间的面积。`,
      questionEn: `Find the area between the curve \\(y = x^2\\) and the line \\(y = ${k}x\\).`,
      answer: parseFloat(area.toFixed(4)),
      answerDisplay: `\\(${area}\\)`,
      answerType: 'numeric',
      hintZh: `先求交点，然后积分上曲线减去下曲线。`,
      hintEn: `Find intersection points first, then integrate (upper curve - lower curve).`,
      solutionZh: `交点：\\(x^2 = ${k}x\\) → \\(x(x - ${k}) = 0\\) → \\(x = 0, ${k}\\)\\n面积 = \\(\\int_0^{${k}} (${k}x - x^2) \\, dx = [\\frac{${k}x^2}{2} - \\frac{x^3}{3}]_0^{${k}} = ${area}\\)`,
      solutionEn: `Intersections: \\(x^2 = ${k}x\\) → \\(x(x - ${k}) = 0\\) → \\(x = 0, ${k}\\)\\nArea = \\(\\int_0^{${k}} (${k}x - x^2) \\, dx = [\\frac{${k}x^2}{2} - \\frac{x^3}{3}]_0^{${k}} = ${area}\\)`,
      vizType: 'area-between',
      vizParams: { upperFn: `${k}*x`, lowerFn: 'x*x', a:0, b:k, area },
      difficulty: diff,
    };
  },
};