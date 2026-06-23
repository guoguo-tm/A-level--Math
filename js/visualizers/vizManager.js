// ========== Visualization Manager ==========
class VisualizationManager {
  constructor(mathVizInstance) {
    this.viz = mathVizInstance;
    this.currentType = 'none';
    this.animationPlaying = false;
  }

  /**
   * Update visualization based on current question's vizType and vizParams
   */
  update(question) {
    if (!question || !this.viz) return;
    this.viz.stopAnimation();
    this.viz.setFunctions([]);
    this.viz.setExtraDraw(null);
    this.viz.clearAnnotations();

    const type = question.vizType || 'none';
    const params = question.vizParams || {};

    this.currentType = type;

    switch (type) {
      case 'quadratic':
        this.drawQuadratic(params);
        break;
      case 'derivative':
        this.drawDerivative(params);
        break;
      case 'tangent':
        this.drawTangent(params);
        break;
      case 'stationary':
        this.drawStationary(params);
        break;
      case 'integral':
        this.drawIntegral(params);
        break;
      case 'definite-integral':
        this.drawDefiniteIntegral(params);
        break;
      case 'area-between':
        this.drawAreaBetween(params);
        break;
      case 'unit-circle':
        this.drawUnitCircle(params);
        break;
      case 'exponential':
        this.drawExponential(params);
        break;
      case 'vector':
        this.drawVector(params);
        break;
      case 'kinematics':
        this.drawKinematics(params);
        break;
      case 'projectile':
        this.drawProjectile(params);
        break;
      case 'binomial':
        this.drawBinomial(params);
        break;
      case 'normal':
        this.drawNormal(params);
        break;
      case 'simultaneous':
        this.drawSimultaneous(params);
        break;
      default:
        this.drawPlaceholder();
    }
  }

  // ===== Individual Visualizers =====

  drawQuadratic(params) {
    const { a, b, c, roots } = params;
    this.viz.setView(-6, 6, -6, 10);
    const fn = (x) => a*x*x + b*x + c;
    this.viz.setFunctions([
      { fn, color: this.viz.colors.curve, width: 3 }
    ]);
    this.viz.setExtraDraw((v) => {
      // Draw roots
      if (roots) {
        roots.forEach(r => {
          v.drawPoint(r, 0, 6, v.colors.point);
          v.drawText(`(${r}, 0)`, r, -0.5, v.colors.text);
        });
      }
      // Draw vertex
      const vx = -b / (2*a);
      const vy = fn(vx);
      v.drawPoint(vx, vy, 5, '#ec4899');
      v.drawText(`(${vx.toFixed(1)}, ${vy.toFixed(1)})`, vx, vy + 0.5, '#ec4899');
    });
    this.viz.render();
  }

  drawDerivative(params) {
    const { a, b, c, d } = params;
    this.viz.setView(-6, 6, -10, 10);
    const fn = (x) => a*x*x*x + b*x*x + c*x + d;
    const dfn = (x) => 3*a*x*x + 2*b*x + c;
    this.viz.setFunctions([
      { fn, color: this.viz.colors.curve, width: 3 },
      { fn: dfn, color: this.viz.colors.curve2, width: 2 }
    ]);
    this.viz.setExtraDraw((v) => {
      v.drawText('f(x)', 5.5, fn(5.5), v.colors.curve, 'left');
      v.drawText("f'(x)", 5.5, dfn(5.5), v.colors.curve2, 'left');
    });
    this.viz.render();
  }

  drawTangent(params) {
    const { b, c, x0, y0, slope, intercept } = params;
    this.viz.setView(-5, 7, -6, 10);
    const fn = (x) => x*x + b*x + c;
    const tan = (x) => slope*x + intercept;
    this.viz.setFunctions([
      { fn, color: this.viz.colors.curve, width: 2.5 },
      { fn: tan, color: this.viz.colors.tangent, width: 2 }
    ]);
    this.viz.setExtraDraw((v) => {
      v.drawPoint(x0, y0, 6, v.colors.point);
      v.drawText(`(${x0}, ${y0})`, x0, y0 - 0.8, v.colors.text);
    });
    this.viz.render();
  }

