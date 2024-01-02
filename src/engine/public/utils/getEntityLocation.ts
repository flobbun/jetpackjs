import { BaseToolBox, Dimensions2D, Vector2D } from '../../types';

/**
 *
 * @param entityLocation Vector2D of the entity location
 * @param entityDimensions Dimensions of the entity (width and height)
 * @param toolbox Toolbox
 * @returns Vector2D of the entity in the canvas
 */
export const getEntityLocation = (
  entityLocation: Vector2D,
  entityDimensions: Dimensions2D,
  toolbox: BaseToolBox
) => {
  const { x, y } = entityLocation;
  const { width, height } = entityDimensions;
  const { canvas } = toolbox || {};

  if (!canvas) {
    throw new Error('Canvas is not defined');
  }

  return {
    x: x - width / 2,
    y: canvas.height - y - height / 2,
  };
};
