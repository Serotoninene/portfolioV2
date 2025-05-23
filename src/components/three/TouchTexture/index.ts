import { useMemo } from "react";
import { Texture } from "three";
import gsap from "gsap";

interface Point {
  x: number;
  y: number;
  age: number;
  force: number;
}

function outSine(n: number) {
  return Math.sin((n * Math.PI) / 2);
}

export default class TouchTexture {
  public texture: Texture | null;
  private canDraw: boolean;
  private size: number;
  private maxAge: number;
  private radius: number;
  private introAnim: boolean;
  private trail: Point[];
  private canvas: HTMLCanvasElement | null;
  private ctx: CanvasRenderingContext2D | null;
  private timeout: NodeJS.Timeout | null;

  constructor(
    isOnScreen = false,
    size = 128,
    maxAge = 120,
    radius = 0.2,
    introAnim = true
  ) {
    this.size = size;
    this.maxAge = maxAge;
    this.radius = radius;
    this.introAnim;
    this.trail = [];
    this.canDraw = true;

    // Initialize properties with default values
    this.canvas = null;
    this.ctx = null;
    this.texture = null;
    this.timeout = null;

    this.initTexture(isOnScreen);
    this.intro();
  }

  private initTexture(onScreen: boolean) {
    // create a 2D canvas to store the informations of the cursor
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.canvas.height = this.size;
    this.ctx = this.canvas.getContext("2d");
    // draw black background
    this.ctx ? (this.ctx.fillStyle = "black") : null;
    this.ctx && this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // use the canvas as a texture
    this.texture = new Texture(this.canvas);
    this.texture.needsUpdate = true;

    this.canvas.id = "touchTexture";
    this.canvas.style.position = "fixed";
    this.canvas.style.bottom = "0";
    this.canvas.style.zIndex = "10000";

    // No need to add it to the body,
    onScreen && document.body.appendChild(this.canvas);
  }

  private intro() {
    const value = {
      radius: 0,
    };
    const targetRadius = this.radius;
    this.radius = 0;

    gsap.to(value, {
      radius: targetRadius,
      delay: this.introAnim ? 3 : 0,
      duration: this.introAnim ? 3 : 0,
      onUpdate: () => {
        this.radius = value.radius;
      },
    });
  }

  public update(point: { x: number; y: number }) {
    this.clear();
    const normalizedPoint = { x: (point.x + 1) / 2, y: (point.y + 1) / 2 };
    this.addTouch(normalizedPoint);
    if (!this.canDraw) return false;

    // age points
    this.trail.forEach((point, i) => {
      point.age++;
      // remove old
      if (point.age > this.maxAge) {
        this.trail.splice(i, 1);
      }
    });

    // draw white points
    this.trail.forEach((point) => {
      this.drawTouch(point);
    });

    // update texture
    this.texture ? (this.texture.needsUpdate = true) : null;
  }

  private clear() {
    // clear canvas
    this.ctx ? (this.ctx.fillStyle = "black") : null;
    this.ctx?.fillRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
  }

  private addTouch(point: { x: number; y: number }) {
    let force = 0;
    const last = this.trail[this.trail.length - 1];
    if (last) {
      const dx = last.x - point.x;
      const dy = last.y - point.y;
      const dd = dx * dx + dy * dy;
      force = Math.min(dd * 10000, 1);
    }

    this.trail.push({ x: point.x, y: point.y, age: 0, force });
  }

  private drawTouch(point: Point) {
    // console.log(point);
    // draw point based on size and age
    const pos = {
      x: point.x * this.size,
      y: (1 - point.y) * this.size,
    };

    let intensity = 1;
    if (point.age < this.maxAge * 0.3) {
      intensity = outSine(point.age / (this.maxAge * 0.3));
    } else {
      intensity = outSine(
        1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7)
      );
    }

    intensity *= point.force;

    const radius = this.size * this.radius * intensity;
    const grd = this.ctx?.createRadialGradient(
      pos.x,
      pos.y,
      radius * 0.25,
      pos.x,
      pos.y,
      radius
    );
    // draw gradient white circles
    grd?.addColorStop(0, `rgba(255, 255, 255, 0.35)`);
    grd?.addColorStop(1, "rgba(0, 0, 0, 0.0)");

    this.ctx?.beginPath();
    if (this.ctx && grd) {
      this.ctx.fillStyle = grd;
    }
    this.ctx?.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    this.ctx?.fill();
    // fill canvas
  }

  private reset() {
    // reset canvas
    this.trail = [];
    this.canDraw = false;
    this.ctx?.beginPath();
    this.ctx ? (this.ctx.fillStyle = "rgba(0, 0, 0, 0.0)") : null;
    this.ctx?.fill();
    clearTimeout(this.timeout || 0);
    this.timeout = setTimeout(() => (this.canDraw = true), 0);
  }
}

export const useTouchTexture = ({
  isOnScreen = false,
  size = 128,
  maxAge = 120,
  radius = 0.2,
}) => {
  return useMemo(() => new TouchTexture(isOnScreen, size, maxAge, radius), []);
};
