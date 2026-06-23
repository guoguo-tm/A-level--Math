// ========== Trigonometry Topic Questions ==========
const TrigonometryGenerators = {

  // ----- Exact Values of Trig Functions -----
  "exact-values": (diff) => {
    const angles = [30, 45, 60, 90, 0, 180, 270, 360];
    const easyAngles = [30, 45, 60, 90, 0, 180];
    const pool = diff === 'easy' ? easyAngles : angles;
    const angle = randChoice(pool);
    const fn = randChoice(['sin', 'cos', 'tan']);

    const rad = angle * Math.PI / 180;
    let answer;
    if (fn === 'sin') answer = Math.sin(rad);
    else if (fn === 'cos') answer = Math.cos(rad);
    else answer = Math.tan(rad);

    // Format as fraction/surd
    let ansDisplay;
    if (angle === 0) ansDisplay = fn === 'sin' || fn === 'tan' ? '0' : '1';
    else if (angle === 30) {
      if (fn === 'sin') ansDisplay = '\\frac{1}{2}';
      else if (fn === 'cos') ansDisplay = '\\frac{\\sqrt{3}}{2}';
      else ansDisplay = '\\frac{1}{\\sqrt{3}}';
    } else if (angle === 45) {
      if (fn === 'sin' || fn === 'cos') ansDisplay = '\\frac{\\sqrt{2}}{2}';
      else ansDisplay = '1';
    } else if (angle === 60) {
      if (fn === 'sin') ansDisplay = '\\frac{\\sqrt{3}}{2}';
      else if (fn === 'cos') ansDisplay = '\\frac{1}{2}';
      else ansDisplay = '\\sqrt{3}';
    } else if (angle === 90) {
      if (fn === 'sin') ansDisplay = '1';
      else if (fn === 'cos') ansDisplay = '0';
      else ansDisplay = '\\text{undefined}';
    } else if (angle === 180) {
      ansDisplay = fn === 'sin' || fn === 'tan' ? '0' : '-1';
    } else if (angle === 270) {
      ansDisplay = fn === 'sin' ? '-1' : (fn === 'cos' ? '0' : '\\text{undefined}');
    } else {
      ansDisplay = String(Math.round(answer * 10000) / 10000);
    }

    const fnName = { sin: '\\sin', cos: '\\cos', tan: '\\tan' }[fn];

    return {
      questionZh: `求 \\(${fnName} ${angle}^\\circ\\) 的精确值。`,
      questionEn: `Find the exact value of \\(${fnName} ${angle}^\\circ\\).`,
      answer: parseFloat(answer.toFixed(6)),
      answerDisplay: `\\(${ansDisplay}\\)`,
      answerType: 'numeric',
      hintZh: `使用特殊角三角函数值表（30°, 45°, 60° 等）。`,
      hintEn: `Use the exact trig value table for special angles (30°, 45°, 60° etc).`,
      solutionZh: `\\(${fnName} ${angle}^\\circ = ${ansDisplay}\\)`,
      solutionEn: `\\(${fnName} ${angle}^\\circ = ${ansDisplay}\\)`,
      vizType: 'unit-circle',
      vizParams: { angle: rad, fn },
      difficulty: diff,
    };
  },

  // ----- Trig Identities -----
  "trig-identities": (diff) => {
    // Solve for θ in a range using identities
    // e.g., 2sin²θ = 1, find θ in [0, 360]
    const type = diff === 'easy' ? 'sin-cos' : (diff === 'medium' ? 'double-angle' : 'quadratic');

    let questionZh, questionEn, answer, answerDisplay, solutionZh, solutionEn;

    if (type === 'sin-cos') {
      // sin²θ + cos²θ = 1 type
      // sinθ = k, find cosθ
      const kNum = randChoice([3, 4, 1, 2]);
      const kDen = randChoice([5, 5, 2, 2]);
      if (kNum > kDen) { kNum = 3; kDen = 5; }
      const sinVal = kNum / kDen;
      const cosVal = Math.sqrt(1 - sinVal * sinVal);

      questionZh = `已知 \\(\\sin \\theta = \\frac{${kNum}}{${kDen}}\\)，且 \\(0^\\circ < \\theta < 90^\\circ\\)，求 \\(\\cos \\theta\\)。`;
      questionEn = `Given \\(\\sin \\theta = \\frac{${kNum}}{${kDen}}\\) and \\(0^\\circ < \\theta < 90^\\circ\\), find \\(\\cos \\theta\\).`;
      answer = parseFloat(cosVal.toFixed(6));
      const numSqrt = Math.sqrt(kDen*kDen - kNum*kNum);
      ansDisplay = Number.isInteger(numSqrt) ? `\\frac{${numSqrt}}{${kDen}}` : cosVal.toFixed(4);
      answerDisplay = `\\(${ansDisplay}\\)`;
      solutionZh = `使用 \\(\\sin^2\\theta + \\cos^2\\theta = 1\\)：\\n\\(\\cos\\theta = \\sqrt{1 - \\sin^2\\theta} = \\sqrt{1 - \\frac{${kNum*kNum}}{${kDen*kDen}}} = \\frac{${numSqrt}}{${kDen}}\\)`;
      solutionEn = `Using \\(\\sin^2\\theta + \\cos^2\\theta = 1\\):\\n\\(\\cos\\theta = \\sqrt{1 - \\sin^2\\theta} = \\sqrt{1 - \\frac{${kNum*kNum}}{${kDen*kDen}}} = \\frac{${numSqrt}}{${kDen}}\\)`;

    } else if (type === 'double-angle') {
      // sin(2θ) = 2sinθcosθ, given sinθ find sin(2θ)
      const sinNum = randChoice([3, 4, 1]);
      const sinDen = 5;
      const sinVal = sinNum / sinDen;
      const cosVal = Math.sqrt(1 - sinVal * sinVal);
      const sin2 = 2 * sinVal * cosVal;
      const sin2Frac = sin2;

      questionZh = `已知 \\(\\sin \\theta = \\frac{${sinNum}}{${sinDen}}\\)，\\(0^\\circ < \\theta < 90^\\circ\\)，求 \\(\\sin 2\\theta\\)。`;
      questionEn = `Given \\(\\sin \\theta = \\frac{${sinNum}}{${sinDen}}\\), \\(0^\\circ < \\theta < 90^\\circ\\), find \\(\\sin 2\\theta\\).`;
      answer = parseFloat(sin2.toFixed(6));
      const numSqrt = Math.round(Math.sqrt(sinDen*sinDen - sinNum*sinNum));
      ansDisplay = `\\frac{${2*sinNum*numSqrt}}{${sinDen*sinDen}}`;
      answerDisplay = `\\(${ansDisplay}\\)`;
      solutionZh = `\\(\\sin 2\\theta = 2\\sin\\theta\\cos\\theta\\)\\n先求 \\(\\cos\\theta = \\frac{${numSqrt}}{${sinDen}}\\)\\n\\(\\sin 2\\theta = 2 \\cdot \\frac{${sinNum}}{${sinDen}} \\cdot \\frac{${numSqrt}}{${sinDen}} = \\frac{${2*sinNum*numSqrt}}{${sinDen*sinDen}}\\)`;
      solutionEn = `\\(\\sin 2\\theta = 2\\sin\\theta\\cos\\theta\\)\\n\\(\\cos\\theta = \\frac{${numSqrt}}{${sinDen}}\\)\\n\\(\\sin 2\\theta = 2 \\cdot \\frac{${sinNum}}{${sinDen}} \\cdot \\frac{${numSqrt}}{${sinDen}} = \\frac{${2*sinNum*numSqrt}}{${sinDen*sinDen}}\\)`;

    } else {
      // Solve 2sin²θ - sinθ - 1 = 0 or similar
      const sol1 = 0.5;
      const sol2 = 1;
      // Equation: (2sinθ + 1)(sinθ - 1) = 0 or similar
      questionZh = `解方程 \\(2\\sin^2\\theta - 3\\sin\\theta + 1 = 0\\)，\\(0^\\circ \\leq \\theta \\leq 360^\\circ\\)。`;
      questionEn = `Solve \\(2\\sin^2\\theta - 3\\sin\\theta + 1 = 0\\) for \\(0^\\circ \\leq \\theta \\leq 360^\\circ\\).`;
      answer = [30, 150, 90]; // sinθ = 1/2 → 30°, 150°; sinθ = 1 → 90°
      answerDisplay = `\\(\\theta = 30^\\circ, 90^\\circ, 150^\\circ\\)`;
      answerType: 'multiple';
      solutionZh = `令 \\(u = \\sin\\theta\\)，则 \\(2u^2 - 3u + 1 = 0\\) → \\((2u-1)(u-1)=0\\)\\n\\(u = \\frac{1}{2}\\) 或 \\(u = 1\\)\\n\\(\\sin\\theta = \\frac{1}{2}\\) → \\(\\theta = 30^\\circ, 150^\\circ\\)\\n\\(\\sin\\theta = 1\\) → \\(\\theta = 90^\\circ\\)`;
      solutionEn = `Let \\(u = \\sin\\theta\\), then \\(2u^2 - 3u + 1 = 0\\) → \\((2u-1)(u-1)=0\\)\\n\\(u = \\frac{1}{2}\\) or \\(u = 1\\)\\n\\(\\sin\\theta = \\frac{1}{2}\\) → \\(\\theta = 30^\\circ, 150^\\circ\\)\\n\\(\\sin\\theta = 1\\) → \\(\\theta = 90^\\circ\\)`;
    }

    return {
      questionZh, questionEn, answer, answerDisplay,
      answerType: diff === 'easy' ? 'numeric' : 'multiple',
      hintZh: '使用基本的三角恒等式。',
      hintEn: 'Use basic trigonometric identities.',
      solutionZh, solutionEn,
      vizType: 'unit-circle',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Sine/Cosine Rule -----
  "sine-cosine-rule": (diff) => {
    // Given two sides and an angle, find the third side
    const type = randChoice(['sine', 'cosine']);

    if (type === 'sine' || diff === 'easy') {
      // A = 30°, a = random, B = random, find b
      const A = randChoice([30, 45, 60]);
      const sideA = randInt(4, 10);
      const B = A === 30 ? randChoice([45, 60]) : (A === 45 ? randChoice([30, 60]) : randChoice([30, 45]));
      const sideB = (sideA * Math.sin(B*Math.PI/180)) / Math.sin(A*Math.PI/180);
      const niceB = Math.round(sideB * 100) / 100;

      questionZh = `在三角形 ABC 中，\\(A = ${A}^\\circ\\)，\\(B = ${B}^\\circ\\)，\\(a = ${sideA}\\)，求边 \\(b\\)。`;
      questionEn = `In triangle ABC, \\(A = ${A}^\\circ\\), \\(B = ${B}^\\circ\\), \\(a = ${sideA}\\). Find side \\(b\\).`;
      answer = niceB;
      answerDisplay = `\\(${niceB}\\)`;
      answerType: 'numeric';
      solutionZh = `正弦定理：\\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B}\\)\\n\\(b = \\frac{a \\sin B}{\\sin A} = \\frac{${sideA} \\cdot \\sin ${B}^\\circ}{\\sin ${A}^\\circ} ${niceB}\\)`;
      solutionEn = `Sine Rule: \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B}\\)\\n\\(b = \\frac{a \\sin B}{\\sin A} = \\frac{${sideA} \\cdot \\sin ${B}^\\circ}{\\sin ${A}^\\circ} ${niceB}\\)`;

    } else {
      // Cosine rule: c² = a² + b² - 2ab cosC
      const a = randInt(5, 8);
      const b = randInt(4, 7);
      const C = randChoice([60, 120]);
      const cosC = Math.cos(C * Math.PI / 180);
      const c = Math.sqrt(a*a + b*b - 2*a*b*cosC);
      const niceC = Math.round(c * 100) / 100;

      questionZh = `在三角形 ABC 中，\\(a = ${a}\\)，\\(b = ${b}\\)，\\(C = ${C}^\\circ\\)，求边 \\(c\\)。`;
      questionEn = `In triangle ABC, \\(a = ${a}\\), \\(b = ${b}\\), \\(C = ${C}^\\circ\\). Find side \\(c\\).`;
      answer = niceC;
      answerDisplay = `\\(${niceC}\\)`;
      answerType: 'numeric';
      solutionZh = `余弦定理：\\(c^2 = a^2 + b^2 - 2ab\\cos C\\)\\n\\(c^2 = ${a}^2 + ${b}^2 - 2 \\cdot ${a} \\cdot ${b} \\cdot \\cos ${C}^\\circ\\)\\n\\(c \\approx ${niceC}\\)`;
      solutionEn = `Cosine Rule: \\(c^2 = a^2 + b^2 - 2ab\\cos C\\)\\n\\(c^2 = ${a}^2 + ${b}^2 - 2 \\cdot ${a} \\cdot ${b} \\cdot \\cos ${C}^\\circ\\)\\n\\(c \\approx ${niceC}\\)`;
    }

    return {
      questionZh, questionEn, answer, answerDisplay, answerType: 'numeric',
      hintZh: type === 'sine' ? '使用正弦定理。' : '使用余弦定理。',
      hintEn: type === 'sine' ? 'Use the Sine Rule.' : 'Use the Cosine Rule.',
      solutionZh, solutionEn,
      vizType: 'triangle',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Trig Equations -----
  "trig-equation": (diff) => {
    // sinθ = k, find θ in [0°, 360°]
    const kNum = randChoice([1, 1, 2, 3]);
    const kDen = randChoice([2, 2, 2, 2]);
    const fn = randChoice(['sin', 'cos', 'tan']);
    if (fn === 'tan' && kNum/kDen > 3) { kNum = 1; kDen = 1; }

    const k = kNum / kDen;
    let baseAngle, displayVal;
    if (kNum === 1 && kDen === 2) displayVal = '\\frac{1}{2}';
    else if (kNum === kDen) displayVal = '1';
    else if (kNum === 2 && kDen === 2) displayVal = '1';
    else displayVal = `\\frac{${kNum}}{${kDen}}`;

    if (fn === 'sin') {
      baseAngle = Math.asin(k) * 180 / Math.PI;
      const sol1 = Math.round(baseAngle * 10) / 10;
      const sol2 = Math.round((180 - baseAngle) * 10) / 10;
      answer = [sol1, sol2];
      answerDisplay = `\\(\\theta = ${sol1}^\\circ, ${sol2}^\\circ\\)`;
    } else if (fn === 'cos') {
      baseAngle = Math.acos(k) * 180 / Math.PI;
      const sol1 = Math.round(baseAngle * 10) / 10;
      const sol2 = Math.round((360 - baseAngle) * 10) / 10;
      answer = [sol1, sol2];
      answerDisplay = `\\(\\theta = ${sol1}^\\circ, ${sol2}^\\circ\\)`;
    } else {
      baseAngle = Math.atan(k) * 180 / Math.PI;
      const sol1 = Math.round(baseAngle * 10) / 10;
      const sol2 = sol1 + 180;
      answer = [sol1, sol2];
      answerDisplay = `\\(\\theta = ${sol1}^\\circ, ${sol2}^\\circ\\)`;
    }

    return {
      questionZh: `解方程 \\(\\${fn}\\theta = ${displayVal}\\)，\\(0^\\circ \\leq \\theta \\leq 360^\\circ\\)。`,
      questionEn: `Solve \\(\\${fn}\\theta = ${displayVal}\\) for \\(0^\\circ \\leq \\theta \\leq 360^\\circ\\).`,
      answer, answerDisplay, answerType: 'multiple',
      hintZh: `先求基本解，再利用 ${fn === 'sin' ? 'sin(180°-θ) = sinθ' : fn === 'cos' ? 'cos(360°-θ) = cosθ' : 'tan 的周期是 180°'}。`,
      hintEn: `Find the principal solution first, then use ${fn === 'sin' ? 'sin(180°-θ)=sinθ' : fn === 'cos' ? 'cos(360°-θ)=cosθ' : 'period of tan is 180°'}.`,
      solutionZh: `\\(\\${fn}\\theta = ${displayVal}\\)\\n基本解：\\(\\theta_1 = ${Math.round(baseAngle*10)/10}^\\circ\\)\\n第二解在上述范围内`,
      solutionEn: `\\(\\${fn}\\theta = ${displayVal}\\)\\nPrincipal: \\(\\theta_1 = ${Math.round(baseAngle*10)/10}^\\circ\\)\\nSecond solution in range`,
      vizType: 'unit-circle',
      vizParams: { fn, k },
      difficulty: diff,
    };
  },
};