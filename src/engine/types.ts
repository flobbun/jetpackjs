import { Entity } from './public/entities';

/**
 * Contains the coordinates of an entity.
 * @property x The x coordinate of the entity.
 * @property y The y coordinate of the entity.
 */
export type Vector2D = {
  x: number;
  y: number;
};

/**
 * Contains the width and height of an entity.
 * @property width The width of the entity.
 * @property height The height of the entity.
 */
export type Dimensions2D = {
  width: number;
  height: number;
};

/**
 * Contains the entities that will be used in the game.
 */
export type Entities = Map<string, Entity>;

/**
 * Contains game data that can be accessed on any game function.
 */
export type GameContext = Map<string, any>;

/**
 * Base toolbox used to create other toolboxes.
 * @property ctx The canvas context.
 * @property canvas The canvas element.
 * @property gameContext The game context.
 */
export interface BaseToolBox {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  gameContext: GameContext;
  deltaTime?: number;
  fps?: number;
}

/**
 * Toolbox used to create entities.
 */
export type EntityToolBox = Omit<BaseToolBox, 'deltaTime'>;

/**
 * Toolbox used to update the game.
 */
export type FixedUpdateToolBox = BaseToolBox;

/**
 * Toolbox used to render the game.
 */
export type RenderToolBox = BaseToolBox;

/**
 * Toolbox used to initialize the game.
 */
export type InitToolBox = Omit<BaseToolBox, 'deltaTime'>;

/**
 * Toolbox used to update the game.
 * @property deltaTime The time elapsed since the last frame.
 */
export type UpdateToolbox = BaseToolBox;

/**
 * Toolbox used to handle input.
 * @property keys A set containing the keys currently pressed.
 */
export type HandleInputToolbox = BaseToolBox & {
  keys: Set<string>;
};

export type AnyToolBox = Partial<
  BaseToolBox & InitToolBox & RenderToolBox & UpdateToolbox & HandleInputToolbox
>;

export type GameToolBoxMethods = {
  init?: (toolbox: InitToolBox) => void;
  fixedUpdate?: (toolbox: FixedUpdateToolBox) => void;
  render?: (toolbox: RenderToolBox) => void;
  update?: (toolbox: UpdateToolbox) => void;
  handleInput?: (toolbox: HandleInputToolbox) => void;
};

/**
 * This interface is used to create a toolbox containing the game logic.
 * @property debug Whether to log debug messages.
 * @property gameContext The game context.
 * @property entities The entities that will be used in the game.
 * @property init The function used to initialize the game.
 * @property fixedUpdate The function used to update the game.
 * @property render The function used to render the game.
 * @property update The function used to update the game.
 * @property handleInput The function used to handle input.
 */
export type GameToolBox = GameToolBoxMethods & {
  debug?: boolean;
  gameContext?: GameContext;
  entities?: Entities;
  fixedTimeStep?: number;
  fpsLimit?: number;
};
