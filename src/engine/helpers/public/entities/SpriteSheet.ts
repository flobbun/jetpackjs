import { BaseToolBox, Dimensions2D, Vector2D } from '../../../types';
import { Entity } from './Entity';

export type SpriteMap = Array<Vector2D>;

export type SpriteSheetAdjustments = {
  nColumns: number;
  nRows: number;
  spriteDimensions: Dimensions2D;
  spriteMap?: SpriteMap;
  gap?: number;
};

export type SpriteSheetOptions = Pick<Entity, 'dimensions' | 'location'> & {
  spriteSheetSource: string;
  adjustments?: SpriteSheetAdjustments;
};

export class SpriteSheet {
  public toolbox: BaseToolBox;
  public dimensions: Dimensions2D;
  public location: Vector2D;
  public spriteSheetSource: string;
  public frame = 0;
  public spriteSheet: HTMLImageElement | null = null;

  private spriteMap: SpriteMap = [];
  private spriteSheetAdjustments: SpriteSheetAdjustments;

  constructor(toolbox: BaseToolBox, spriteOptions?: SpriteSheetOptions) {
    const { dimensions, location, spriteSheetSource, adjustments } =
      spriteOptions || {};
    this.toolbox = toolbox;
    this.spriteSheetAdjustments = adjustments || {
      nColumns: 0,
      nRows: 0,
      gap: 0,
      spriteDimensions: { width: 0, height: 0 },
      spriteMap: [],
    };
    this.spriteMap = this.spriteSheetAdjustments.spriteMap || [];
    this.spriteSheetSource = spriteSheetSource || '';
    this.dimensions = dimensions || { width: 0, height: 0 };
    this.location = location || { x: 0, y: 0 };

    if (this.spriteMap.length === 0) {
      this.generateSpriteMap();
    }
  }

  private generateSpriteMap() {
    const { nColumns, nRows, spriteDimensions, gap } =
      this.spriteSheetAdjustments;
    const spriteMap: SpriteMap = [];

    for (let i = 0; i < nRows; i++) {
      for (let j = 0; j < nColumns; j++) {
        const x = j * (spriteDimensions.width + (gap || 0));
        const y = i * (spriteDimensions.height + (gap || 0));

        spriteMap.push({ x, y });
      }
    }

    this.spriteMap = spriteMap;
  }

  public draw() {
    const { ctx } = this.toolbox;
    const { x, y } = this.location;
    const { width, height } = this.dimensions;

    this.spriteSheet = new Image();
    this.spriteSheet.src = this.spriteSheetSource;

    const currentState = this.spriteMap[this.frame];

    ctx.drawImage(
      this.spriteSheet,
      currentState.x,
      currentState.y,
      width,
      height,
      x,
      y,
      width,
      height
    );
  }
}