  drawStationary(params) {
    const { b, c, d, sps } = params;
    this.viz.setView(-5, 7, -10, 10);
    const fn = (x) => x*x*x + b*x*x + c*x + d;
    this.viz.setFunctions([{ fn, color: this.viz.colors.curve, width: 3 }]);
    this.viz.setExtraDraw((v) => {
      if (sps) {
        sps.forEach(sp => {
          v.drawPoint(sp[0], sp[1], 7, v.colors.point);
          v.drawText(`(${sp[0]}, ${sp[1]})`, sp[0], sp[1] + 1, v.colors.text);
        });
      }
    });
    this.viz.render();
  }

  drawIntegral(params) {
    const { fn: fnStr, antiderFn: antiStr } = params;
    this.viz.setView(-3, 5, -5, 15);
    const fn = MathViz.fnEval(fnStr);
    const anti = MathViz.fnEval(antiStr);
    this.viz.setFunctions([
      { fn, color: this.viz.colors.curve, width: 3 },
      { fn: anti, color: this.viz.colors.curve2, width: 2 }
    ]);
    this.viz.setExtraDraw((v) => {
      v.drawText('f(x)', 4, fn(4), v.colors.curve, 'left');
      v.drawText('F(x)', 4, anti(4), v.colors.curve2, 'left');
    });
    this.viz.render();
  }

  drawDefiniteIntegral(params) {
    const { fnExpr, a, b } = params;
    this.viz.setView(a - 0.5, b + 0.5, -2, Math.max(10, Math.abs(Math.pow(b, 2))*1.2));
    const fn = MathViz.fnEval(fnExpr);
    this.viz.setFunctions([{ fn, color: this.viz.colors.curve, width: 3 }]);
    this.viz.setExtraDraw((v) => {
      v.drawFilledArea(fn, a, b, v.colors.area);
      v.drawPoint(a, fn(a), 5, v.colors.point);
      v.drawPoint(b, fn(b), 5, v.colors.point);
      v.drawLine(a, 0, a, fn(a), v.colors.axes, 1, [4, 4]);
      v.drawLine(b, 0, b, fn(b), v.colors.axes, 1, [4, 4]);
    });
    this.viz.render();
  }

  drawAreaBetween(params) {
    const { upperFn, lowerFn, a, b } = params;
    this.viz.setView(a - 0.5, b + 0.5, -1, Math.pow(b, 2) + 2);
    const upper = MathViz.fnEval(upperFn);
    const lower = MathViz.fnEval(lowerFn);
    this.viz.setFunctions([
      { fn: upper, color: this.viz.colors.curve, width: 2.5 },
      { fn: lower, color: this.viz.colors.curve2, width: 2.5 }
    ]);
    this.viz.setExtraDraw((v) => {
      // Shade between curves
      const ctx = v.ctx;
      ctx.fillStyle = v.colors.area;
      ctx.beginPath();
      const steps = 100;
      for (let i = 0; i <= steps; i++) {
        const x = a + (i/steps)*(b-a);
        const yUpper = upper(x);
        const yLower = lower(x);
        const cx = v.toCanvasX(x);
        const cyU = v.toCanvasY(isNaN(yUpper)?0:yUpper);
        if (i===0) ctx.moveTo(cx, cyU);
        else ctx.lineTo(cx, cyU);
      }
      for (let i = steps; i >= 0; i--) {
        const x = a + (i/steps)*(b-a);
        const yLower = lower(x);
        const cx = v.toCanvasX(x);
        const cyL = v.toCanvasY(isNaN(yLower)?0:yLower);
        ctx.lineTo(cx, cyL);
      }
      ctx.closePath();
      ctx.fill();
    });
    this.viz.render();
  }

  drawUnitCircle(params) {
    this.viz.setView(-1.5, 1.5, -1.5, 1.5);
    this.viz.gridStep = 0.5;
    this.viz.setFunctions([]);
    this.viz.setExtraDraw((v) => {
      const ctx = v.ctx;
      // Draw unit circle
      ctx.strokeStyle = v.colors.curve;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(v.toCanvasX(0), v.toCanvasY(0),
        v.toCanvasX(1) - v.toCanvasX(0), 0, Math.PI*2);
      ctx.stroke();

      // Draw angle line if params provided
      if (params && params.angle !== undefined) {
        const angle = params.angle;
        const ex = Math.cos(angle);
        const ey = Math.sin(angle);
        v.drawLine(0, 0, ex, ey, v.colors.curve2, 2);
        v.drawPoint(ex, ey, 5, v.colors.point);
        if (params.fn) {
          const fnVal = params.fn === 'sin' ? Math.sin(angle) : (params.fn === 'cos' ? Math.cos(angle) : Math.tan(angle));
          v.drawText(`${params.fn}θ = ${fnVal.toFixed(2)}`, ex * 1.3, ey * 1.1, v.colors.text);
        }
      }

      // Axis labels
      v.drawText('(1,0)', 1, 0.1, v.colors.label, 'center', 'top');
      v.drawText('(0,1)', 0.1, 1, v.colors.label, 'left', 'center');
    });
    this.viz.render();
  }

