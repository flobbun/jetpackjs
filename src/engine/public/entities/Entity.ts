import {
  BaseToolBox,
  Dimensions2D,
  FixedUpdateToolBox,
  RenderToolBox,
  UpdateToolbox,
  Vector2D,
} from '../../types';
import { BoundingBox } from './BoundingBox';
import { Sprite } from './Sprite';
import { SpriteSheet } from './SpriteSheet';

export interface Entity {
  /**
   * The id of the entity.
   */
  id: string | number;
  /**
   * The sprite of the entity.
   */
  sprite?: Sprite | undefined;
  /**
   * The sprite sheet of the entity.
   */
  spriteSheet?: SpriteSheet | undefined;
  /**
   * The bounding box of the entity.
   */
  boundingBox?: BoundingBox | undefined;
  /**
   * The toolbox of the entity.
   */
  toolbox?: BaseToolBox;
  /**
   * The layer where the entity will be rendered, a higher number means it will be rendered on top of other entities.
   */
  layer: number;
  /**
   * Whether or not the entity is visible.
   */
  visible: boolean;

  /**
   * Called when the entity is initialized.
   */
  init?(): void;
  /**
   * Called when the entity is rendered.
   */
  render?(toolbox: RenderToolBox): void;
  /**
   * Called when the entity is updated.
   */
  update?(toolbox: UpdateToolbox): void;
  /**
   * Called when the entity is fixed updated.
   */
  fixedUpdate?(toolbox: FixedUpdateToolBox): void;
}

/**
 * The base class for all entities in the game.
 */
export abstract class Entity {
  /**
   * The location of the entity.
   */
  public abstract location: Vector2D;

  /**
   * The dimensions of the entity.
   */
  public abstract dimensions: Dimensions2D;
  public visible = true;
  public depth = 0;

  constructor() {
    if (this.init) {
      this.init();
    }
  }
}
