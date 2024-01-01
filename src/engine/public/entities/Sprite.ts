import { BaseToolBox, Dimensions2D, Vector2D } from '../../types';
import { Entity } from './Entity';

export type SpriteOptions = Pick<Entity, 'dimensions' | 'location'> & {
  spriteSource?: string;
};

export class Sprite {
  public toolbox: BaseToolBox;
  public dimensions: Dimensions2D;
  public location: Vector2D;
  public spriteSource: string;

  public sprite: HTMLImageElement | null = null;

  constructor(toolbox: BaseToolBox, spriteOptions?: SpriteOptions) {
    const { dimensions, location, spriteSource } = spriteOptions || {};
    this.toolbox = toolbox;
    this.spriteSource = spriteSource || '';
    this.dimensions = dimensions || { width: 0, height: 0 };
    this.location = location || { x: 0, y: 0 };
  }

  public draw() {
    const { ctx } = this.toolbox;
    const { x, y } = this.location;
    const { width, height } = this.dimensions;

    this.sprite = new Image();
    this.sprite.src = this.spriteSource;

    ctx.drawImage(this.sprite, x, y, width, height);
  }
}