  drawExponential(params) {
    const { base, solution } = params;
    this.viz.setView(-2, solution + 3, -1, Math.pow(base || 2, solution + 2) + 1);
    const fn = (x) => Math.pow(base || 2, x);
    this.viz.setFunctions([{ fn, color: this.viz.colors.curve, width: 3 }]);
    this.viz.setExtraDraw((v) => {
      if (solution !== undefined) {
        const solY = fn(solution);
        v.drawPoint(solution, solY, 5, v.colors.point);
        v.drawLine(solution, 0, solution, solY, v.colors.axes, 1, [4, 4]);
        v.drawLine(0, solY, solution, solY, v.colors.axes, 1, [4, 4]);
      }
    });
    this.viz.render();
  }

  drawVector(params) {
    this.viz.setView(-8, 8, -8, 8);
    this.viz.setFunctions([]);
    this.viz.setExtraDraw((v) => {
      // Draw primary vector
      if (params.x !== undefined && params.y !== undefined) {
        v.drawArrow(0, 0, params.x, params.y, v.colors.curve, 3);
        v.drawText(`(${params.x}, ${params.y})`, params.x/2, params.y/2 + 0.3, v.colors.text);

        // Second vector if params include b1, b2
        if (params.b1 !== undefined && params.b2 !== undefined) {
          v.drawArrow(0, 0, params.b1, params.b2, v.colors.curve2, 3);
          v.drawText(`(${params.b1}, ${params.b2})`, params.b1/2, params.b2/2 + 0.3, v.colors.curve2);

          // Result if available
          if (params.r1 !== undefined && params.r2 !== undefined) {
            v.drawArrow(0, 0, params.r1, params.r2, v.colors.curve3, 2);
            v.drawText(`结果`, params.r1/2, params.r2/2 - 0.5, v.colors.curve3);
          }
        }

        // Show scalar multiplication
        if (params.k !== undefined) {
          const rx = params.x * params.k;
          const ry = params.y * params.k;
          v.drawArrow(0, 0, rx, ry, v.colors.tangent, 2);
          v.drawText(`${params.k}v`, rx/2, ry/2 - 0.5, v.colors.tangent);
        }
      }
    });
    this.viz.render();
  }

  drawKinematics(params) {
    // Simple position-time graph
    const { u, a } = params;
    this.viz.setView(0, 10, 0, 60);
    const s = (t) => u*t + 0.5*a*t*t;
    this.viz.setFunctions([{ fn: s, color: this.viz.colors.curve, width: 3 }]);
    this.viz.setExtraDraw((v) => {
      v.drawText('s (m)', 9, s(9) + 3, v.colors.text, 'left');
      v.drawText('t (s)', 9, -2, v.colors.text, 'right', 'top');
    });
    this.viz.render();
  }

  drawProjectile(params) {
    const { u, angle, g } = params;
    const rad = angle * Math.PI / 180;
    const totalTime = 2 * u * Math.sin(rad) / g;
    this.viz.setView(0, u*Math.cos(rad)*totalTime*1.05, 0, u*u*Math.sin(rad)*Math.sin(rad)/(2*g)*1.2);

    // Parametric: y(t) = u*t*sinθ - 0.5g*t², x(t) = u*t*cosθ
    const traj = (x) => {
      const t = x / (u * Math.cos(rad));
      if (t > totalTime) return NaN;
      return u * t * Math.sin(rad) - 0.5 * g * t * t;
    };

    this.viz.setFunctions([{ fn: traj, color: this.viz.colors.curve, width: 3 }]);
    this.viz.setExtraDraw((v) => {
      // Max height
      const tMax = u * Math.sin(rad) / g;
      const xMax = u * Math.cos(rad) * tMax;
      const yMax = u*u*Math.sin(rad)*Math.sin(rad)/(2*g);
      v.drawPoint(xMax, yMax, 5, v.colors.point);
      v.drawLine(xMax, 0, xMax, yMax, v.colors.axes, 1, [4,4]);
      // Range
      const range = u*u*Math.sin(2*rad)/g;
      v.drawPoint(range, 0, 5, v.colors.point);
    });
    this.viz.render();
  }

