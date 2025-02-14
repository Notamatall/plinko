import Peg from "./peg";
import Ball from "./ball";
import { PlinkoRows } from ".";

export default class PlinkoEngine {
  constructor(rowsCount: PlinkoRows) {
    this._rowsCount = rowsCount;
  }

  ballsArr: Ball[] = [];
  pegsArr: Peg[] = [];

  _rowsCount: PlinkoRows;

  get rowsCount() {
    return this._rowsCount;
  }

  launchEngine(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, renderFrameId: any): void {
    const fixedDelta = 1000 / 90;
    let time = 0;
    let alpha = 0;
    let elapsed = 0;
    let accumulator = 0;

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.showObjects(ctx);
      this.checkPegBallCollision();
    };

    const updateWithDelta = () => {
      if (
        ((renderFrameId.current = requestAnimationFrame(updateWithDelta)),
        (elapsed = Math.round((alpha = (time = Date.now()) - accumulator) / fixedDelta)),
        alpha > fixedDelta)
      ) {
        if (elapsed > 60 && elapsed < 300) for (let t = 0; t < elapsed; t++) update();
        else update();
        accumulator = time - (alpha % fixedDelta);
      }
    };

    updateWithDelta();
  }

  private checkPegBallCollision() {
    this.ballsArr.forEach((ball) => {
      this.pegsArr.forEach((peg) => {
        const dx = ball.x - peg.x;
        const dy = ball.y - peg.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < ball.radius + peg.radius) peg.addCollision();
      });
    });
  }

  setRowsCount(rowsCount: PlinkoRows) {
    this._rowsCount = rowsCount;
  }

  addPeg(e: Peg) {
    this.pegsArr.push(e);
  }

  addBall(e: Ball) {
    this.ballsArr.push(e);
  }

  clearPegs() {
    this.pegsArr = [];
  }

  clearBalls() {
    this.ballsArr = [];
  }

  filterBalls() {
    this.ballsArr = this.ballsArr.filter((ball) => {
      const isLastAnimationFrame = ball.isLastAnimationFrame;
      if (isLastAnimationFrame) {
        ball.onEnd();
        return false;
      }

      const isOffScreen = ball.isOffScreen();
      const isWithinXBounds = ball.isWithinXBounds();

      return !isOffScreen || (isWithinXBounds && ball.onEnd(), false);
    });
  }

  showObjects(ctx: CanvasRenderingContext2D) {
    this.filterBalls();
    this.ballsArr.forEach((ball: Ball) => ball.update(ctx));
    this.pegsArr.forEach((peg) => peg.show(ctx));
  }
}
