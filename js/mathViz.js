// ========== MathViz - Canvas Visualization Engine ==========
class MathViz {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
    this.animId = null;
    this.animSpeed = APP_CONFIG.animationSpeed;
    this.animTime = 0;
    this.isPlaying = false;

    // Coordinate system
    this.xMin = -6; this.xMax = 6;
    this.yMin = -4; this.yMax = 4;
    this.gridStep = 1;
    this.showGrid = true;
    this.showAxes = true;
    this.showLabels = true;

    // DPR scaling
    this.dpr = window.devicePixelRatio || 1;

    // Theme colors
    this.colors = {
      bg: '#ffffff',
      grid: '#e8ecf1',
      axes: '#b0b8c4',
      label: '#6b7280',
      curve: '#4f6ef7',
      curve2: '#ef4444',
      curve3: '#22c55e',
      point: '#f59e0b',
      tangent: '#ec4899',
      area: 'rgba(79,110,247,0.15)',
      text: '#1a1a2e',
    };

    // Functions to draw
    this.funcs = [];
    this.points = [];
    this.annotations = [];
    this.extraDraw = null;

    this.resize();
  }

  // ===== Coordinate Mapping =====
  toCanvasX(x) { return ((x - this.xMin) / (this.xMax - this.xMin)) * this.width; }
  toCanvasY(y) { return this.height - ((y - this.yMin) / (this.yMax - this.yMin)) * this.height; }
  toMathX(cx) { return this.xMin + (cx / this.width) * (this.xMax - this.xMin); }
  toMathY(cy) { return this.yMax - (cy / this.height) * (this.yMax - this.yMin); }

  // ===== Resize =====
  resize() {
    const r = this.canvas.getBoundingClientRect();
    this.width = r.width;
    this.height = r.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  // ===== Set View =====
  setView(xMin, xMax, yMin, yMax) {
    this.xMin = xMin; this.xMax = xMax;
    this.yMin = yMin; this.yMax = yMax;
  }

  // ===== Apply Dark Theme =====
  applyTheme(isDark) {
    if (isDark) {
      this.colors.bg = '#1a1d27';
      this.colors.grid = '#2e3141';
      this.colors.axes = '#555b70';
      this.colors.label = '#8b8fa3';
      this.colors.text = '#e4e6ed';
      this.colors.area = 'rgba(108,140,255,0.12)';
    } else {
      this.colors.bg = '#ffffff';
      this.colors.grid = '#e8ecf1';
      this.colors.axes = '#b0b8c4';
      this.colors.label = '#6b7280';
      this.colors.text = '#1a1a2e';
      this.colors.area = 'rgba(79,110,247,0.15)';
    }
  }

  // ===== Drawing Primitives =====
  clear() {
    this.ctx.fillStyle = this.colors.bg;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawGrid() {
    if (!this.showGrid) return;
    this.ctx.strokeStyle = this.colors.grid;
    this.ctx.lineWidth = 0.5;
    this.ctx.beginPath();

    // snap to gridStep
    const sx = Math.floor(this.xMin / this.gridStep) * this.gridStep;
    const sy = Math.floor(this.yMin / this.gridStep) * this.gridStep;

    for (let x = sx; x <= this.xMax; x += this.gridStep) {
      const cx = this.toCanvasX(x);
      this.ctx.moveTo(cx, 0);
      this.ctx.lineTo(cx, this.height);
    }
    for (let y = sy; y <= this.yMax; y += this.gridStep) {
      const cy = this.toCanvasY(y);
      this.ctx.moveTo(0, cy);
      this.ctx.lineTo(this.width, cy);
    }
    this.ctx.stroke();
  }

  drawAxes() {
    if (!this.showAxes) return;
    this.ctx.strokeStyle = this.colors.axes;
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();

    const originX = this.toCanvasX(0);
    const originY = this.toCanvasY(0);

    // X-axis
    this.ctx.moveTo(0, originY);
    this.ctx.lineTo(this.width, originY);
    // Y-axis
    this.ctx.moveTo(originX, 0);
    this.ctx.lineTo(originX, this.height);
    this.ctx.stroke();

    // Arrow heads
    this.ctx.fillStyle = this.colors.axes;
    // X arrow
    this.ctx.beginPath();
    this.ctx.moveTo(this.width - 8, originY - 4);
    this.ctx.lineTo(this.width, originY);
    this.ctx.lineTo(this.width - 8, originY + 4);
    this.ctx.fill();
    // Y arrow
    this.ctx.beginPath();
    this.ctx.moveTo(originX - 4, 8);
    this.ctx.lineTo(originX, 0);
    this.ctx.lineTo(originX + 4, 8);
    this.ctx.fill();
  }

  drawLabels() {
    if (!this.showLabels) return;
    this.ctx.fillStyle = this.colors.label;
    this.ctx.font = '11px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';

    const originY = this.toCanvasY(0);

    // X-axis labels
    const sx = Math.floor(this.xMin / this.gridStep) * this.gridStep;
    for (let x = sx; x <= this.xMax; x += this.gridStep) {
      if (Math.abs(x) < 1e-9) continue;
      const cx = this.toCanvasX(x);
      // format nice numbers
      const label = Number.isInteger(x) ? x.toString() : x.toFixed(1);
      this.ctx.fillText(label, cx, originY + 6);
    }

    this.ctx.textAlign = 'right';
    this.ctx.textBaseline = 'middle';

    const sy = Math.floor(this.yMin / this.gridStep) * this.gridStep;
    const originX = this.toCanvasX(0);
    for (let y = sy; y <= this.yMax; y += this.gridStep) {
      if (Math.abs(y) < 1e-9) continue;
      const cy = this.toCanvasY(y);
      const label = Number.isInteger(y) ? y.toString() : y.toFixed(1);
      this.ctx.fillText(label, originX - 6, cy);
    }
  }

  drawFunction(fn, color, lineWidth = 2.5) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    let firstPoint = true;
    const steps = 300;
    for (let i = 0; i <= steps; i++) {
      const x = this.xMin + (i / steps) * (this.xMax - this.xMin);
      const y = fn(x);
      if (isNaN(y) || !isFinite(y)) { firstPoint = true; continue; }
      const cx = this.toCanvasX(x);
      const cy = this.toCanvasY(y);
      if (cy < -5000 || cy > this.height + 5000) { firstPoint = true; continue; }
      if (firstPoint) { this.ctx.moveTo(cx, cy); firstPoint = false; }
      else { this.ctx.lineTo(cx, cy); }
    }
    this.ctx.stroke();
  }

  drawPoint(x, y, radius = 5, color) {
    this.ctx.fillStyle = color || this.colors.point;
    this.ctx.beginPath();
    this.ctx.arc(this.toCanvasX(x), this.toCanvasY(y), radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = this.colors.bg;
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
  }

  drawLine(x1, y1, x2, y2, color, width = 2, dash = []) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.setLineDash(dash);
    this.ctx.beginPath();
    this.ctx.moveTo(this.toCanvasX(x1), this.toCanvasY(y1));
    this.ctx.lineTo(this.toCanvasX(x2), this.toCanvasY(y2));
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  drawFilledArea(fn, x1, x2, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    const steps = 200;
    // Top curve
    for (let i = 0; i <= steps; i++) {
      const x = x1 + (i / steps) * (x2 - x1);
      const y = fn(x);
      const cx = this.toCanvasX(x);
      const cy = this.toCanvasY(isNaN(y) || !isFinite(y) ? 0 : y);
      if (i === 0) this.ctx.moveTo(cx, cy);
      else this.ctx.lineTo(cx, cy);
    }
    // Bottom edge (x-axis)
    this.ctx.lineTo(this.toCanvasX(x2), this.toCanvasY(0));
    this.ctx.lineTo(this.toCanvasX(x1), this.toCanvasY(0));
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawRect(x, y, w, h, color, opacity = 0.4) {
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = opacity;
    const cx = this.toCanvasX(x);
    const cy = this.toCanvasY(y + h);
    const cw = this.toCanvasX(x + w) - cx;
    const ch = this.toCanvasY(y) - cy;
    this.ctx.fillRect(cx, cy, cw, ch);
    this.ctx.globalAlpha = 1;
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(cx, cy, cw, ch);
  }

  drawText(text, x, y, color, align = 'center', baseline = 'middle') {
    this.ctx.fillStyle = color || this.colors.text;
    this.ctx.font = '12px sans-serif';
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseline;
    this.ctx.fillText(text, this.toCanvasX(x), this.toCanvasY(y));
  }

  // ===== Full Render =====
  render() {
    this.clear();
    this.drawGrid();
    this.drawAxes();
    this.drawLabels();

    // Draw functions
    this.funcs.forEach(f => {
      this.drawFunction(f.fn, f.color, f.width);
    });

    // Extra draw callback
    if (this.extraDraw) this.extraDraw(this);

    // Points
    this.points.forEach(p => {
      this.drawPoint(p.x, p.y, p.r, p.color);
    });
    this.points = [];

    // Annotations
    this.annotations.forEach(a => {
      this.drawText(a.text, a.x, a.y, a.color);
    });
  }

  // ===== Animation =====
  setFunctions(funcs) { this.funcs = funcs; }
  setExtraDraw(fn) { this.extraDraw = fn; }
  addPoint(x, y, r, color) { this.points.push({x, y, r: r||5, color}); }
  addAnnotation(text, x, y, color) { this.annotations.push({text, x, y, color}); }
  clearAnnotations() { this.annotations = []; }

  animate(callback, duration = 2000) {
    const startTime = performance.now();
    const animateStep = (ts) => {
      const elapsed = ts - startTime;
      const t = Math.min(elapsed / (duration / APP_CONFIG.animationSpeed), 1);
      const eased = easeInOutCubic(t);
      callback(this, eased, t);
      this.render();
      if (t < 1) {
        this.animId = requestAnimationFrame(animateStep);
      }
    };
    this.animId = requestAnimationFrame(animateStep);
  }

  stopAnimation() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  // ===== Utility =====
  static fnEval(expr) {
    // Safe function evaluation
    try {
      const fn = new Function('x', `return ${expr};`);
      return (x) => {
        const v = fn(x);
        return (typeof v === 'number' && isFinite(v)) ? v : NaN;
      };
    } catch(e) {
      return () => NaN;
    }
  }
}

// Easing
function easeInOutCubic(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2; }