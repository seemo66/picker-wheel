/*
  Picker Wheel JS
  Customization:
  - Override CSS variables via window.PickerWheelTheme, e.g. { '--color-primary': '#6c5ce7' }.
  - Override the slice palette via window.PickerWheelConfig = { palette: ['#..', ...] }.
  - Override the result modal header image via window.PickerWheelConfig = { headerImage: 'url-or-data-uri' }.
  Place overrides before this script runs (above this block).
*/

/**
 * PickerWheel - A vanilla JavaScript picker wheel component
 * No dependencies required - pure vanilla JS
 */

class PickerWheel {
  constructor() {
    // Initialize state
    this.colorIndex = 0;
    this.options = [];
    // Pastel brand palette (cycles as options are added)
    this.palette = [
      '#3fb8af',
      '#c9f1ef',
      '#3fb8d4',
      '#ee7e8d',
      '#b83f69',
      '#f7c9b9',
      '#f5a623',
      '#f9d66b',
      '#2a7fb8'
    ];
    // Default header image for result modal
    this.headerImage = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 799 166' fill-rule='nonzero' stroke-linejoin='round' stroke-miterlimit='2' xmlns:v='https://vecta.io/nano'%3E%3Cpath d='M263.5 127.9l-3.3 3.1c-2.4-2.4-5-4.1-7.9-5.4-2.8-1.2-5.6-1.8-8.3-1.8-3.4 0-6.6.8-9.6 2.5s-5.4 3.9-7.1 6.7a16.99 16.99 0 0 0-2.5 9c0 3.2.9 6.3 2.6 9.2s4.1 5.2 7.2 6.9 6.4 2.5 10 2.5c4.4 0 8.1-1.2 11.2-3.7s4.9-5.7 5.4-9.7h-13.7v-4.1H266c0 6.6-2 11.9-5.9 15.8s-9.1 5.8-15.6 5.8c-7.9 0-14.2-2.7-18.8-8.1-3.6-4.2-5.3-9-5.3-14.4 0-4.1 1-7.8 3.1-11.3 2-3.5 4.8-6.2 8.4-8.2s7.6-3 12.1-3c3.6 0 7.1.7 10.3 2 3.1 1.2 6.2 3.3 9.2 6.2zm16.1-7.2h4.3v42.9h-4.3zm20.1 0h21.5v4.2H304v13.4h17.2v4.2H304v21.1h-4.3v-42.9zm30.7 4.2v-4.2h23.5v4.2h-9.6v38.7h-4.4v-38.7h-9.5zm31.2 30.7l3.6-2.2c2.6 4.7 5.5 7.1 8.9 7.1 1.4 0 2.8-.3 4.1-1a7.58 7.58 0 0 0 2.9-2.7c.7-1.1 1-2.3 1-3.6 0-1.4-.5-2.8-1.5-4.2-1.3-1.9-3.8-4.2-7.3-6.9-3.6-2.7-5.8-4.7-6.7-5.9-1.5-2-2.3-4.2-2.3-6.6 0-1.9.4-3.6 1.3-5.1s2.2-2.7 3.8-3.6 3.4-1.3 5.3-1.3c2 0 3.9.5 5.7 1.5s3.6 2.8 5.6 5.5l-3.5 2.7c-1.6-2.1-3-3.5-4.1-4.2s-2.4-1-3.7-1c-1.7 0-3.1.5-4.2 1.6-1.1 1-1.6 2.3-1.6 3.9 0 .9.2 1.8.6 2.7s1.1 1.8 2.1 2.9c.6.5 2.4 2 5.5 4.3 3.7 2.7 6.3 5.2 7.6 7.3 1.4 2.1 2.1 4.3 2.1 6.4 0 3.1-1.2 5.8-3.5 8.1s-5.2 3.4-8.6 3.4c-2.6 0-5-.7-7.1-2.1s-4.2-3.8-6-7zm60.7 8l6.1-42.9h.7l17.4 35.2 17.3-35.2h.7l6.2 42.9h-4.2l-4.2-30.7-15.2 30.7H446l-15.3-30.9-4.2 30.9h-4.2zm80.3-42.9l20 42.9H518l-6.7-14.1h-18.5l-6.7 14.1h-4.8l20.3-42.9h1zm-.5 9.1l-7.4 15.5h14.7l-7.3-15.5zm33.2 33.8v-42.9h8.9c6.4 0 11.1.5 14 1.5 4.2 1.5 7.4 4 9.8 7.6 2.3 3.6 3.5 7.9 3.5 12.9 0 4.3-.9 8.1-2.8 11.3-1.9 3.3-4.3 5.7-7.2 7.2-3 1.6-7.1 2.3-12.5 2.3h-13.7v.1zm4.1-4.1h5c5.9 0 10-.4 12.3-1.1 3.2-1 5.8-2.9 7.6-5.7s2.8-6.1 2.8-10c0-4.1-1-7.7-3-10.6s-4.8-4.9-8.4-6c-2.7-.8-7.1-1.2-13.3-1.2h-3v34.6zm46.3-38.8h24.6v4.2H590v13.4h20.1v4.2H590v16.9h20.1v4.2h-24.4v-42.9zm60.5 0h24.6v4.2h-20.3v13.4h20.1v4.2h-20.1v16.9h20.1v4.2h-24.4v-42.9zm55.5 0l20 42.9h-4.6l-6.7-14.1h-18.5l-6.7 14.1h-4.8l20.3-42.9h1zm-.6 9.1l-7.4 15.5h14.7l-7.3-15.5zm28.8 25.8l3.6-2.2c2.6 4.7 5.5 7.1 8.9 7.1 1.4 0 2.8-.3 4.1-1a7.58 7.58 0 0 0 2.9-2.7c.7-1.1 1-2.3 1-3.6 0-1.4-.5-2.8-1.5-4.2-1.3-1.9-3.8-4.2-7.3-6.9-3.6-2.7-5.8-4.7-6.7-5.9-1.5-2-2.3-4.2-2.3-6.6 0-1.9.4-3.6 1.3-5.1s2.2-2.7 3.8-3.6 3.4-1.3 5.3-1.3c2 0 3.9.5 5.7 1.5s3.6 2.8 5.6 5.5l-3.5 2.7c-1.6-2.1-3-3.5-4.1-4.2s-2.4-1-3.7-1c-1.7 0-3.1.5-4.2 1.6-1.1 1-1.6 2.3-1.6 3.9 0 .9.2 1.8.6 2.7s1.1 1.8 2.1 2.9c.6.5 2.4 2 5.5 4.3 3.7 2.7 6.3 5.2 7.6 7.3 1.4 2.1 2.1 4.3 2.1 6.4 0 3.1-1.2 5.8-3.5 8.1-2.4 2.3-5.2 3.4-8.6 3.4-2.6 0-5-.7-7.1-2.1-2.3-1.4-4.2-3.8-6-7zm36.8-34.9h4.9l11 17.7 10.8-17.7h5l-13.6 22.4v20.5h-4.2v-20.5l-13.9-22.4z'/%3E%3Cg fill='%233fb8af'%3E%3Cpath d='M133.9 61.1C121.7 71.2 105 77 90.1 83.1v6.4c0 30.2-8.4 43.6-21.6 43.6-10.5 0-17-7.4-17-17.7 0-18.9 15.1-28 33.3-35.8V59.4c0-20.1 2.9-32.3 7.4-38.1-20.2-2.9-37.4-16-56.7-16-21.9 0-30.1 11.4-30.1 27.6 0 11.1 6.4 19.2 16 19.2 6.3 0 11.6-5.5 11.6-10.4 0-1.7.6-2.8 2.8-2.8 1.8 0 2.6 1.7 2.6 2.8 0 7.4-6.5 15.6-17 15.6C8.7 57.3 0 47.1 0 32.9 0 13.7 10.6 0 35.4 0c23.2 0 40.7 16.5 64.4 16.5 1.9 0 3.6.6 3.6 2.7 0 1.9-1.5 2.7-2.9 2.7-6 0-10.4 10.1-10.4 37.2v18.3C105.8 71 122.9 65 133.9 54c.4-20.1 2.4-37 10.9-37 5.4 0 6 5 6 7.9 0 13.4-4.6 23.3-11.5 31v5c0 48.5 3.8 98.7 42.7 98.7v.1c16.4 0 25-9.3 25-22.5 0-10.4-6.4-17.9-16-17.9-6.5 0-11.6 5.5-11.6 10.4 0 1.7-.6 2.8-2.8 2.8-1.8 0-2.6-1.7-2.6-2.8 0-7.4 6.5-15.6 17-15.6 12.7 0 21.4 9.7 21.4 23.2 0 16.1-10.4 27.8-30.3 27.8-44.3-.1-48.2-53.4-48.2-104zM84.8 89.4v-4.1c-15.7 6.9-27.9 15-27.9 30.2 0 7.2 4.5 12.4 11.6 12.4 10.3 0 16.3-12.1 16.3-38.5zM139.6 47c3.8-5.9 6.1-13.1 6.1-22 0-.9-.4-2.6-1.2-2.6-2.5 0-4.2 10.8-4.9 24.6zm56 38.1c.6.1 1.4.1 2 .1 8.3 0 12.8-1.9 18-9.7.9-1.3 1.8-2.7 3.1-2.7s2.6.8 2.6 1.9c0 .9-.9 2.9-1.9 4.5-5.4 7.9-12 11.1-21.8 11.1-.8 0-1.5 0-2.3-.1-1.4 9.9-8.2 18.6-18.8 18.6-10.5 0-17.9-6.5-17.9-21 0-11.4 8.3-23.4 19.6-23.4s17.1 8.4 17.4 20.7zm-5.2 4c-7-2.4-13.6-8.2-13.6-15.9 0-1.4.1-2.7.6-3.7-7.6.6-13.7 9.9-13.7 18.3 0 10.9 5.4 15.9 12.8 15.9 8.5 0 13-6.9 13.9-14.6zm-6.7-18.3c-1 .3-1.8 1-1.8 2.4 0 4.9 3.8 8.6 8.4 10.5-.4-6-2.6-10.7-6.6-12.9z'/%3E%3Cpath d='M217.4 80.3c-1.3 0-2.6-.9-2.6-2.4 0-.9.9-2.3.9-2.3 6.7-10.9 7.7-14.5 13.2-14.5 6.7 0 9 5.6 11.3 29.8 3.7-11.8 9.7-26.5 17.5-26.5 8.3 0 13.9 16.6 17 28.7 4.7-13.8 15.4-28.7 27-28.7 9.7 0 10.8 9.9 11.6 20.6.8 9.5 1.7 18.7 13.1 18.7 16.9 0 30.5-16.5 37.8-28.2 0 0 .8-1.4 2.3-1.4 1.4 0 2.4.9 2.4 2 0 1.3-1 3.1-1 3.1-8.1 12.4-22.8 29.6-41.5 29.6-15.2 0-17.3-12.2-18.2-23-.8-8.6-.9-16.3-6.7-16.3-11.9 0-23.2 22.8-24.2 36.7-.1 1.3-1.3 2.4-2.6 2.4a2.65 2.65 0 0 1-2.6-2.6c0-1.8-6.1-36.6-14.6-36.6-8.7 0-16.1 37.1-16.1 37.1-.4 1.2-1.3 2-2.6 2-1.4 0-2.6-1.2-2.6-2.4 0-35.1-5.1-40.1-7.6-40.1-3.2 0-5 6.5-9.5 13.1.1.5-.6 1.2-1.7 1.2z'/%3E%3Cpath d='M390.9 73.4c0 11.3-20.1 15.5-24.4 16.3.5 9.7 5.6 14.1 12.7 14.1 17 0 30.5-16.5 37.8-28.2 0 0 .8-1.4 2.3-1.4 1.4 0 2.4.9 2.4 2 0 1.3-1 3.1-1 3.1-8.1 12.4-22.8 29.6-41.5 29.6-10.5 0-17.9-6.5-17.9-21 0-11.4 8.3-23.4 19.6-23.4 6.3-.1 10 3.5 10 8.9zm-24.3 11.3c6.1-1.2 19.2-4.4 19.2-11.4 0-2.3-1.9-3.8-5-3.8-7 0-12.9 7.4-14.2 15.2z'/%3E%3Cpath d='M418.5 80.3c-1.3 0-2.6-.9-2.6-2.4 0-.9.9-2.3.9-2.3 6.7-10.9 7.7-14.5 13.2-14.5 6.7 0 9 5.6 11.3 29.8 3.7-11.8 9.7-26.5 17.5-26.5 8.3 0 13.9 16.6 17 28.7 4.7-13.8 15.4-28.7 27-28.7 9.7 0 10.8 9.9 11.6 20.6.8 9.5 1.7 18.7 13.1 18.7 16.9 0 30.5-16.5 37.8-28.2 0 0 .8-1.4 2.3-1.4 1.4 0 2.4.9 2.4 2 0 1.3-1 3.1-1 3.1-8.1 12.4-22.8 29.6-41.5 29.6-15.2 0-17.3-12.2-18.2-23-.8-8.6-.9-16.3-6.7-16.3-11.9 0-23.2 22.8-24.2 36.7-.1 1.3-1.3 2.4-2.6 2.4a2.65 2.65 0 0 1-2.6-2.6c0-1.8-6.1-36.6-14.6-36.6-8.7 0-16.1 37.1-16.1 37.1-.4 1.2-1.3 2-2.6 2-1.4 0-2.6-1.2-2.6-2.4 0-35.1-5.1-40.1-7.5-40.1-3.2 0-5 6.5-9.5 13.1-.1.5-.7 1.2-1.8 1.2z'/%3E%3Cpath d='M598.9 81.5c1.5 11.5 5.9 22.1 16.6 22.1 17 0 30.5-16.5 37.8-28.2 0 0 1-1.4 2.3-1.4 1.4 0 2.4.9 2.4 2 0 1.3-1 3.1-1 3.1-8.1 12.4-22.8 29.6-41.5 29.6-9.3 0-14.8-5.4-18.2-12.9-2.7 7.3-8.7 12.9-17.3 12.9-10.5 0-17.9-6.1-17.9-19.7 0-12 6.8-24.6 19.6-24.6 10.2.1 15.8 6.9 17.2 17.1zm-17.1-11.9c-9.3 0-14.5 10-14.5 19.5 0 10 5.4 14.6 12.8 14.6 9.5 0 13.9-8.7 13.9-17.4 0-9.9-3.9-16.7-12.2-16.7z'/%3E%3Cpath d='M743.6 74.1c1.4 0 2.4.9 2.4 2 0 1.3-1 3.1-1 3.1-8.1 12.4-22.8 29.6-41.5 29.6-8.6 0-13.4-5.8-16.4-13.7-5.2 8.4-11.6 13.7-19.1 13.7-10.5 0-17.9-6.1-17.9-19.7 0-12 6.8-24.7 19.6-24.7 5.8 0 10.2 1.7 13.6 4.6v-3.5c0-27.4 5.8-58 14.8-58 4.7 0 6.8 4.4 6.8 12.4 0 21.8-5.1 50.3-14.3 69 1.9 8.3 5.8 14.7 12.9 14.7 17 0 30.5-16.5 37.8-28.2 0 .1 1.1-1.3 2.3-1.3zm-75.5 29.6c6.4 0 12.2-6.4 17-16.1-.4-2-.8-4.1-1-6.3-1.4-7.2-6-11.8-14.3-11.8-9.3 0-14.5 10.1-14.5 19.6 0 10 5.3 14.6 12.8 14.6zm20.4-38.2c0 4 0 8.6.5 13.2 6.8-18 10.9-42 10.9-58.7 0-4.5-.3-7.3-1.5-7.3-4.7 0-9.9 29.8-9.9 52.8z'/%3E%3Cpath d='M768.1 73.4c0 11.3-20.1 15.5-24.4 16.3.5 9.7 5.6 14.1 12.7 14.1 17 0 30.5-16.5 37.8-28.2 0 0 .8-1.4 2.3-1.4 1.4 0 2.4.9 2.4 2 0 1.3-1 3.1-1 3.1-8.1 12.4-22.8 29.6-41.5 29.6-10.5 0-17.9-6.5-17.9-21 0-11.4 8.3-23.4 19.6-23.4 6.3-.1 10 3.5 10 8.9zm-24.3 11.3c6.1-1.2 19.2-4.4 19.2-11.4 0-2.3-1.9-3.8-5-3.8-7.1 0-12.9 7.4-14.2 15.2z'/%3E%3C/g%3E%3C/svg%3E";
    // Optional runtime theme overrides for CSS variables
    const theme = window.PickerWheelTheme;
    if (theme && typeof theme === 'object') {
      // Apply theme variables to the widget container to avoid global collisions
      const containerEl = document.querySelector('.demo-container') || document.documentElement;
      for (const [key, value] of Object.entries(theme)) {
        const varName = key.startsWith('--') ? key : `--${key}`;
        try { containerEl.style.setProperty(varName, value); } catch (e) {}
      }
    }
    // Optional runtime palette override
    const cfg = window.PickerWheelConfig;
    if (cfg && Array.isArray(cfg.palette) && cfg.palette.length) {
      this.palette = cfg.palette.map(c => this.normalizeColor(c) || c);
    }
    // Optional runtime header image override
    if (cfg && cfg.headerImage) {
      this.headerImage = cfg.headerImage;
    }
    // Default to current page URL; allow override via config
    this.shareUrl = window.location.origin + (window.location.pathname || '');
    if (cfg && cfg.shareUrl) {
      this.shareUrl = cfg.shareUrl;
    }
    // Initialize defaults using next available unique colors
    ['Yes','Yes','Yes','No','No','No'].forEach(text => {
      this.options.push({ text, color: this.getNextColor(), weight: 1 });
    });

    // Basic safety limits to prevent abuse/overflow
    this.MAX_OPTIONS = 100;
    this.MAX_OPTION_LENGTH = 60;
    this.feedbackTimeout = null;
    this.loadedFromStorage = false;
    this.initElements();
    this.attachEventListeners();
    // Load saved options and enforce unique colors before first render
    this.loadOptions();
    this.loadCounts();
    this.ensureUniqueColors();
    this.renderOptions();
  }

