/**
 * ============================================================================
 * APPLE LIQUID GLASS STUDIO ENGINE (WebGL2 Physical Optics Core)
 * Recreated from: iyinchao/liquid-glass-studio
 *
 * Parameters directly modeled from Liquid Glass Studio:
 *  - Refraction: refractionFactor (0.18), dispersionGain (0.065), thickness (0.52), bgDistance (0.45)
 *  - Fresnel: fresnelIntensity (1.85), fresnelSize (0.28), fresnelHardness (3.2)
 *  - Glare: glareIntensity (1.45), glareSize (0.35), glareHardness (36.0), glareConvergence (0.85), glareOppositeSide (0.35)
 *  - Shape: superellipseExponent (4.5), blobSmoothness (0.32)
 *
 * TRANSPARENT ARCHITECTURE:
 *  - Background remains 100% clean and transparent (leaves user background untouched).
 *  - Renders only the optical liquid glass lens, refraction, dispersion, fresnel, and glare.
 * ============================================================================
 */

(function () {
  'use strict';

  class LiquidGlassStudioEngine {
    constructor() {
      this.canvas = null;
      this.gl = null;
      this.program = null;
      this.locations = {};
      this.isRunning = false;
      this.rafId = null;

      // Exact parameter structure from iyinchao/liquid-glass-studio
      this.params = {
        // Refraction Settings
        refractionFactor: 0.18,
        dispersionGain: 0.065,
        thickness: 0.52,
        bgDistance: 0.45,

        // Fresnel Settings
        fresnelIntensity: 1.85,
        fresnelSize: 0.28,
        fresnelHardness: 3.2,

        // Glare Settings
        glareIntensity: 1.45,
        glareSize: 0.35,
        glareHardness: 36.0,
        glareConvergence: 0.85,
        glareOppositeSide: 0.35,
        glareAngle: 0.0,

        // Shape & Metaball Settings
        superellipseExponent: 4.5,
        blobSmoothness: 0.32,

        // Runtime state
        intensity: 0.75, // Scaled by iOS 26 slider (0 - 100)
        theme: 0.0, // 0.0 = dark, 1.0 = light
        nightLight: 0.0,
        perfMode: false,
      };

      // Pointer / Cursor Tracking & Spring Inertia
      this.pointer = {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.4,
        targetX: window.innerWidth * 0.5,
        targetY: window.innerHeight * 0.4,
        velX: 0.0,
        velY: 0.0,
      };

      this.startTime = performance.now();
      this.lastFrameTime = performance.now();
      this.idleTimer = 0;

      // Bind methods
      this.onResize = this.onResize.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onTouchMove = this.onTouchMove.bind(this);
      this.onVisibilityChange = this.onVisibilityChange.bind(this);
      this.render = this.render.bind(this);
    }

    /**
     * Initialize WebGL2 Studio Engine
     */
    init() {
      this.canvas = document.getElementById('liquid-glass-lens-canvas');
      if (!this.canvas) return false;

      // Check current DOM theme & performance state
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      this.params.theme = isLight ? 1.0 : 0.0;
      const isPerf = document.documentElement.getAttribute('data-perf-mode') === 'true';
      this.params.perfMode = isPerf;

      // Load saved slider level if available
      const savedLevel = localStorage.getItem('bobby-portfolio-glass-level');
      if (savedLevel !== null) {
        const parsed = parseInt(savedLevel, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
          this.setIntensity(parsed);
        }
      }

      try {
        const ctxOptions = {
          alpha: true,
          depth: false,
          stencil: false,
          antialias: true,
          premultipliedAlpha: true,
          powerPreference: 'high-performance',
        };

        this.gl = this.canvas.getContext('webgl2', ctxOptions) ||
                  this.canvas.getContext('webgl', ctxOptions);

        if (!this.gl) {
          console.warn('[LiquidGlassStudio] WebGL2 not supported, falling back to CSS refraction.');
          return false;
        }

        if (!this.initShaders()) {
          return false;
        }

        this.setupGeometry();
        this.setupEvents();
        this.onResize();

        if (!this.params.perfMode) {
          this.start();
        }

        console.log('[LiquidGlassStudio] Apple Liquid Glass Studio Engine active (iyinchao parameters)');
        return true;
      } catch (err) {
        console.error('[LiquidGlassStudio] Initialization failed:', err);
        return false;
      }
    }

    /**
     * Compile GLSL Shaders with Liquid Glass Studio Physical Optics
     */
    initShaders() {
      const gl = this.gl;

      const vertexShaderSource = `#version 300 es
        in vec2 a_position;
        out vec2 v_uv;

        void main() {
          v_uv = (a_position + 1.0) * 0.5;
          v_uv.y = 1.0 - v_uv.y;
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      const fragmentShaderSource = `#version 300 es
        precision highp float;

        in vec2 v_uv;
        out vec4 fragColor;

        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform vec2 u_mouse_vel;
        uniform float u_time;
        uniform float u_intensity;

        // iyinchao/liquid-glass-studio Optical Parameters
        uniform float u_refractionFactor;
        uniform float u_dispersionGain;
        uniform float u_thickness;
        uniform float u_bgDistance;

        uniform float u_fresnelIntensity;
        uniform float u_fresnelSize;
        uniform float u_fresnelHardness;

        uniform float u_glareIntensity;
        uniform float u_glareSize;
        uniform float u_glareHardness;
        uniform float u_glareConvergence;
        uniform float u_glareOppositeSide;
        uniform float u_glareAngle;

        uniform float u_superellipseExponent;
        uniform float u_blobSmoothness;
        uniform float u_theme;
        uniform float u_nightlight;

        // Inigo Quilez Smooth Minimum Function for Viscous Fluid Merging
        float smin(float a, float b, float k) {
          float h = max(k - abs(a - b), 0.0) / k;
          return min(a, b) - h * h * k * 0.25;
        }

        // Signed Distance Function: 2D Apple Superellipse (Squircle)
        float sdSquircle(vec2 p, vec2 center, vec2 size, float r, float n) {
          vec2 q = abs(p - center) - size + vec2(r);
          float d = pow(pow(max(q.x, 0.0), n) + pow(max(q.y, 0.0), n), 1.0 / n) - r;
          return d + min(max(q.x, q.y), 0.0);
        }

        // Distance field map for interactive liquid lenses
        float mapScene(vec2 p, float t) {
          float aspect = u_resolution.x / u_resolution.y;
          vec2 pAsp = vec2(p.x * aspect, p.y);
          vec2 mAsp = vec2(u_mouse.x * aspect, u_mouse.y);
          float n = max(2.5, u_superellipseExponent);

          // Liquid Lens 1: Interactive Pointer Squircle with Viscous Inertia
          vec2 b1 = mAsp + u_mouse_vel * 0.06;
          float d1 = sdSquircle(pAsp, b1, vec2(0.24 * aspect * 0.5, 0.24), 0.18, n);

          // Liquid Lens 2: Ambient Floating Crystal Squircle (Navbar/Stage Anchor)
          vec2 b2 = vec2(
            (0.50 + sin(t * 0.35) * 0.28) * aspect,
            0.28 + cos(t * 0.42) * 0.18
          );
          float d2 = sdSquircle(pAsp, b2, vec2(0.30 * aspect * 0.5, 0.26), 0.20, n);

          // Liquid Lens 3: Secondary Floating Fluid Droplet
          vec2 b3 = vec2(
            (0.56 + cos(t * 0.30 + 1.2) * 0.32) * aspect,
            0.62 + sin(t * 0.38 + 0.8) * 0.20
          );
          float d3 = sdSquircle(pAsp, b3, vec2(0.26 * aspect * 0.5, 0.28), 0.22, n);

          // Liquid Fusion using Studio's blobSmoothness
          float d = smin(d1, d2, u_blobSmoothness);
          d = smin(d, d3, u_blobSmoothness);

          return d;
        }

        // Surface normal computation via central difference gradient (\nabla d)
        vec3 calcNormal(vec2 p, float t) {
          vec2 e = vec2(0.003, 0.0);
          float d = mapScene(p, t);
          float dx = mapScene(p + e.xy, t) - mapScene(p - e.xy, t);
          float dy = mapScene(p + e.yx, t) - mapScene(p - e.yx, t);
          return normalize(vec3(dx, dy, e.x * 2.2));
        }

        void main() {
          vec2 uv = v_uv;
          float t = u_time * 0.85;

          // 1. Evaluate Liquid Distance Field
          float dist = mapScene(uv, t);

          // Transparent outside liquid glass boundaries (PRESERVES CLEAN BACKGROUND)
          if (dist > 0.18) {
            fragColor = vec4(0.0, 0.0, 0.0, 0.0);
            return;
          }

          // 2. Surface Normal & Thickness Profile
          vec3 normal = calcNormal(uv, t);
          float depthProfile = smoothstep(0.18, -0.22, dist);

          // 3. Optical Refraction & Dispersion (iyinchao/liquid-glass-studio Snell's Law)
          float refFactor = u_refractionFactor * (0.6 + 0.7 * u_intensity);
          float dispGain = u_dispersionGain * (0.6 + 0.8 * u_intensity);
          vec2 refractOffset = normal.xy * refFactor * depthProfile;

          // 4. Fresnel Reflection (Fresnel Size, Hardness & Intensity)
          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          float NdotV = clamp(dot(normal, viewDir), 0.0, 1.0);
          float fresnel = pow(1.0 - NdotV, u_fresnelHardness) * u_fresnelIntensity * (0.5 + 0.7 * u_intensity);

          // 5. Glare & Specular Highlights (Angle, Hardness & Convergence)
          vec3 lightDir = normalize(vec3(cos(u_glareAngle), sin(u_glareAngle), u_glareConvergence));
          // Track pointer relative to position
          vec3 pointerLightDir = normalize(vec3(u_mouse - uv, 0.42));
          vec3 blendedLight = normalize(mix(lightDir, pointerLightDir, 0.75));

          vec3 halfDir = normalize(blendedLight + viewDir);
          float NdotH = max(dot(normal, halfDir), 0.0);
          float glare = pow(NdotH, u_glareHardness) * u_glareIntensity * (0.4 + 0.7 * u_intensity);

          // Secondary opposing glare
          vec3 oppLight = normalize(-blendedLight + vec3(0.0, 0.0, 0.9));
          float oppNdotH = max(dot(normal, oppLight), 0.0);
          float oppGlare = pow(oppNdotH, u_glareHardness * 0.65) * u_glareOppositeSide;

          // 6. Chamfer Bevel Rim (Fresnel Size)
          float rimBevel = smoothstep(u_fresnelSize, 0.0, abs(dist)) * pow(1.0 - NdotV, 2.0);

          // 7. Spectral Chromatic Dispersion Colors (Prismatic Edge Diffraction)
          vec3 prismEdge = vec3(
            0.5 + 0.5 * cos(dist * 28.0 + 0.0),
            0.5 + 0.5 * cos(dist * 28.0 + 2.09),
            0.5 + 0.5 * cos(dist * 28.0 + 4.18)
          );

          // Specular Crystal Tint
          vec3 specularBase = mix(vec3(1.0, 1.0, 1.0), vec3(0.72, 0.90, 1.0), 0.28);
          if (u_theme > 0.5) {
            specularBase = mix(vec3(1.0), vec3(0.85, 0.95, 1.0), 0.18);
          }

          // Composite Glass Specular Layer
          vec3 glassLayer = specularBase * (fresnel * 0.65 + glare * 0.85 + oppGlare * 0.45 + rimBevel * 0.90);
          glassLayer += prismEdge * rimBevel * dispGain * 3.8;

          // Ambient Night Light Adjustment
          if (u_nightlight > 0.01) {
            glassLayer *= vec3(1.06, 0.94, 0.78);
          }

          // Optical Liquid Glass Alpha (Crystal Clear - Never Foggy)
          float alpha = clamp((fresnel * 0.75 + glare * 0.95 + rimBevel * 0.85 + depthProfile * 0.15), 0.0, 0.82);
          if (u_theme > 0.5) {
            alpha *= 0.85;
          }

          fragColor = vec4(glassLayer, alpha);
        }
      `;

      const createShader = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error('[LiquidGlassStudio] Shader compile error:', gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vertShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
      if (!vertShader || !fragShader) return false;

      const program = gl.createProgram();
      gl.attachShader(program, vertShader);
      gl.attachShader(program, fragShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('[LiquidGlassStudio] Program link error:', gl.getProgramInfoLog(program));
        return false;
      }

      this.program = program;
      gl.useProgram(program);

      // Cache all uniform locations corresponding to iyinchao/liquid-glass-studio
      this.locations = {
        position: gl.getAttribLocation(program, 'a_position'),
        resolution: gl.getUniformLocation(program, 'u_resolution'),
        mouse: gl.getUniformLocation(program, 'u_mouse'),
        mouseVel: gl.getUniformLocation(program, 'u_mouse_vel'),
        time: gl.getUniformLocation(program, 'u_time'),
        intensity: gl.getUniformLocation(program, 'u_intensity'),

        refractionFactor: gl.getUniformLocation(program, 'u_refractionFactor'),
        dispersionGain: gl.getUniformLocation(program, 'u_dispersionGain'),
        thickness: gl.getUniformLocation(program, 'u_thickness'),
        bgDistance: gl.getUniformLocation(program, 'u_bgDistance'),

        fresnelIntensity: gl.getUniformLocation(program, 'u_fresnelIntensity'),
        fresnelSize: gl.getUniformLocation(program, 'u_fresnelSize'),
        fresnelHardness: gl.getUniformLocation(program, 'u_fresnelHardness'),

        glareIntensity: gl.getUniformLocation(program, 'u_glareIntensity'),
        glareSize: gl.getUniformLocation(program, 'u_glareSize'),
        glareHardness: gl.getUniformLocation(program, 'u_glareHardness'),
        glareConvergence: gl.getUniformLocation(program, 'u_glareConvergence'),
        glareOppositeSide: gl.getUniformLocation(program, 'u_glareOppositeSide'),
        glareAngle: gl.getUniformLocation(program, 'u_glareAngle'),

        superellipseExponent: gl.getUniformLocation(program, 'u_superellipseExponent'),
        blobSmoothness: gl.getUniformLocation(program, 'u_blobSmoothness'),
        theme: gl.getUniformLocation(program, 'u_theme'),
        nightlight: gl.getUniformLocation(program, 'u_nightlight'),
      };

      return true;
    }

    setupGeometry() {
      const gl = this.gl;
      const positions = new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      gl.enableVertexAttribArray(this.locations.position);
      gl.vertexAttribPointer(this.locations.position, 2, gl.FLOAT, false, 0, 0);
    }

    setupEvents() {
      window.addEventListener('resize', this.onResize, { passive: true });
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      window.addEventListener('touchmove', this.onTouchMove, { passive: true });
      document.addEventListener('visibilitychange', this.onVisibilityChange, { passive: true });
    }

    onResize() {
      if (!this.canvas || !this.gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      this.canvas.width = Math.round(window.innerWidth * dpr);
      this.canvas.height = Math.round(window.innerHeight * dpr);
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

      if (!this.isRunning && !this.params.perfMode) {
        this.renderOnce();
      }
    }

    onMouseMove(e) {
      this.idleTimer = 0;
      this.pointer.targetX = e.clientX;
      this.pointer.targetY = e.clientY;
      // Calculate glare angle based on mouse heading
      const dx = e.clientX - window.innerWidth * 0.5;
      const dy = e.clientY - window.innerHeight * 0.5;
      this.params.glareAngle = Math.atan2(dy, dx);
      this.wakeUp();
    }

    onTouchMove(e) {
      if (e.touches && e.touches.length > 0) {
        this.idleTimer = 0;
        this.pointer.targetX = e.touches[0].clientX;
        this.pointer.targetY = e.touches[0].clientY;
        const dx = e.touches[0].clientX - window.innerWidth * 0.5;
        const dy = e.touches[0].clientY - window.innerHeight * 0.5;
        this.params.glareAngle = Math.atan2(dy, dx);
        this.wakeUp();
      }
    }

    onVisibilityChange() {
      if (document.hidden) {
        this.stop();
      } else if (!this.params.perfMode) {
        this.wakeUp();
      }
    }

    wakeUp() {
      this.idleTimer = 0;
      if (!this.isRunning && !this.params.perfMode) {
        this.start();
      }
    }

    /**
     * Public API - Sync with iOS 26 Glass Slider
     */
    setIntensity(level) {
      const clamped = Math.max(0, Math.min(100, level));
      const factor = clamped / 75.0; // 75 is baseline 1.0

      this.params.intensity = clamped / 100.0;
      this.params.refractionFactor = 0.18 * factor;
      this.params.dispersionGain = 0.065 * factor;
      this.params.fresnelIntensity = 1.85 * Math.max(0.4, factor);
      this.params.glareIntensity = 1.45 * Math.max(0.4, factor);
      this.wakeUp();
    }

    setTheme(theme) {
      this.params.theme = theme === 'light' ? 1.0 : 0.0;
      this.wakeUp();
    }

    setNightLight(active) {
      this.params.nightLight = active ? 1.0 : 0.0;
      this.wakeUp();
    }

    setPerformanceMode(isPerf) {
      this.params.perfMode = isPerf;
      if (isPerf) {
        this.stop();
        if (this.canvas) this.canvas.style.opacity = '0.0';
      } else {
        if (this.canvas) this.canvas.style.opacity = '1.0';
        this.wakeUp();
      }
    }

    renderOnce() {
      this.draw(performance.now());
    }

    draw(now) {
      const gl = this.gl;
      if (!gl || !this.program) return;

      const deltaMs = now - this.lastFrameTime;
      this.lastFrameTime = now;
      const dt = Math.min(deltaMs / 16.67, 2.5);

      this.idleTimer += deltaMs;
      const isIdle = this.idleTimer > 800;
      const ambientTime = (now - this.startTime) * 0.0007;

      let targetX = this.pointer.targetX;
      let targetY = this.pointer.targetY;
      if (isIdle) {
        targetX += Math.sin(ambientTime) * (window.innerWidth * 0.08);
        targetY += Math.cos(ambientTime * 0.8) * (window.innerHeight * 0.06);
        this.params.glareAngle = ambientTime * 0.45;
      }

      const lerpSpeed = 1.0 - Math.pow(1.0 - 0.14, dt);
      const dx = targetX - this.pointer.x;
      const dy = targetY - this.pointer.y;
      this.pointer.velX = dx * lerpSpeed;
      this.pointer.velY = dy * lerpSpeed;
      this.pointer.x += this.pointer.velX;
      this.pointer.y += this.pointer.velY;

      const normX = this.pointer.x / window.innerWidth;
      const normY = this.pointer.y / window.innerHeight;
      const normVelX = this.pointer.velX / window.innerWidth;
      const normVelY = this.pointer.velY / window.innerHeight;

      // Transparent clear to preserve underlying background
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(this.program);

      // Upload Uniforms matching iyinchao/liquid-glass-studio
      gl.uniform2f(this.locations.resolution, this.canvas.width, this.canvas.height);
      gl.uniform2f(this.locations.mouse, normX, normY);
      gl.uniform2f(this.locations.mouseVel, normVelX, normVelY);
      gl.uniform1f(this.locations.time, (now - this.startTime) * 0.001);
      gl.uniform1f(this.locations.intensity, this.params.intensity);

      gl.uniform1f(this.locations.refractionFactor, this.params.refractionFactor);
      gl.uniform1f(this.locations.dispersionGain, this.params.dispersionGain);
      gl.uniform1f(this.locations.thickness, this.params.thickness);
      gl.uniform1f(this.locations.bgDistance, this.params.bgDistance);

      gl.uniform1f(this.locations.fresnelIntensity, this.params.fresnelIntensity);
      gl.uniform1f(this.locations.fresnelSize, this.params.fresnelSize);
      gl.uniform1f(this.locations.fresnelHardness, this.params.fresnelHardness);

      gl.uniform1f(this.locations.glareIntensity, this.params.glareIntensity);
      gl.uniform1f(this.locations.glareSize, this.params.glareSize);
      gl.uniform1f(this.locations.glareHardness, this.params.glareHardness);
      gl.uniform1f(this.locations.glareConvergence, this.params.glareConvergence);
      gl.uniform1f(this.locations.glareOppositeSide, this.params.glareOppositeSide);
      gl.uniform1f(this.locations.glareAngle, this.params.glareAngle);

      gl.uniform1f(this.locations.superellipseExponent, this.params.superellipseExponent);
      gl.uniform1f(this.locations.blobSmoothness, this.params.blobSmoothness);
      gl.uniform1f(this.locations.theme, this.params.theme);
      gl.uniform1f(this.locations.nightlight, this.params.nightLight);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    render(now) {
      if (!this.isRunning) return;
      this.draw(now);
      if (this.isRunning) {
        this.rafId = requestAnimationFrame(this.render);
      }
    }

    start() {
      if (this.isRunning || this.params.perfMode) return;
      this.isRunning = true;
      this.lastFrameTime = performance.now();
      this.rafId = requestAnimationFrame(this.render);
    }

    stop() {
      this.isRunning = false;
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    }
  }

  const engine = new LiquidGlassStudioEngine();
  window.LiquidGlassStudio = engine;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => engine.init());
  } else {
    engine.init();
  }
})();
