import { Vector2D } from '../../types';

/**
 *
 * @param point1 Vector2D of the first point
 * @param point2 Vector2D of the second point
 * @returns Distance between the two points
 */
export const getDistanceBetweenTwoPoints = (
  point1: Vector2D,
  point2: Vector2D
) => {
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;

  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
