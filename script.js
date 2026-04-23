/* ========================================================
   Glass UI Generator — Interactive Logic
   Handles live preview, code generation, presets, and UI
   ======================================================== */

(function () {
  'use strict';

  // === STATE ===
  const state = {
    blur: 12,
    opacity: 0.15,
    saturation: 180,
    bgColor: '#ffffff',
    radius: 16,
    borderOpacity: 0.20,
    borderColor: '#ffffff',
    shadowBlur: 30,
    shadowOpacity: 0.10,
    padding: 24,
    activeBg: 'gradient-1',
    activeTab: 'css',
  };

  // === BACKGROUND GRADIENTS MAP ===
  const bgMap = {
    'gradient-1': 'linear-gradient(135deg, #667eea, #764ba2)',
    'gradient-2': 'linear-gradient(135deg, #0d9488, #059669)',
    'gradient-3': 'linear-gradient(135deg, #f97316, #ef4444)',
    'gradient-4': 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    'gradient-5': 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    'gradient-6': 'linear-gradient(135deg, #1e293b, #0f172a)',
  };

  // === PRESETS ===
  const presets = [
    {
      name: 'Subtle Frost',
      desc: 'Light and airy glass with soft edges',
      bg: 'gradient-1',
      values: { blur: 16, opacity: 0.10, saturation: 180, bgColor: '#ffffff', radius: 20, borderOpacity: 0.15, borderColor: '#ffffff', shadowBlur: 20, shadowOpacity: 0.08, padding: 28 },
    },
    {
      name: 'Bold Glass',
      desc: 'High contrast frosted panel',
      bg: 'gradient-4',
      values: { blur: 20, opacity: 0.25, saturation: 200, bgColor: '#ffffff', radius: 16, borderOpacity: 0.30, borderColor: '#ffffff', shadowBlur: 40, shadowOpacity: 0.15, padding: 24 },
    },
    {
      name: 'Dark Crystal',
      desc: 'Moody dark glass effect',
      bg: 'gradient-6',
      values: { blur: 10, opacity: 0.08, saturation: 150, bgColor: '#ffffff', radius: 12, borderOpacity: 0.10, borderColor: '#ffffff', shadowBlur: 50, shadowOpacity: 0.20, padding: 24 },
    },
    {
      name: 'Neon Glow',
      desc: 'Vivid colors with strong glow',
      bg: 'gradient-5',
      values: { blur: 8, opacity: 0.20, saturation: 250, bgColor: '#e879f9', radius: 24, borderOpacity: 0.35, borderColor: '#f0abfc', shadowBlur: 60, shadowOpacity: 0.18, padding: 28 },
    },
    {
      name: 'Minimal',
      desc: 'Clean and minimal — almost invisible',
      bg: 'gradient-2',
      values: { blur: 24, opacity: 0.05, saturation: 160, bgColor: '#ffffff', radius: 8, borderOpacity: 0.08, borderColor: '#ffffff', shadowBlur: 10, shadowOpacity: 0.05, padding: 20 },
    },
    {
      name: 'Warm Sunset',
      desc: 'Warm toned glass with soft glow',
      bg: 'gradient-3',
      values: { blur: 14, opacity: 0.18, saturation: 200, bgColor: '#fef3c7', radius: 20, borderOpacity: 0.25, borderColor: '#fbbf24', shadowBlur: 35, shadowOpacity: 0.12, padding: 24 },
    },
  ];

  // === DOM REFERENCES ===
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const els = {
    previewCard: $('#preview-card'),
    previewBg: $('#preview-bg'),
    codeContent: $('#code-content'),
    toast: $('#toast'),
    toastMsg: $('#toast-message'),
    presetsGrid: $('#presets-grid'),
  };

  // === HELPERS ===
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  function showToast(msg) {
    els.toastMsg.textContent = msg;
    els.toast.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => els.toast.classList.remove('show'), 2200);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast('✅ Copied to clipboard!');
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('✅ Copied!');
    }
  }

  // === LIVE PREVIEW UPDATE ===
  function updatePreview() {
    const { blur, opacity, saturation, bgColor, radius, borderOpacity, borderColor, shadowBlur, shadowOpacity, padding } = state;
    const bg = hexToRgb(bgColor);
    const bc = hexToRgb(borderColor);

    els.previewCard.style.cssText = `
      padding: ${padding}px;
      background: rgba(${bg.r}, ${bg.g}, ${bg.b}, ${opacity});
      backdrop-filter: blur(${blur}px) saturate(${saturation}%);
      -webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
      border: 1px solid rgba(${bc.r}, ${bc.g}, ${bc.b}, ${borderOpacity});
      border-radius: ${radius}px;
      box-shadow: 0 8px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity});
      color: #fff;
      width: 100%;
      max-width: 360px;
    `;
  }

  // === CODE GENERATION ===
  function generateCSS() {
    const { blur, opacity, saturation, bgColor, radius, borderOpacity, borderColor, shadowBlur, shadowOpacity, padding } = state;
    const bg = hexToRgb(bgColor);
    const bc = hexToRgb(borderColor);

    return `.glass {
  /* Glass background */
  background: rgba(${bg.r}, ${bg.g}, ${bg.b}, ${opacity});

  /* Frosted blur effect */
  backdrop-filter: blur(${blur}px) saturate(${saturation}%);
  -webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);

  /* Border */
  border: 1px solid rgba(${bc.r}, ${bc.g}, ${bc.b}, ${borderOpacity});
  border-radius: ${radius}px;

  /* Shadow */
  box-shadow: 0 8px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity});

  /* Spacing */
  padding: ${padding}px;
}`;
  }

  function generateTailwind() {
    const { blur, opacity, radius, padding } = state;
    const blurMap = { 0: 'backdrop-blur-none', 4: 'backdrop-blur-sm', 8: 'backdrop-blur', 12: 'backdrop-blur-md', 16: 'backdrop-blur-lg', 20: 'backdrop-blur-xl', 24: 'backdrop-blur-2xl', 40: 'backdrop-blur-3xl' };
    const roundedMap = { 0: 'rounded-none', 4: 'rounded', 8: 'rounded-lg', 12: 'rounded-xl', 16: 'rounded-2xl', 20: 'rounded-3xl', 50: 'rounded-full' };

    // Find closest
    const closestBlur = Object.keys(blurMap).reduce((a, b) => Math.abs(b - blur) < Math.abs(a - blur) ? b : a);
    const closestRadius = Object.keys(roundedMap).reduce((a, b) => Math.abs(b - radius) < Math.abs(a - radius) ? b : a);
    const opacityPct = Math.round(opacity * 100);

    return `<!-- Tailwind CSS (approximate) -->
<div class="
  ${blurMap[closestBlur]}
  backdrop-saturate-150
  bg-white/${opacityPct}
  border border-white/20
  ${roundedMap[closestRadius]}
  shadow-xl
  p-${Math.round(padding / 4)}
">
  <!-- Your content here -->
</div>

<!-- Note: For exact values, use arbitrary values: -->
<div class="
  backdrop-blur-[${blur}px]
  backdrop-saturate-[${state.saturation}%]
  bg-white/${opacityPct}
  border border-white/[${Math.round(state.borderOpacity * 100)}%]
  rounded-[${radius}px]
  shadow-[0_8px_${state.shadowBlur}px_rgba(0,0,0,${state.shadowOpacity})]
  p-[${padding}px]
">
  <!-- Your content here -->
</div>`;
  }

  function generateHTML() {
    const css = generateCSS();
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Glass Card Example</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea, #764ba2);
      font-family: -apple-system, sans-serif;
    }

    ${css}
  </style>