  getNextColor() {
    // Prefer an unused color from the fixed palette
    const currentOptions = Array.isArray(this.options) ? this.options : [];
    const used = new Set(
      currentOptions
        .map(o => this.normalizeColor(o.color))
        .filter(Boolean)
    );
    for (let i = 0; i < this.palette.length; i++) {
      const idx = (this.colorIndex + i) % this.palette.length;
      const candidate = this.palette[idx];
      if (!used.has(candidate)) {
        this.colorIndex = this.colorIndex + i + 1;
        return candidate;
      }
    }
    // If all palette colors are in use, generate a unique pastel via golden angle
    let attempts = 0;
    while (attempts < 360) {
      const hue = (this.colorIndex * 137.5) % 360;
      const candidate = this.hslToHex(hue, 60, 75);
      this.colorIndex++;
      attempts++;
      if (!used.has(candidate)) {
        return candidate;
      }
    }
    // Fallback (should never hit): return first palette color
    return this.palette[0];
  }

  initAudio() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  playClick() {
    if (!this.audioContext) {
      this.initAudio();
    }
    
    // Create a short burst of noise for a click sound
    const bufferSize = this.audioContext.sampleRate * 0.015; // 15ms
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Fill with noise that decays quickly
    for (let i = 0; i < bufferSize; i++) {
      const decay = 1 - (i / bufferSize);
      data[i] = (Math.random() * 2 - 1) * decay * decay;
    }
    
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0.3;
    
    // Add a filter to shape the click
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    source.start();
  }

