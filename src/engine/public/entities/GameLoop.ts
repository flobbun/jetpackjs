import { BaseToolBox, GameContext, GameToolBox } from '../../types';
import debugLog from '../../private/debugLog';

/**
 * GameLoop Class
 * -
 * Constructor params
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {GameToolBox} toolBox - GameToolBox object
 */
export class GameLoop {
  frameTimeStamp = 0;
  oldFrameTimeStamp = 0;
  toolbox: GameToolBox;
  fps = 0;
  secondsPassed = 0;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  keys = new Set<string>();
  gameContext: GameContext;
  running = false;
  paused = false;
  initializedEventListeners = false;

  constructor(canvas: HTMLCanvasElement, toolBox: GameToolBox) {
    this.toolbox = toolBox;
    if (!canvas) throw new Error('Canvas is not defined');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.gameContext = toolBox.gameContext || new Map<string, any>();
  }

  initialize = () => {
    this.oldFrameTimeStamp = performance.now();

    if (this.toolbox?.init)
      this.toolbox.init({
        canvas: this.canvas,
        ctx: this.ctx,
        gameContext: this.gameContext,
      });
    if (this.toolbox?.handleInput && !this.initializedEventListeners) {
      document.addEventListener('keydown', this.onKeyDown);
      document.addEventListener('keyup', this.onKeyUp);
      this.initializedEventListeners = true;
    }

    this.running = true;
    requestAnimationFrame(this.loop);
  };

  private onKeyDown = (e: KeyboardEvent) => {
    debugLog('Key pressed: ' + e.key, this.toolbox);
    this.keys.add(e.key);
  };

  private onKeyUp = (e: KeyboardEvent) => {
    debugLog('Key released: ' + e.key, this.toolbox);
    this.keys.delete(e.key);
  };

  unpause() {
    this.paused = false;
  }

  pause() {
    this.paused = true;
  }

  end() {
    this.running = false;
  }

  loop = (timeStamp: number) => {
    if (!this.running) return;

    this.secondsPassed = (timeStamp - this.oldFrameTimeStamp) / 1000;
    this.oldFrameTimeStamp = timeStamp;
    this.fps = Math.round(1 / this.secondsPassed);

    const { update, render, fixedUpdate, handleInput } = this.toolbox;
    const baseToolbox: BaseToolBox = {
      gameContext: this.gameContext,
      canvas: this.canvas,
      ctx: this.ctx,
      deltaTime: this.secondsPassed,
      fps: this.fps,
    };

    if (!this.paused) {
      if (handleInput)
        handleInput({
          ...baseToolbox,
          keys: this.keys,
        });
      if (update) update(baseToolbox);
      if (fixedUpdate) fixedUpdate(baseToolbox);
      if (render) render(baseToolbox);
    }

    requestAnimationFrame(this.loop);
  };
}
