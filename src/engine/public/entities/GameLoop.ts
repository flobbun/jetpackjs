import {
  AnyToolBox,
  BaseToolBox,
  Entities,
  GameContext,
  GameToolBox,
  GameToolBoxMethods,
  HandleInputToolbox,
} from '../../types';
import debugLog from '../../private/debugLog';

export interface GameLoop {
  /**
   *  Whether the game is running.
   */
  running: boolean;
  /**
   *  Whether the game is paused.
   */
  paused: boolean;
  /**
   * The entities that will be used in the game.
   */
  entities: Entities;
  /**
   * The game context.
   */
  gameContext: GameContext;
  /**
   * A set containing the keys currently pressed.
   */
  keys: Set<string>;
  /**
   * Frames per second.
   */
  fps: number;
  /**
   * The canvas element.
   */
  canvas: HTMLCanvasElement;
  /**
   * The canvas context.
   */
  ctx: CanvasRenderingContext2D;
  /**
   * Initializes the game loop
   */
}

/**
 * GameLoop Class
 * -
 * Constructor params
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {GameToolBox} toolBox - GameToolBox object
 */
export class GameLoop {
  private oldFrameTimeStamp = 0;
  private toolbox: GameToolBox;
  private initializedEventListeners = false;
  private secondsPassed = 0;
  fps = 0;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  keys = new Set<string>();
  gameContext: GameContext;
  entities: Entities;
  running = false;
  paused = false;

  constructor(canvas: HTMLCanvasElement, toolBox: GameToolBox) {
    this.toolbox = toolBox;
    if (!canvas) throw new Error('Canvas is not defined');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.entities = toolBox.entities || new Map<string, any>();
    this.gameContext = toolBox.gameContext || new Map<string, any>();
  }

  initialize() {
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
  }

  unpause() {
    this.paused = false;
  }

  pause() {
    this.paused = true;
  }

  end() {
    this.running = false;
  }

  private onKeyDown = (e: KeyboardEvent) => {
    debugLog('Key pressed: ' + e.key, this.toolbox);
    this.keys.add(e.key);
  };

  private onKeyUp = (e: KeyboardEvent) => {
    debugLog('Key released: ' + e.key, this.toolbox);
    this.keys.delete(e.key);
  };

  private runEntitiesMethod = (
    method: keyof GameToolBoxMethods,
    toolbox: AnyToolBox
  ) => {
    for (const entity of this.entities.values()) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (entity[method]) entity[method](toolbox);
    }
  };

  private loop = (timeStamp: number) => {
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
      if (handleInput) {
        const handleInputToolbox: HandleInputToolbox = {
          ...baseToolbox,
          keys: this.keys,
        };
        handleInput(handleInputToolbox);
        this.runEntitiesMethod('handleInput', handleInputToolbox);
      }
      if (update) {
        update(baseToolbox);
        this.runEntitiesMethod('update', baseToolbox);
      }
      if (fixedUpdate) {
        fixedUpdate(baseToolbox);
        this.runEntitiesMethod('fixedUpdate', baseToolbox);
      }
      if (render) {
        render(baseToolbox);
        this.runEntitiesMethod('render', baseToolbox);
      }
    }

    requestAnimationFrame(this.loop);
  };
}