  playFanfare() {
    try {
      const audio = new Audio('https://orangefreesounds.com/wp-content/uploads/2025/11/Winning-fanfare-sound-effect.mp3');
      audio.volume = 0.7;
      audio.play().catch(err => console.log('Audio play failed:', err));
    } catch (e) {
      console.log('Fanfare audio unavailable');
    }
  }


  createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#1dd1a1'];
    
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 1 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 4) + 's';
      
      // Random shape
      if (Math.random() > 0.5) {
        confetti.style.borderRadius = '50%';
      }
      
      confettiContainer.appendChild(confetti);
    }
    
    this.resultModal.appendChild(confettiContainer);
    
    // Remove confetti after animation
    setTimeout(() => {
      confettiContainer.remove();
    }, 7000);
  }

  initElements() {
    this.inputElement = document.getElementById('optionInput');
    this.addBtn = document.getElementById('addBtn');
    this.clearAllBtn = document.getElementById('clearAllBtn');
    this.feedbackMessage = document.getElementById('feedbackMessage');
    this.optionsList = document.getElementById('optionsList');
    this.wheelCanvas = document.getElementById('wheelCanvas');
    this.resultModal = document.getElementById('resultModal');
    this.resultHeaderImage = document.querySelector('.result-header-image');
    this.resultText = document.getElementById('resultText');
    this.closeModalBtn = document.getElementById('closeModalBtn');
    this.removeOptionBtn = document.getElementById('removeOptionBtn');
    this.downloadPngBtn = document.getElementById('downloadPngBtn');
    this.shareFacebookBtn = document.getElementById('shareFacebookBtn');
    this.shareXBtn = document.getElementById('shareXBtn');
    this.shareInstagramBtn = document.getElementById('shareInstagramBtn');
    this.shareWhatsappBtn = document.getElementById('shareWhatsappBtn');
    this.shareNativeBtn = document.getElementById('shareNativeBtn');
    this.isSpinning = false;
    this.selectedIndex = null;
    this.wheelIdleWrapper = null;
    this.isHovering = false;
    this.isPointerDown = false;
    this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
    this.spinCounts = {};
  }

  attachEventListeners() {
    this.clearAllBtn.addEventListener('click', () => this.handleClearAll());
    this.addBtn.addEventListener('click', () => this.handleAddOption());
    this.closeModalBtn.addEventListener('click', () => this.closeResultModal());
    this.removeOptionBtn.addEventListener('click', () => this.handleRemoveOption());
    this.downloadPngBtn.addEventListener('click', () => this.downloadModalAsPng());
    if (this.shareFacebookBtn) {
      this.shareFacebookBtn.addEventListener('click', () => this.handleShare('facebook'));
    }
    if (this.shareXBtn) {
      this.shareXBtn.addEventListener('click', () => this.handleShare('x'));
    }
    if (this.shareInstagramBtn) {
      this.shareInstagramBtn.addEventListener('click', () => this.handleShare('instagram'));
    }
    if (this.shareWhatsappBtn) {
      this.shareWhatsappBtn.addEventListener('click', () => this.handleShare('whatsapp'));
    }
    if (this.shareNativeBtn) {
      this.shareNativeBtn.addEventListener('click', () => this.handleShare('native'));
    }
    this.inputElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleAddOption();
      }
    });

    // Clear history control
    if (this.clearHistoryBtn) {
      this.clearHistoryBtn.addEventListener('click', () => this.handleClearHistory());
    }

    // Keep idle rotation running even on hover/tap
    this.isHovering = false;
    this.isPointerDown = false;

    // Close any open weight menus when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.weight-control')) {
        this.closeAllWeightMenus();
      }
    });
  }

  handleAddOption() {
    const value = this.inputElement.value.trim();

    // Validation: Empty input
    if (!value) {
      this.showFeedback('Please enter an option', 'error');
      return;
    }

    // Validation: Length cap
    if (value.length > this.MAX_OPTION_LENGTH) {
      this.showFeedback(`Option cannot exceed ${this.MAX_OPTION_LENGTH} characters`, 'error');
      return;
    }

    // Validation: Duplicate
    if (this.options.some(opt => opt.text === value)) {
      this.showFeedback('This option already exists', 'error');
      return;
    }

    // Validation: Max options
    if (this.options.length >= this.MAX_OPTIONS) {
      this.showFeedback('Maximum number of options reached', 'error');
      return;
    }

    // Add option with assigned color and default weight
    this.options.push({ text: value, color: this.getNextColor(), weight: 1 });
    this.saveOptions();
    this.inputElement.value = '';
    this.inputElement.focus();
    this.renderOptions();
  }

  renderOptions() {
    this.optionsList.innerHTML = '';
    this.options.forEach((option, index) => {
      const li = document.createElement('li');
      li.className = 'option-item';
      
      const textSpan = document.createElement('span');
      textSpan.className = 'option-text';
      textSpan.textContent = option.text;
      textSpan.dataset.index = index;
      // Count badge next to option
      const countBadge = document.createElement('span');
      countBadge.className = 'option-count';
      const count = this.spinCounts[option.text] || 0;
      countBadge.textContent = `× ${count}`;

      // Weight control (custom dropdown anchored to button)
      const currentWeight = Math.min(5, Math.max(1, parseInt(option.weight || 1, 10)) || 1);
      const weightControl = document.createElement('div');
      weightControl.className = 'weight-control';
      const weightButton = document.createElement('button');
      weightButton.className = 'weight-button';
      weightButton.type = 'button';
      weightButton.textContent = `${currentWeight}×`;
      weightButton.title = 'Set weight';
      weightButton.setAttribute('aria-label', `Weight ${currentWeight}×`);
      const weightMenu = document.createElement('ul');
      weightMenu.className = 'weight-menu';
      for (let w = 1; w <= 5; w++) {
        const liOpt = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'weight-option' + (w === currentWeight ? ' active' : '');
        btn.textContent = `${w}×`;
        btn.addEventListener('click', () => {
          this.options[index].weight = w;
          this.saveOptions();
          weightButton.textContent = `${w}×`;
          this.closeAllWeightMenus();
          this.renderWheel();
        });
        liOpt.appendChild(btn);
        weightMenu.appendChild(liOpt);
      }
      weightButton.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close others first
        this.closeAllWeightMenus();
        weightMenu.classList.toggle('open');
      });
      weightControl.appendChild(weightButton);
      weightControl.appendChild(weightMenu);
      
      // Color control (swatch + hidden color input)
      const colorControl = document.createElement('div');
      colorControl.className = 'color-control';
      const colorButton = document.createElement('button');
      colorButton.type = 'button';
      colorButton.className = 'color-swatch';
      colorButton.title = 'Choose color';
      colorButton.setAttribute('aria-label', 'Choose color');
      const normalizedColor = this.normalizeColor(option.color) || '#3fb8af';
      colorButton.style.backgroundColor = normalizedColor;
      const colorInput = document.createElement('input');
      colorInput.type = 'color';
      colorInput.className = 'color-input';
      colorInput.value = normalizedColor;
      colorInput.setAttribute('title', 'Choose color');
      colorButton.addEventListener('click', () => {
        colorInput.click();
      });
      colorInput.addEventListener('input', () => {
        const val = this.normalizeColor(colorInput.value) || colorInput.value;
        this.options[index].color = val;
        colorButton.style.backgroundColor = val;
        this.saveOptions();
        this.renderWheel();
      });
      colorControl.appendChild(colorButton);
      colorControl.appendChild(colorInput);

      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'option-buttons';
      
      const editBtn = document.createElement('button');
      editBtn.className = 'edit-btn';
      editBtn.appendChild(this.createEditIconSvg());
      editBtn.title = 'Edit';
      editBtn.addEventListener('click', () => this.startEditOption(index, li, textSpan));
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.appendChild(this.createTrashIconSvg());
      deleteBtn.title = 'Delete';
      deleteBtn.addEventListener('click', () => this.handleDeleteOption(index));
      
      buttonsContainer.appendChild(editBtn);
      buttonsContainer.appendChild(deleteBtn);
      
      // Order (columns): weight → color → option → wins → actions
      li.appendChild(weightControl);
      li.appendChild(colorControl);
      li.appendChild(textSpan);
      li.appendChild(countBadge);
      li.appendChild(buttonsContainer);
      this.optionsList.appendChild(li);
    });
    
    // Update wheel when options change
    this.renderWheel();
    // Ensure counts are refreshed
    this.updateCountsUI();
  }

  closeAllWeightMenus() {
    const openMenus = document.querySelectorAll('.weight-menu.open');
    openMenus.forEach(m => m.classList.remove('open'));
  }

  renderWheel() {
    this.wheelCanvas.innerHTML = '';
    
    if (this.options.length < 2) {
      const placeholder = document.createElement('div');
      placeholder.className = 'wheel-placeholder';
      placeholder.textContent = 'Add at least 2 options to spin the wheel';
      this.wheelCanvas.appendChild(placeholder);
      return;
    }
    // Create idle wrapper (CSS animated) and inner rotation wrapper (JS controlled)
    const wheelIdleWrapper = document.createElement('div');
    wheelIdleWrapper.className = 'wheel-idle';
    const wheelWrapper = document.createElement('div');
    wheelWrapper.className = 'wheel-wrapper';
    
    // Build weighted segments
    const weights = this.options.map(o => Math.min(5, Math.max(1, parseInt(o.weight || 1, 10) || 1)));
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let acc = 0;
    this.segments = this.options.map((opt, idx) => {
      const angleSize = totalWeight > 0 ? (360 * weights[idx] / totalWeight) : (360 / this.options.length);
      const startAngle = acc;
      const endAngle = acc + angleSize;
      const midAngle = startAngle + angleSize / 2;
      acc = endAngle;
      return { startAngle, endAngle, midAngle, index: idx };
    });
    
    // Set initial rotation if not already set, center first segment under arrow
    if (this.currentRotation === undefined) {
      const firstMid = this.segments[0]?.midAngle || 0;
      this.currentRotation = -firstMid;
    }
    wheelWrapper.style.transform = 'rotate(' + this.currentRotation + 'deg)';
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('class', 'wheel-svg');
    
    this.segments.forEach(({ startAngle, endAngle, midAngle, index }) => {
      const option = this.options[index];
      const slice = this.createSlice(100, 100, 80, startAngle, endAngle, option.color);
      svg.appendChild(slice);
      // Add text label
      const text = this.createSliceText(option.text, 100, 100, midAngle);
      svg.appendChild(text);
    });
    
    // Add border circle to wheel
    const borderCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    borderCircle.setAttribute('cx', '100');
    borderCircle.setAttribute('cy', '100');
    borderCircle.setAttribute('r', '80');
    borderCircle.setAttribute('fill', 'none');
    borderCircle.setAttribute('stroke', '#999');
    borderCircle.setAttribute('stroke-width', '1');
    svg.appendChild(borderCircle);
    
    wheelWrapper.appendChild(svg);
    
    // Add spin button in center
    const spinBtn = document.createElement('button');
    spinBtn.className = 'spin-btn';
    spinBtn.textContent = 'SPIN';
    spinBtn.addEventListener('click', () => this.handleSpin());
    wheelWrapper.appendChild(spinBtn);
    
    wheelIdleWrapper.appendChild(wheelWrapper);
    this.wheelCanvas.appendChild(wheelIdleWrapper);
    
    // Add arrow indicator outside wheel (doesn't rotate)
    const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrowSvg.setAttribute('viewBox', '0 0 60 60');
    arrowSvg.setAttribute('class', 'wheel-arrow-svg');
    
    // Original simple triangular arrow pointing left
    const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    // Inset the left tip slightly from the edge for visibility
    arrowPath.setAttribute('points', '5,30 35,10 35,50');
    arrowPath.setAttribute('fill', '#333');
    arrowPath.setAttribute('stroke', '#333');
    arrowPath.setAttribute('stroke-width', '2');
    arrowPath.setAttribute('stroke-linejoin', 'round');
    arrowPath.setAttribute('stroke-linecap', 'round');
    
    arrowSvg.appendChild(arrowPath);
    this.wheelCanvas.appendChild(arrowSvg);

    // Store reference for idle animation control and update state
    this.wheelIdleWrapper = wheelIdleWrapper;
    this.updateIdleAnimation();
  }

  handleSpin() {
    if (this.isSpinning) return;

    this.isSpinning = true;

    const wheelWrapper = this.wheelCanvas.querySelector('.wheel-wrapper');

    // Pause idle animation during spin
    this.pauseIdle();

    // Transfer current idle rotation (parent) into child rotation so selection math
    // uses a single reference frame. This prevents mismatches when idle is paused
    // at an arbitrary angle.
    const idleAngle = this.getElementRotation(this.wheelIdleWrapper);
    if (!isNaN(idleAngle)) {
      this.currentRotation = ((this.currentRotation || 0) + idleAngle) % 360;
      wheelWrapper.style.transform = `rotate(${this.currentRotation}deg)`;
      // Reset parent transform and animation state to avoid compounded rotations
      if (this.wheelIdleWrapper) {
        this.wheelIdleWrapper.classList.remove('idle-active');
        this.wheelIdleWrapper.classList.add('idle-paused');
        this.wheelIdleWrapper.style.transform = 'rotate(0deg)';
      }
    }

    const duration = 14000; // 14s total spin (a bit longer)
    const start = performance.now();

    // 16–22 full spins + random landing (faster overall)
    const spins = 16 + Math.random() * 6;
    const totalRotation = spins * 360;

    const startRotation = this.currentRotation || 0;
    
    // Initialize lastSegment to current segment so no click on first frame
    const initialNormalized = (startRotation % 360 + 360) % 360;
    let lastSegment = this.getSegmentIndexFromAngle((0 - initialNormalized + 360) % 360);

    // cubic ease-in-out (fast middle, slow ends)
    const easeInOutCubic = (t) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const speedRamp = (t) => Math.pow(t, 0.75);

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      const eased = easeInOutCubic(speedRamp(progress));

      const rotation = startRotation + totalRotation * eased;

      wheelWrapper.style.transform = `rotate(${rotation}deg)`;
      
      // Check if a new segment is under the arrow and play click
      const normalizedRotation = (rotation % 360 + 360) % 360;
      const currentSegment = this.getSegmentIndexFromAngle((0 - normalizedRotation + 360) % 360);
      
      if (currentSegment !== lastSegment) {
        this.playClick();
        lastSegment = currentSegment;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.currentRotation = rotation % 360;
        this.isSpinning = false;
        
        // Determine which option was selected
        const { option, index } = this.getSelectedOption(this.currentRotation);
        this.displayResult(option, index);

        // Resume idle animation after spin completes (if not hovered/pressed)
        this.updateIdleAnimation();
      }
    };

    requestAnimationFrame(animate);
  }

  getSelectedOption(rotation) {
    const normalizedRotation = (rotation % 360 + 360) % 360;
    const angleUnderArrow = (0 - normalizedRotation + 360) % 360;
    const idx = this.getSegmentIndexFromAngle(angleUnderArrow);
    return {
      option: this.options[idx],
      index: idx
    };
  }

  getSegmentIndexFromAngle(angle) {
    if (!this.segments || !this.segments.length) return 0;
    const a = ((angle % 360) + 360) % 360;
    for (let i = 0; i < this.segments.length; i++) {
      const seg = this.segments[i];
      if (a >= seg.startAngle && a < seg.endAngle) return seg.index;
    }
    // If angle is exactly 360 (normalized to 0), fall back to last segment end wrap
    return this.segments[this.segments.length - 1].index;
  }

  displayResult(selectedOption, selectedIndex) {
    // Store the selected index for later use
    this.selectedIndex = selectedIndex;
    
    // Use the stored color from the option
    const color = selectedOption.color;
    
    // Update the text content
    this.resultText.innerText = selectedOption.text;
    
    // Apply color directly to the element
    this.resultText.style.color = color;
    
    // Update header image if element exists
    if (this.resultHeaderImage && this.headerImage) {
      this.resultHeaderImage.src = this.headerImage;
    }
    
    // Show the modal
    this.resultModal.classList.add('show');
    
    // Play celebration effects
    this.playFanfare();
    this.createConfetti();

    // Record spin and update counts UI
    this.recordSpin(selectedOption.text);
  }

  handleRemoveOption() {
    if (this.selectedIndex !== null) {
      this.options.splice(this.selectedIndex, 1);
      this.saveOptions();
      this.renderOptions();
    }
    this.closeResultModal();
  }

  closeResultModal() {
    this.resultModal.classList.remove('show');
    this.selectedIndex = null;
  }

  async createWinnerPngBlob() {
    try {
      // Canvas dimensions
      const width = 400;
      const height = 450;
      const padding = 30;
      const contentWidth = width - (padding * 2);
      const cornerRadius = 12;
      
      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      // Draw white background with rounded corners
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, cornerRadius);
      ctx.fill();
      
      let yPosition = padding;
      
      // Load and draw SVG header image
      const svgImg = new Image();
      svgImg.src = this.headerImage;
      
      await new Promise((resolve) => {
        svgImg.onload = () => {
          // Scale SVG to fit
          const imgWidth = contentWidth;
          const imgHeight = (svgImg.height / svgImg.width) * imgWidth;
          const imgX = padding + (contentWidth - imgWidth) / 2;
          ctx.drawImage(svgImg, imgX, yPosition, imgWidth, imgHeight);
          yPosition += imgHeight + 80;
          resolve();
        };
        svgImg.onerror = () => {
          // If SVG fails to load, just skip it
          resolve();
        };
      });
      
      // Draw heading with celebration emojis
      ctx.fillStyle = '#222222';
      ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("🎉 Picker Wheel Winner 🎉", width / 2, yPosition);
      yPosition += 15;
      
      // Draw decorative line under heading
      ctx.strokeStyle = '#3fb8af';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 80, yPosition);
      ctx.lineTo(width / 2 + 80, yPosition);
      ctx.stroke();
      yPosition += 45;
      
      // Draw result box background with subtle shadow effect
      const boxPadding = 20;
      const boxHeight = 70;
      const boxY = yPosition;
      
      // Draw shadow
      ctx.fillStyle = 'rgba(63, 184, 175, 0.15)';
      ctx.beginPath();
      ctx.roundRect(padding + 3, boxY + 3, contentWidth, boxHeight, 8);
      ctx.fill();
      
      // Draw main box
      ctx.fillStyle = '#e8f8f7';
      ctx.beginPath();
      ctx.roundRect(padding, boxY, contentWidth, boxHeight, 8);
      ctx.fill();
      
      // Add border to box
      ctx.strokeStyle = '#3fb8af';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(padding, boxY, contentWidth, boxHeight, 8);
      ctx.stroke();
      
      // Draw winner text (centered in box, uppercase)
      ctx.fillStyle = '#222222';
      ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const textY = boxY + (boxHeight / 2);
      
      // Wrap text if needed
      const maxWidth = contentWidth - (boxPadding * 2);
      const winnerText = this.resultText.innerText.toUpperCase();
      ctx.fillText(winnerText, width / 2, textY, maxWidth);
      
      return await new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png');
      });
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Unable to generate PNG. Please try again.');
      return null;
    }
  }

  getShareText() {
    const winnerText = this.resultText ? this.resultText.innerText : 'an amazing option';
    return `I just spun a Picker Wheel and got '${winnerText}'! Let's create your own wheel here: ${this.shareUrl}`;
  }

  getPlatformShareText(platform) {
    return this.getShareText();
  }

  showShareNotification(message) {
    // Create a temporary notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #3fb8af;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10001;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 14px;
      animation: slideDown 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideUp 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  async handleShare(platform) {
    // For social media platforms, just share the text and URL (no image blob needed)
    const socialPlatforms = ['facebook', 'x', 'whatsapp', 'instagram'];
    
    if (socialPlatforms.includes(platform)) {
      const pageUrl = encodeURIComponent(this.shareUrl);
      let shareUrl = '';
      let shareText = encodeURIComponent(this.getPlatformShareText(platform));

      switch (platform) {
        case 'facebook':
          // Copy message to clipboard for easy pasting
          const fullMessage = this.getPlatformShareText(platform);
          try {
            await navigator.clipboard.writeText(fullMessage);
            // Show a brief notification
            this.showShareNotification('Message copied! Paste it into your Facebook post.');
          } catch (err) {
            // Clipboard failed, show alert
            alert('Copy this message to share: ' + fullMessage);
          }
          // Try using quote parameter (works in some browsers/contexts)
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${shareText}`;
          break;
        case 'x':
          // For Twitter/X, the URL is already included in the text message
          shareUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
          break;
        case 'whatsapp':
          shareUrl = `https://web.whatsapp.com/send?text=${shareText}`;
          break;
        case 'instagram':
          // Instagram does not support prefilled web shares; download image and copy text for manual paste
          try {
            const blob = await this.createWinnerPngBlob();
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
              link.download = `picker-wheel-winner-${timestamp}.png`;
              link.href = url;
              link.click();
              URL.revokeObjectURL(url);
            }
          } catch (err) {}
          try {
            await navigator.clipboard.writeText(this.getPlatformShareText(platform));
            this.showShareNotification('Message copied! Paste it into your Instagram post.');
          } catch (err) {
            alert('Copy this message to share: ' + this.getPlatformShareText(platform));
          }
          shareUrl = 'https://www.instagram.com/';
          break;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'noopener');
      }
      return;
    }

    // For native/download, create the image blob
    const blob = await this.createWinnerPngBlob();
    if (!blob) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `picker-wheel-winner-${timestamp}.png`;
    const file = new File([blob], filename, { type: 'image/png' });

    // Use native share when available
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: 'Picker Wheel Winner',
          text: this.getShareText(),
          files: [file]
        });
        return;
      } catch (error) {
        // Fall back to download
      }
    }

    if (platform === 'native') {
      this.downloadModalAsPng();
      return;
    }
  }

  async downloadModalAsPng() {
    const blob = await this.createWinnerPngBlob();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    link.download = `picker-wheel-winner-${timestamp}.png`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  createSlice(cx, cy, radius, startAngle, endAngle, color) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    path.setAttribute('d', pathData);
    path.setAttribute('fill', color);
    
    group.appendChild(path);
    return group;
  }

  // Safer SVG icon creation (no innerHTML)
  createEditIconSvg() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    const p1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p1.setAttribute('d', 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z');
    const p2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p2.setAttribute('d', 'm15 5 4 4');
    svg.appendChild(p1);
    svg.appendChild(p2);
    return svg;
  }

  createTrashIconSvg() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    const p1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p1.setAttribute('d', 'M3 6h18');
    const p2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p2.setAttribute('d', 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6');
    const p3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p3.setAttribute('d', 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2');
    const l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l1.setAttribute('x1', '10');
    l1.setAttribute('x2', '10');
    l1.setAttribute('y1', '11');
    l1.setAttribute('y2', '17');
    const l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l2.setAttribute('x1', '14');
    l2.setAttribute('x2', '14');
    l2.setAttribute('y1', '11');
    l2.setAttribute('y2', '17');
    svg.appendChild(p1);
    svg.appendChild(p2);
    svg.appendChild(p3);
    svg.appendChild(l1);
    svg.appendChild(l2);
    return svg;
  }

  createSliceText(text, cx, cy, angle) {
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const rad = (angle * Math.PI) / 180;
    const x = cx + 50 * Math.cos(rad);
    const y = cy + 50 * Math.sin(rad);
    
    textElement.setAttribute('x', x);
    textElement.setAttribute('y', y);
    textElement.setAttribute('text-anchor', 'middle');
    textElement.setAttribute('dominant-baseline', 'middle');
    textElement.setAttribute('fill', 'white');
    textElement.setAttribute('font-size', '12');
    textElement.setAttribute('font-weight', 'bold');
    textElement.setAttribute('pointer-events', 'none');
    
    // Rotate text to be readable
    const rotateDegrees = angle > 180 ? angle - 180 : angle;
    textElement.setAttribute('transform', `rotate(${rotateDegrees} ${x} ${y})`);
    textElement.textContent = text;
    
    return textElement;
  }

  startEditOption(index, li, textSpan) {
    const currentValue = this.options[index].text;
    
    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'option-input-edit';
    input.value = currentValue;
    
    // Create buttons container
    const editActionsContainer = document.createElement('div');
    editActionsContainer.className = 'edit-actions';
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.textContent = 'Save';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = 'Cancel';
    
    editActionsContainer.appendChild(saveBtn);
    editActionsContainer.appendChild(cancelBtn);
    
    // Replace content with input
    li.innerHTML = '';
    li.appendChild(input);
    li.appendChild(editActionsContainer);
    input.focus();
    input.select();
    
    const saveEdit = () => {
      // For iOS Safari/WKWebView: ensure input blur to exit zoom
      try { input.blur(); } catch (e) {}
      const trimmedValue = input.value.trim();
      
      // Validation: Empty input
      if (!trimmedValue) {
        this.showFeedback('Option cannot be empty', 'error');
        this.renderOptions();
        return;
      }
      
      // Validation: Duplicate (excluding current item)
      if (trimmedValue !== currentValue && this.options.some(opt => opt.text === trimmedValue)) {
        this.showFeedback('This option already exists', 'error');
        this.renderOptions();
        return;
      }

      // Validation: Length cap
      if (trimmedValue.length > this.MAX_OPTION_LENGTH) {
        this.showFeedback(`Option cannot exceed ${this.MAX_OPTION_LENGTH} characters`, 'error');
        this.renderOptions();
        return;
      }
      
      // Update option text (keep same color)
      // Migrate counts from old text to new text
      if (trimmedValue !== currentValue) {
        const oldCount = this.spinCounts[currentValue] || 0;
        if (oldCount) {
          this.spinCounts[trimmedValue] = (this.spinCounts[trimmedValue] || 0) + oldCount;
          delete this.spinCounts[currentValue];
          this.saveCounts();
        }
      }
      this.options[index].text = trimmedValue;
      this.saveOptions();
      this.renderOptions();
    };
    
    saveBtn.addEventListener('click', saveEdit);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        saveEdit();
      }
    });
    
    cancelBtn.addEventListener('click', () => {
      try { input.blur(); } catch (e) {}
      this.renderOptions();
    });
  }

  handleDeleteOption(index) {
    this.options.splice(index, 1);
    this.saveOptions();
    this.renderOptions();
  }

  handleClearAll() {
    this.options = [];
    this.saveOptions();
    this.renderOptions();
  }

  // Persist options in localStorage
  saveOptions() {
    try {
      // Persist with normalized hex colors
      const data = JSON.stringify(
        this.options.map(o => ({ text: o.text, color: this.normalizeColor(o.color) || o.color, weight: Math.min(5, Math.max(1, parseInt(o.weight || 1, 10) || 1)) }))
      );
      localStorage.setItem('pickerWheelOptions', data);
    } catch (e) {
      // Ignore storage errors silently
    }
  }

  // Load options from localStorage if available
  loadOptions() {
    try {
      const raw = localStorage.getItem('pickerWheelOptions');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const cleaned = parsed
          .filter(o => o && typeof o.text === 'string')
          .map(o => ({
            text: o.text.trim(),
            color: this.normalizeColor(o.color) || this.getNextColor(),
            weight: Math.min(5, Math.max(1, parseInt(o.weight || 1, 10) || 1))
          }));
        if (cleaned.length) {
          this.options = cleaned;
          this.loadedFromStorage = true;
        }
      }
    } catch (e) {
      // Ignore corrupted data
    }
  }

  // Ensure each option has a unique color; reassign duplicates
  ensureUniqueColors() {
    // Respect persisted colors; only assign defaults during first-run initialization
    if (this.loadedFromStorage) return;
    const used = new Set();
    for (let i = 0; i < this.options.length; i++) {
      let color = this.normalizeColor(this.options[i].color);
      if (!color || used.has(color)) {
        const available = this.palette.find(c => !used.has(c));
        if (available) {
          color = available;
        } else {
          let attempts = 0;
          while (attempts < 360) {
            const hue = (this.colorIndex * 137.5) % 360;
            const candidate = this.hslToHex(hue, 60, 75);
            this.colorIndex++;
            attempts++;
            if (!used.has(candidate)) {
              color = candidate;
              break;
            }
          }
          if (!color) {
            color = this.palette[0];
          }
        }
        this.options[i].color = color;
      }
      used.add(color);
    }
    this.saveOptions();
  }

  // Convert any CSS color string to normalized hex #rrggbb
  normalizeColor(color) {
    if (!color) return null;
    let c = color.toString().trim().toLowerCase();
    // Hex formats
    if (c.startsWith('#')) {
      if (c.length === 4) {
        // #abc -> #aabbcc
        const r = c[1], g = c[2], b = c[3];
        return `#${r}${r}${g}${g}${b}${b}`;
      }
      if (c.length === 7) return c;
      return c; // leave as-is
    }
    // rgb/rgba
    const rgb = c.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (rgb) {
      const r = parseInt(rgb[1], 10), g = parseInt(rgb[2], 10), b = parseInt(rgb[3], 10);
      const toHex = (n) => n.toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    // hsl/hsla
    const hsl = c.match(/hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/);
    if (hsl) {
      const h = parseFloat(hsl[1]);
      const s = parseFloat(hsl[2]);
      const l = parseFloat(hsl[3]);
      return this.hslToHex(h, s, l);
    }
    // Named colors and unknown formats: use computed style to resolve
    try {
      const temp = document.createElement('span');
      temp.style.color = c;
      document.body.appendChild(temp);
      const resolved = getComputedStyle(temp).color; // rgb(...)
      temp.remove();
      const rgb2 = resolved.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
      if (rgb2) {
        const r = parseInt(rgb2[1], 10), g = parseInt(rgb2[2], 10), b = parseInt(rgb2[3], 10);
        const toHex = (n) => n.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      }
    } catch (e) {}
    return c;
  }

  // Convert HSL to hex #rrggbb
  hslToHex(h, s, l) {
    // Normalize ranges
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r1 = 0, g1 = 0, b1 = 0;
    if (h < 60) { r1 = c; g1 = x; b1 = 0; }
    else if (h < 120) { r1 = x; g1 = c; b1 = 0; }
    else if (h < 180) { r1 = 0; g1 = c; b1 = x; }
    else if (h < 240) { r1 = 0; g1 = x; b1 = c; }
    else if (h < 300) { r1 = x; g1 = 0; b1 = c; }
    else { r1 = c; g1 = 0; b1 = x; }
    const toHex = (n) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`;
  }

  showFeedback(message, type) {
    // Clear any existing timeout
    if (this.feedbackTimeout) {
      clearTimeout(this.feedbackTimeout);
    }
    
    this.feedbackMessage.textContent = message;
    this.feedbackMessage.className = `feedback-message ${type}`;
    
    // Trigger fade-in
    setTimeout(() => {
      this.feedbackMessage.classList.add('show');
    }, 10);
    
    // Auto-hide feedback after 3 seconds
    this.feedbackTimeout = setTimeout(() => {
      this.feedbackMessage.classList.remove('show');
    }, 3000);
  }

  // Counts-only persistence and UI
  loadCounts() {
    try {
      const raw = localStorage.getItem('pickerWheelSpinCounts');
      const parsed = raw ? JSON.parse(raw) : {};
      if (parsed && typeof parsed === 'object') {
        this.spinCounts = parsed;
      } else {
        this.spinCounts = {};
      }
    } catch (e) {
      this.spinCounts = {};
    }
  }

  saveCounts() {
    try {
      localStorage.setItem('pickerWheelSpinCounts', JSON.stringify(this.spinCounts));
    } catch (e) {}
  }

  recordSpin(text) {
    this.spinCounts[text] = (this.spinCounts[text] || 0) + 1;
    this.saveCounts();
    this.updateCountsUI();
  }

  updateCountsUI() {
    // Update counts displayed next to each option
    if (!this.optionsList) return;
    const items = this.optionsList.querySelectorAll('.option-item');
    items.forEach((li) => {
      const textEl = li.querySelector('.option-text');
      if (!textEl) return;
      const text = textEl.textContent;
      const count = this.spinCounts[text] || 0;
      let badge = li.querySelector('.option-count');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'option-count';
        textEl.after(badge);
      }
      badge.textContent = `× ${count}`;
    });
  }

  handleClearHistory() {
    this.spinCounts = {};
    this.saveCounts();
    this.updateCountsUI();
  }

  // Idle animation control helpers
  updateIdleAnimation() {
    if (!this.wheelIdleWrapper) return;
    // Activate idle when wheel exists, has enough options, and not spinning
    if (this.options.length >= 2 && !this.isSpinning) {
      this.wheelIdleWrapper.classList.add('idle-active');
      this.wheelIdleWrapper.classList.remove('idle-paused');
      // Clear inline transform so CSS animation controls transform cleanly
      this.wheelIdleWrapper.style.transform = '';
    } else {
      this.wheelIdleWrapper.classList.remove('idle-active');
      this.wheelIdleWrapper.classList.remove('idle-paused');
    }
    this.wheelIdleWrapper.classList.remove('idle-paused');
  }

  pauseIdle() {
    if (this.wheelIdleWrapper) {
      this.wheelIdleWrapper.classList.add('idle-paused');
      this.wheelIdleWrapper.classList.add('idle-active');
    }
  }

  // Read current rotation angle (degrees) from an element's computed transform
  getElementRotation(el) {
    try {
      if (!el) return 0;
      const style = window.getComputedStyle(el);
      const tr = style.transform || style.webkitTransform || style.mozTransform;
      if (!tr || tr === 'none') return 0;
      // matrix(a, b, c, d, tx, ty)
      const m2 = tr.match(/matrix\(([^)]+)\)/);
      if (m2) {
        const vals = m2[1].split(',').map(v => parseFloat(v));
        const a = vals[0];
        const b = vals[1];
        const angle = Math.atan2(b, a) * (180 / Math.PI);
        return ((angle % 360) + 360) % 360;
      }
      // matrix3d(...)
      const m3 = tr.match(/matrix3d\(([^)]+)\)/);
      if (m3) {
        const vals = m3[1].split(',').map(v => parseFloat(v));
        const a = vals[0]; // m11
        const b = vals[1]; // m12
        const angle = Math.atan2(b, a) * (180 / Math.PI);
        return ((angle % 360) + 360) % 360;
      }
      // rotate(XXdeg)
      const r = tr.match(/rotate\(([-\d.]+)deg\)/);
      if (r) {
        const angle = parseFloat(r[1]);
        return ((angle % 360) + 360) % 360;
      }
      return 0;
    } catch (e) {
      return 0;
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PickerWheel();
});
