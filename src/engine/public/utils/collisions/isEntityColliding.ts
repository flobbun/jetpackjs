import { Entity } from '../../entities';
import isEntityCollidingWithEntity from './isEntityCollidingWithEntity';

/**
 * Checks if an entity is colliding with any other entities
 * @param entity The entity to check
 * @param entities The entities to check against
 * @returns Whether or not the entity is colliding with any other entities
 */
const isEntityColliding = (entity: Entity, entities: Entity[]) => {
  if (!entity.boundingBox) return false;

  const collidingEntities = entities.filter(e => {
    return isEntityCollidingWithEntity(entity, e);
  });

  return collidingEntities.length > 0;
};

export default isEntityColliding;
