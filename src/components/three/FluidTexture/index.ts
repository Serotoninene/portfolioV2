import * as THREE from "three";

export class FluidSimulation {
  constructor(size) {
    this.size = size;
    this.density = new Float32Array(size * size);
    this.velocity = new Float32Array(size * size * 2);
    this.diffusionRate = 0.1;
    this.viscosity = 0.1;
    this.dt = 0.1;
    // Add other properties as needed

    // Create a framebuffer to render the fluid simulation
    this.fluidTexture = new THREE.WebGLRenderTarget(size, size, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    });

    // Initialize the fluid simulation state
    this.init();
  }

  init() {
    // Initialize the fluid simulation state
    for (let i = 0; i < this.size * this.size; i++) {
      this.density[i] = 0;
      this.velocity[i * 2] = 0;
      this.velocity[i * 2 + 1] = 0;
    }
  }

  update() {
    // Update the fluid simulation state based on your algorithm
    // This is where you implement the logic for fluid dynamics
    this.diffuse();
    this.advect();
    this.swapDensity();
    this.swapVelocity();
  }
  diffuse() {
    const { size, diffusionRate, dt, density } = this;
    const alpha = diffusionRate * size * size * dt;

    for (let k = 0; k < 20; k++) {
      for (let i = 1; i < size - 1; i++) {
        for (let j = 1; j < size - 1; j++) {
          density[this.index(i, j)] =
            (density[this.index(i, j)] +
              alpha *
                (density[this.index(i - 1, j)] +
                  density[this.index(i + 1, j)] +
                  density[this.index(i, j - 1)] +
                  density[this.index(i, j + 1)])) /
            (1 + 4 * alpha);
        }
      }
    }

    // Ensure boundaries are updated after diffusion
    this.setBoundaries();
  }

  advect() {
    const { size, dt, velocity, density } = this;
    const dt0 = dt * (size - 2);

    for (let i = 1; i < size - 1; i++) {
      for (let j = 1; j < size - 1; j++) {
        let x = i - dt0 * velocity[this.index(i, j) * 2];
        let y = j - dt0 * velocity[this.index(i, j) * 2 + 1];

        x = Math.min(size - 2, Math.max(1, x));
        y = Math.min(size - 2, Math.max(1, y));

        const i0 = Math.floor(x);
        const i1 = i0 + 1;
        const j0 = Math.floor(y);
        const j1 = j0 + 1;

        const s1 = x - i0;
        const s0 = 1 - s1;
        const t1 = y - j0;
        const t0 = 1 - t1;

        density[this.index(i, j)] =
          s0 *
            (t0 * density[this.index(i0, j0)] +
              t1 * density[this.index(i0, j1)]) +
          s1 *
            (t0 * density[this.index(i1, j0)] +
              t1 * density[this.index(i1, j1)]);
      }
    }

    // Ensure boundaries are updated after advection
    this.setBoundaries();
  }

  setBoundaries() {
    const { size, density, velocity } = this;

    // Set boundary velocities and densities to 0
    for (let i = 0; i < size; i++) {
      density[this.index(0, i)] = 0;
      density[this.index(size - 1, i)] = 0;
      density[this.index(i, 0)] = 0;
      density[this.index(i, size - 1)] = 0;

      velocity[this.index(0, i) * 2] = 0;
      velocity[this.index(0, i) * 2 + 1] = 0;
      velocity[this.index(size - 1, i) * 2] = 0;
      velocity[this.index(size - 1, i) * 2 + 1] = 0;
      velocity[this.index(i, 0) * 2] = 0;
      velocity[this.index(i, 0) * 2 + 1] = 0;
      velocity[this.index(i, size - 1) * 2] = 0;
      velocity[this.index(i, size - 1) * 2 + 1] = 0;
    }
  }

  swapDensity() {
    // Swap density buffers if needed
    const tempDensity = this.density;
    this.density = this.prevDensity;
    this.prevDensity = tempDensity;
  }

  swapVelocity() {
    // Swap velocity buffers if needed
    const tempVelocity = this.velocity;
    this.velocity = this.prevVelocity;
    this.prevVelocity = tempVelocity;
  }

  renderToTexture(renderer, scene, camera) {
    // Render the fluid simulation to the texture
    // Use a shader to visualize the fluid simulation on the texture
    // You may need a separate scene and camera for this rendering

    // Set the render target to the fluid texture
    renderer.setRenderTarget(this.fluidTexture);
    renderer.clear();

    // Update the texture uniform in your shader
    // Assuming you have a shader material with a texture uniform, set it here
    fluidShaderMaterial.uniforms.uFluidTexture.value =
      this.fluidTexture.texture;

    // Render the scene with the fluid shader material
    renderer.render(scene, camera);

    // Reset the render target to the default framebuffer
    renderer.setRenderTarget(null);
  }

  index(i, j) {
    // Helper function to convert 2D indices to a 1D index
    return i + this.size * j;
  }
  getTexture() {
    return this.fluidTexture.texture;
  }
}
