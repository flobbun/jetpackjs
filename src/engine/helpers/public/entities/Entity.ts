import { BaseToolBox, Dimensions2D, Vector2D } from '../../../types';
import { BoundingBox } from './BoundingBox';
import { Sprite } from './Sprite';
import { SpriteSheet } from './SpriteSheet';

export interface Entity {
  sprite?: Sprite | undefined;
  spriteSheet?: SpriteSheet | undefined;
  boundingBox?: BoundingBox | undefined;

  init?(): void;
  render?(): void;
  update?(deltaTime: number): void;
}

/**
 * @description
 * The base class for all entities in the game.
 *
 * Mandatory properties:
 * @param id: The id of the entity.
 * @param location: The location of the entity.
 * @param dimensions: The dimensions of the entity.
 * @param visible: Whether or not the entity is visible.
 * @param toolbox: The toolbox of the entity.
 *
 * Optional properties:
 * @param sprite: The sprite of the entity.
 * @param spriteSheet: The sprite sheet of the entity.
 * @param boundingBox: The bounding box of the entity.
 *
 * Optional methods:
 * - init: Called when the entity is initialized.
 * - render: Called when the entity is rendered.
 * - update: Called when the entity is updated.
 */
export abstract class Entity {
  public abstract id: string | number;
  public abstract location: Vector2D;
  public abstract dimensions: Dimensions2D;
  public abstract visible: boolean;
  public abstract toolbox: BaseToolBox;

  constructor() {
    if (this.init) {
      this.init();
    }
  }
}
