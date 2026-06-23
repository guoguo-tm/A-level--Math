// ========== Mechanics Topic Questions ==========
const MechanicsGenerators = {

  // ----- SUVAT: Find displacement given u, a, t -----
  "suvat-displacement": (diff) => {
    const u = diff === 'easy' ? randInt(0, 5) : randInt(0, 10);
    const a = diff === 'easy' ? randInt(1, 4) : (diff === 'medium' ? randInt(1, 8) : randFloat(-5, 10, 1));
    const t = diff === 'easy' ? randInt(2, 6) : randInt(2, 10);
    // s = ut + 0.5*a*t^2
    const s = u * t + 0.5 * a * t * t;

    return {
      questionZh: `一物体以初速度 \\(${u} \\, \\text{m/s}\\) 运动，加速度为 \\(${a} \\, \\text{m/s}^2\\)。求 \\(${t}\\) 秒后的位移。`,
      questionEn: `A particle moves with initial velocity \\(${u} \\, \\text{m/s}\\) and acceleration \\(${a} \\, \\text{m/s}^2\\). Find its displacement after \\(${t}\\) seconds.`,
      answer: parseFloat(s.toFixed(4)),
      answerDisplay: `\\(${s} \\, \\text{m}\\)`,
      answerType: 'numeric',
      hintZh: `使用 \\(s = ut + \\frac{1}{2}at^2\\)`,
      hintEn: `Use \\(s = ut + \\frac{1}{2}at^2\\)`,
      solutionZh: `\\(s = ${u} \\times ${t} + \\frac{1}{2} \\times ${a} \\times ${t}^2 = ${u*t} + ${0.5*a*t*t} = ${s}\\)`,
      solutionEn: `\\(s = ${u} \\times ${t} + \\frac{1}{2} \\times ${a} \\times ${t}^2 = ${u*t} + ${0.5*a*t*t} = ${s}\\)`,
      vizType: 'kinematics',
      vizParams: { u, a, t },
      difficulty: diff,
    };
  },

  // ----- SUVAT: Find final velocity -----
  "suvat-velocity": (diff) => {
    const u = randInt(0, 8);
    const a = diff === 'easy' ? randInt(1, 5) : randInt(1, 10);
    const t = randInt(2, 8);
    const v = u + a * t;

    return {
      questionZh: `一物体以初速度 \\(${u} \\, \\text{m/s}\\) 运动，加速度为 \\(${a} \\, \\text{m/s}^2\\)。求 \\(${t}\\) 秒后的速度。`,
      questionEn: `A particle has initial velocity \\(${u} \\, \\text{m/s}\\) and acceleration \\(${a} \\, \\text{m/s}^2\\). Find its velocity after \\(${t}\\) seconds.`,
      answer: v,
      answerDisplay: `\\(${v} \\, \\text{m/s}\\)`,
      answerType: 'numeric',
      hintZh: `使用 \\(v = u + at\\)`,
      hintEn: `Use \\(v = u + at\\)`,
      solutionZh: `\\(v = ${u} + ${a} \\times ${t} = ${v}\\)`,
      solutionEn: `\\(v = ${u} + ${a} \\times ${t} = ${v}\\)`,
      vizType: 'kinematics',
      vizParams: { u, a, t },
      difficulty: diff,
    };
  },

  // ----- Projectile Motion -----
  "projectile-time": (diff) => {
    // Time of flight for projectile launched from ground at angle θ with speed u
    const u = randInt(10, 30);
    const angle = diff === 'easy' ? 90 : randChoice([30, 45, 60]);
    const g = 9.8;
    const rad = angle * Math.PI / 180;
    const timeFlight = 2 * u * Math.sin(rad) / g;

    return {
      questionZh: `一物体以 \\(${u} \\, \\text{m/s}\\) 的初速度从地面以 \\(${angle}^\\circ\\) 角度抛出。求其飞行时间（取 g = 9.8 m/s²）。`,
      questionEn: `A projectile is launched from the ground at \\(${u} \\, \\text{m/s}\\) at an angle of \\(${angle}^\\circ\\) to the horizontal. Find its time of flight (take g = 9.8 m/s²).`,
      answer: parseFloat(timeFlight.toFixed(2)),
      answerDisplay: `\\(${timeFlight.toFixed(2)} \\, \\text{s}\\)`,
      answerType: 'numeric',
      hintZh: `飞行时间 \\(T = \\frac{2u\\sin\\theta}{g}\\)`,
      hintEn: `Time of flight \\(T = \\frac{2u\\sin\\theta}{g}\\)`,
      solutionZh: `\\(T = \\frac{2 \\times ${u} \\times \\sin ${angle}^\\circ}{9.8} = \\frac{${2*u*Math.sin(rad).toFixed(1)}}{9.8} = ${timeFlight.toFixed(2)}\\)`,
      solutionEn: `\\(T = \\frac{2 \\times ${u} \\times \\sin ${angle}^\\circ}{9.8} = \\frac{${2*u*Math.sin(rad).toFixed(1)}}{9.8} = ${timeFlight.toFixed(2)}\\)`,
      vizType: 'projectile',
      vizParams: { u, angle, g: 9.8 },
      difficulty: diff,
    };
  },

  // ----- Forces (F = ma) -----
  "newton-second": (diff) => {
    const m = diff === 'easy' ? randInt(1, 5) : randFloat(2, 10);
    const a = diff === 'easy' ? randInt(1, 4) : randInt(1, 8);
    const F = m * a;

    return {
      questionZh: `一个质量为 \\(${m} \\, \\text{kg}\\) 的物体以 \\(${a} \\, \\text{m/s}^2\\) 的加速度运动。求作用在物体上的合力。`,
      questionEn: `A particle of mass \\(${m} \\, \\text{kg}\\) accelerates at \\(${a} \\, \\text{m/s}^2\\). Find the resultant force acting on it.`,
      answer: parseFloat(F.toFixed(2)),
      answerDisplay: `\\(${F} \\, \\text{N}\\)`,
      answerType: 'numeric',
      hintZh: `牛顿第二定律：\\(F = ma\\)`,
      hintEn: `Newton's Second Law: \\(F = ma\\)`,
      solutionZh: `\\(F = ${m} \\times ${a} = ${F}\\)`,
      solutionEn: `\\(F = ${m} \\times ${a} = ${F}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Connected Particles / Pulley Tension -----
  "pulley-tension": (diff) => {
    // Two masses m1, m2 connected by string over pulley
    const m1 = randInt(2, 5);
    const m2 = diff === 'easy' ? randInt(1, m1 - 1) : randInt(1, m1 + 3);
    const g = 9.8;
    // Tension = 2*m1*m2*g / (m1 + m2)
    const T = 2 * m1 * m2 * g / (m1 + m2);

    return {
      questionZh: `质量分别为 \\(${m1} \\, \\text{kg}\\) 和 \\(${m2} \\, \\text{kg}\\) 的两个物体由一根轻绳通过光滑滑轮连接。求绳的张力（取 g = 9.8 m/s²）。`,
      questionEn: `Two particles of masses \\(${m1} \\, \\text{kg}\\) and \\(${m2} \\, \\text{kg}\\) are connected by a light string passing over a smooth pulley. Find the tension in the string (take g = 9.8 m/s²).`,
      answer: parseFloat(T.toFixed(2)),
      answerDisplay: `\\(${T.toFixed(2)} \\, \\text{N}\\)`,
      answerType: 'numeric',
      hintZh: `张力 \\(T = \\frac{2m_1 m_2 g}{m_1 + m_2}\\)`,
      hintEn: `Tension \\(T = \\frac{2m_1 m_2 g}{m_1 + m_2}\\)`,
      solutionZh: `\\(T = \\frac{2 \\times ${m1} \\times ${m2} \\times 9.8}{${m1} + ${m2}} = ${T.toFixed(2)}\\)`,
      solutionEn: `\\(T = \\frac{2 \\times ${m1} \\times ${m2} \\times 9.8}{${m1} + ${m2}} = ${T.toFixed(2)}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },

  // ----- Momentum -----
  "momentum": (diff) => {
    const m = randInt(1, 6);
    const v = diff === 'easy' ? randInt(2, 8) : randInt(-5, 10);
    const p = m * v;

    return {
      questionZh: `一个质量为 \\(${m} \\, \\text{kg}\\) 的物体以 \\(${v} \\, \\text{m/s}\\) 的速度运动。求其动量。`,
      questionEn: `A particle of mass \\(${m} \\, \\text{kg}\\) moves with velocity \\(${v} \\, \\text{m/s}\\). Find its momentum.`,
      answer: p,
      answerDisplay: `\\(${p} \\, \\text{kg·m/s}\\)`,
      answerType: 'numeric',
      hintZh: `动量 \\(p = mv\\)`,
      hintEn: `Momentum \\(p = mv\\)`,
      solutionZh: `\\(p = ${m} \\times ${v} = ${p}\\)`,
      solutionEn: `\\(p = ${m} \\times ${v} = ${p}\\)`,
      vizType: 'none',
      vizParams: null,
      difficulty: diff,
    };
  },
};