  drawBinomial(params) {
    const { n, p } = params;
    this.viz.setView(-0.5, n + 0.5, 0, 0.5);
    this.viz.setFunctions([]);
    this.viz.setExtraDraw((v) => {
      for (let k = 0; k <= n; k++) {
        const prob = binom(n, k) * Math.pow(p, k) * Math.pow(1-p, n-k);
        v.drawRect(k - 0.35, 0, 0.7, prob, v.colors.curve, 0.5);
        if (prob > 0.01) {
          v.drawText(prob.toFixed(3), k, prob + 0.03, v.colors.text);
        }
      }
    });
    this.viz.render();
  }

  drawNormal(params) {
    this.viz.setView(-4, 4, 0, 0.5);
    const fn = (x) => Math.exp(-x*x/2) / Math.sqrt(2*Math.PI);
    this.viz.setFunctions([{ fn, color: this.viz.colors.curve, width: 3 }]);
    this.viz.setExtraDraw((v) => {
      if (params.z !== undefined) {
        // Shade area under curve up to z
        const ctx = v.ctx;
        ctx.fillStyle = v.colors.area;
        ctx.beginPath();
        const steps = 100;
        for (let i = 0; i <= steps; i++) {
          const x = -4 + (i/steps)*(params.z + 4);
          const y = fn(x);
          const cx = v.toCanvasX(x);
          const cy = v.toCanvasY(y);
          if (i===0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);
        }
        ctx.lineTo(v.toCanvasX(params.z), v.toCanvasY(0));
        ctx.lineTo(v.toCanvasX(-4), v.toCanvasY(0));
        ctx.closePath();
        ctx.fill();
        v.drawLine(params.z, 0, params.z, fn(params.z), v.colors.axes, 1, [4,4]);
      }
    });
    this.viz.render();
  }

  drawSimultaneous(params) {
    this.viz.setView(-6, 6, -6, 6);
    const funcs = [];
    if (params.a1 !== undefined) {
      // Linear eq1: a1*x + b1*y = c1 → y = (c1 - a1*x)/b1
      funcs.push({ fn: (x) => (params.c1 - params.a1*x)/params.b1, color: this.viz.colors.curve, width: 2.5 });
    }
    if (params.a2 !== undefined) {
      funcs.push({ fn: (x) => (params.c2 - params.a2*x)/params.b2, color: this.viz.colors.curve2, width: 2.5 });
    }
    if (params.linear) {
      const { m, c: cVal } = params.linear;
      funcs.push({ fn: (x) => m*x + cVal, color: this.viz.colors.curve, width: 2.5 });
    }
    if (params.circle) {
      this.viz.setExtraDraw((v) => {
        const ctx = v.ctx;
        ctx.strokeStyle = v.colors.curve2;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(v.toCanvasX(0), v.toCanvasY(0),
          v.toCanvasX(params.circle.r) - v.toCanvasX(0), 0, Math.PI*2);
        ctx.stroke();
      });
    }
    this.viz.setFunctions(funcs);
    this.viz.render();
  }

  drawPlaceholder() {
    this.viz.setView(-6, 6, -4, 4);
    this.viz.setFunctions([]);
    this.viz.setExtraDraw((v) => {
      v.drawText(i18n.getLang() === 'zh' ? '选择一道题目来查看可视化' : 'Select a question to view visualisation', 0, 0, v.colors.label);
    });
    this.viz.render();
  }

  // Arrow helper
  drawArrow(x1, y1, x2, y2, color, width) {
    const v = this.viz;
    v.drawLine(x1, y1, x2, y2, color, width);
    // Simple arrowhead
    const ctx = v.ctx;
    const cx = v.toCanvasX(x2);
    const cy = v.toCanvasY(y2);
    const angle = Math.atan2(y1-y2, x1-x2);
    const size = 8;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + size*Math.cos(angle - 0.5), cy + size*Math.sin(angle - 0.5));
    ctx.lineTo(cx + size*Math.cos(angle + 0.5), cy + size*Math.sin(angle + 0.5));
    ctx.fill();
  }
}