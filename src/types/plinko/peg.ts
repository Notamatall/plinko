let pegId = 0;
const inactivePeg = "#FFFFFF";
const pegAura = "#15163F";
const pegAuraAnimation = "#5053F9";
const pegBlur = "#0123ffcc";
const auraRadius = 1.5;

export default class Peg {
  constructor(
    x: number,
    y: number,
    radius: number,
    particlesImage: HTMLImageElement,
    pegImage: HTMLImageElement,
  ) {
    this._id = ++pegId;
    this.colliding = false;
    this.animationProgress = 0;
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._particlesImage = particlesImage;
    this._pegImage = pegImage;
    this._auraRadius = radius * auraRadius;
    this._shadowBlurRadius = radius * 3;
  }

  addCollision() {
    if (this.colliding === false) {
      this.colliding = true;
      setTimeout(() => {
        this.colliding = false;
      }, this._animationDuration);
    }
  }

  show(ctx: CanvasRenderingContext2D) {
    if (this.colliding) {
      this.handleCollision(ctx);
    } else {
      this.drawAura(ctx);
    }
    this.drawPeg(ctx);
  }

  private drawAura(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = pegAura;
    ctx.arc(this._x, this._y, this._auraRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  private drawPeg(ctx: CanvasRenderingContext2D) {
    if (this.colliding) {
      const diameter = this.radius * 6;
      ctx.drawImage(
        this._pegImage,
        this.x - diameter / 2,
        this.y - diameter / 2,
        diameter,
        diameter,
      );
    } else {
      ctx.beginPath();
      ctx.fillStyle = inactivePeg;
      ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }

  private handleCollision(ctx: CanvasRenderingContext2D) {
    const halfDuration = this.animationInterations / 2;
    const auraScale = 0.4;

    if (this.animationProgress < this.animationInterations) {
      this.animationProgress++;

      ctx.save();

      let radius = this._radius + auraScale * this.animationProgress;
      if (this.animationProgress > halfDuration) {
        const backwardAnimationIteration = halfDuration - (this.animationProgress - halfDuration);
        radius = this._radius + auraScale * backwardAnimationIteration;
      }

      ctx.shadowBlur = radius + this._shadowBlurRadius;
      ctx.shadowColor = pegBlur;

      ctx.beginPath();
      ctx.fillStyle = pegAuraAnimation;
      ctx.arc(this._x, this._y, radius, 0, 2 * Math.PI);
      ctx.fill();

      this.drawParticles(ctx);

      ctx.restore();
    } else {
      this.animationProgress = 0;
    }
  }

  private drawParticles(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this._particlesImage,
      this._x + this._radius * 0.4,
      this._y - this._radius * 2.6,
      this._radius * 1.5,
      this._radius * 1.5,
    );
  }

  private get animationInterations() {
    return (this._animationDuration / 100) * 6;
  }
  private _animationDuration = 520;
  private _id: number;
  private _particlesImage: HTMLImageElement;
  private _pegImage: HTMLImageElement;
  private colliding: boolean;
  private animationProgress: number = 0;
  private _x: number;
  private _y: number;
  private _radius: number;
  private _auraRadius: number;
  private _shadowBlurRadius: number;

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get id() {
    return this._id;
  }

  get radius() {
    return this._radius;
  }
}
