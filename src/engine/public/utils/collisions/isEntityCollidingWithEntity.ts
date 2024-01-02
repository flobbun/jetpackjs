import { Entity } from '../../entities';

/**
 * Checks if an entity is colliding with another entity
 * @param entity The entity to check
 * @param otherEntity The entity to check against
 * @returns Whether or not the entity is colliding with the other entity
 */
export const isEntityCollidingWithEntity = (
  entity: Entity,
  otherEntity: Entity
) => {
  if (!entity.boundingBox) return false;
  if (!otherEntity.boundingBox) return false;

  const entityBoundingBox = entity.boundingBox;
  const otherEntityBoundingBox = otherEntity.boundingBox;

  const entityLeft = entityBoundingBox.location.x;
  const entityRight =
    entityBoundingBox.location.x + entityBoundingBox.dimensions.width;
  const entityTop = entityBoundingBox.location.y;
  const entityBottom =
    entityBoundingBox.location.y + entityBoundingBox.dimensions.height;

  const otherEntityLeft = otherEntityBoundingBox.location.x;
  const otherEntityRight =
    otherEntityBoundingBox.location.x + otherEntityBoundingBox.dimensions.width;
  const otherEntityTop = otherEntityBoundingBox.location.y;
  const otherEntityBottom =
    otherEntityBoundingBox.location.y +
    otherEntityBoundingBox.dimensions.height;

  if (entityLeft > otherEntityRight) return false;
  if (entityRight < otherEntityLeft) return false;
  if (entityTop > otherEntityBottom) return false;
  if (entityBottom < otherEntityTop) return false;

  return true;
};