</head>
<body>
  <div class="glass">
    <h2 style="color: #fff; margin: 0 0 8px;">Glass Card</h2>
    <p style="color: rgba(255,255,255,0.8); margin: 0;">
      Your beautiful glassmorphism component.
    </p>
  </div>
</body>
</html>`;
  }

  function updateCode() {
    let code;
    switch (state.activeTab) {
      case 'tailwind': code = generateTailwind(); break;
      case 'html': code = generateHTML(); break;
      default: code = generateCSS();
    }
    els.codeContent.textContent = code;
  }

  // === CONTROL BINDINGS ===
  function bindControls() {
    const controls = [
      { id: 'ctrl-blur', key: 'blur', valId: 'val-blur', fmt: v => `${v}px`, parse: v => parseInt(v) },
      { id: 'ctrl-opacity', key: 'opacity', valId: 'val-opacity', fmt: v => (v / 100).toFixed(2), parse: v => parseInt(v) / 100 },
      { id: 'ctrl-saturation', key: 'saturation', valId: 'val-saturation', fmt: v => `${v}%`, parse: v => parseInt(v) },
      { id: 'ctrl-radius', key: 'radius', valId: 'val-radius', fmt: v => `${v}px`, parse: v => parseInt(v) },
      { id: 'ctrl-border-opacity', key: 'borderOpacity', valId: 'val-border-opacity', fmt: v => (v / 100).toFixed(2), parse: v => parseInt(v) / 100 },
      { id: 'ctrl-shadow-blur', key: 'shadowBlur', valId: 'val-shadow-blur', fmt: v => `${v}px`, parse: v => parseInt(v) },
      { id: 'ctrl-shadow-opacity', key: 'shadowOpacity', valId: 'val-shadow-opacity', fmt: v => (v / 100).toFixed(2), parse: v => parseInt(v) / 100 },
      { id: 'ctrl-padding', key: 'padding', valId: 'val-padding', fmt: v => `${v}px`, parse: v => parseInt(v) },
    ];

    controls.forEach(({ id, key, valId, fmt, parse }) => {
      const el = $(`#${id}`);
      const valEl = $(`#${valId}`);
      if (!el || !valEl) return;

      el.addEventListener('input', () => {
        state[key] = parse(el.value);
        valEl.textContent = fmt(el.value);
        updatePreview();
        updateCode();
      });
    });

    // Color pickers
    const colorControls = [
      { id: 'ctrl-bg-color', key: 'bgColor', valId: 'val-bg-color' },
      { id: 'ctrl-border-color', key: 'borderColor', valId: 'val-border-color' },
    ];

    colorControls.forEach(({ id, key, valId }) => {
      const el = $(`#${id}`);
      const valEl = $(`#${valId}`);
      if (!el || !valEl) return;

      el.addEventListener('input', () => {
        state[key] = el.value;
        valEl.textContent = el.value;
        updatePreview();
        updateCode();
      });
    });
  }

  // === BACKGROUND SWATCHES ===
  function bindSwatches() {
    const swatches = $$('.swatch');
    swatches.forEach((sw) => {
      sw.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('active'));
        sw.classList.add('active');
        const bg = sw.dataset.bg;
        state.activeBg = bg;
        if (bgMap[bg]) {
          els.previewBg.style.background = bgMap[bg];
        }
      });
    });
  }

  // === CODE TABS ===
  function bindCodeTabs() {
    const tabs = $$('.code-tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeTab = tab.dataset.lang;
        updateCode();
      });
    });
  }

  // === NAV SECTIONS ===
  function bindNav() {
    const links = $$('.nav-link');
    const sections = $$('.section');

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.section;

        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        sections.forEach(s => {
          s.classList.remove('active-section');
          if (s.id === target) s.classList.add('active-section');
        });

        // Close mobile menu
        $('#header-nav').classList.remove('open');
      });
    });

    // Mobile menu toggle
    const menuBtn = $('#mobile-menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        $('#header-nav').classList.toggle('open');
      });
    }
  }

  // === COPY BUTTONS ===
  function bindCopyButtons() {
    $('#btn-copy-css').addEventListener('click', () => copyText(generateCSS()));
    $('#btn-copy-code').addEventListener('click', () => {
      const code = els.codeContent.textContent;
      copyText(code);
    });
  }

  // === RESET ===
  function bindReset() {
    $('#btn-reset').addEventListener('click', () => {
      const defaults = { blur: 12, opacity: 0.15, saturation: 180, bgColor: '#ffffff', radius: 16, borderOpacity: 0.20, borderColor: '#ffffff', shadowBlur: 30, shadowOpacity: 0.10, padding: 24 };
      Object.assign(state, defaults);

      // Update all sliders
      $('#ctrl-blur').value = 12;         $('#val-blur').textContent = '12px';
      $('#ctrl-opacity').value = 15;      $('#val-opacity').textContent = '0.15';
      $('#ctrl-saturation').value = 180;  $('#val-saturation').textContent = '180%';
      $('#ctrl-bg-color').value = '#ffffff'; $('#val-bg-color').textContent = '#ffffff';
      $('#ctrl-radius').value = 16;       $('#val-radius').textContent = '16px';
      $('#ctrl-border-opacity').value = 20; $('#val-border-opacity').textContent = '0.20';
      $('#ctrl-border-color').value = '#ffffff'; $('#val-border-color').textContent = '#ffffff';
      $('#ctrl-shadow-blur').value = 30;  $('#val-shadow-blur').textContent = '30px';
      $('#ctrl-shadow-opacity').value = 10; $('#val-shadow-opacity').textContent = '0.10';
      $('#ctrl-padding').value = 24;      $('#val-padding').textContent = '24px';

      // Reset background
      const swatches = $$('.swatch');
      swatches.forEach(s => s.classList.remove('active'));
      swatches[0].classList.add('active');
      els.previewBg.style.background = bgMap['gradient-1'];
      state.activeBg = 'gradient-1';

      updatePreview();
      updateCode();
      showToast('🔄 Reset to defaults!');
    });
  }

  // === RENDER PRESETS ===
  function renderPresets() {
    els.presetsGrid.innerHTML = presets.map((p, i) => {
      const v = p.values;
      const bg = hexToRgb(v.bgColor);
      const bc = hexToRgb(v.borderColor);
      const bgGrad = bgMap[p.bg] || bgMap['gradient-1'];

      return `
        <div class="preset-card" data-preset="${i}">
          <div class="preset-preview" style="background: ${bgGrad}">
            <div class="preset-glass" style="
              background: rgba(${bg.r},${bg.g},${bg.b},${v.opacity});
              backdrop-filter: blur(${v.blur}px) saturate(${v.saturation}%);
              -webkit-backdrop-filter: blur(${v.blur}px) saturate(${v.saturation}%);
              border: 1px solid rgba(${bc.r},${bc.g},${bc.b},${v.borderOpacity});
              border-radius: ${v.radius}px;
              box-shadow: 0 8px ${v.shadowBlur}px rgba(0,0,0,${v.shadowOpacity});
              padding: ${v.padding}px;
            ">${p.name}</div>
          </div>
          <div class="preset-info">
            <div class="preset-name">${p.name}</div>
            <div class="preset-desc">${p.desc}</div>
          </div>
        </div>
      `;
    }).join('');

    // Bind click
    $$('.preset-card').forEach((card) => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.preset);
        const p = presets[idx];
        applyPreset(p);
      });
    });
  }

  function applyPreset(p) {
    const v = p.values;
    Object.assign(state, v);
    state.activeBg = p.bg;

    // Update sliders
    $('#ctrl-blur').value = v.blur;              $('#val-blur').textContent = `${v.blur}px`;
    $('#ctrl-opacity').value = Math.round(v.opacity * 100); $('#val-opacity').textContent = v.opacity.toFixed(2);
    $('#ctrl-saturation').value = v.saturation;  $('#val-saturation').textContent = `${v.saturation}%`;
    $('#ctrl-bg-color').value = v.bgColor;       $('#val-bg-color').textContent = v.bgColor;
    $('#ctrl-radius').value = v.radius;          $('#val-radius').textContent = `${v.radius}px`;
    $('#ctrl-border-opacity').value = Math.round(v.borderOpacity * 100); $('#val-border-opacity').textContent = v.borderOpacity.toFixed(2);
    $('#ctrl-border-color').value = v.borderColor; $('#val-border-color').textContent = v.borderColor;
    $('#ctrl-shadow-blur').value = v.shadowBlur; $('#val-shadow-blur').textContent = `${v.shadowBlur}px`;
    $('#ctrl-shadow-opacity').value = Math.round(v.shadowOpacity * 100); $('#val-shadow-opacity').textContent = v.shadowOpacity.toFixed(2);
    $('#ctrl-padding').value = v.padding;        $('#val-padding').textContent = `${v.padding}px`;

    // Update background
    const swatches = $$('.swatch');
    swatches.forEach(s => s.classList.remove('active'));
    const activeSwatch = document.querySelector(`.swatch[data-bg="${p.bg}"]`);
    if (activeSwatch) activeSwatch.classList.add('active');
    els.previewBg.style.background = bgMap[p.bg] || bgMap['gradient-1'];

    // Switch to generator tab
    $$('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector('.nav-link[data-section="generator"]').classList.add('active');
    $$('.section').forEach(s => s.classList.remove('active-section'));
    $('#generator').classList.add('active-section');

    updatePreview();
    updateCode();
    showToast(`🎨 Loaded "${p.name}" preset!`);
  }

  // === INIT ===
  function init() {
    bindControls();
    bindSwatches();
    bindCodeTabs();
    bindNav();
    bindCopyButtons();
    bindReset();
    renderPresets();
    updatePreview();
    updateCode();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
