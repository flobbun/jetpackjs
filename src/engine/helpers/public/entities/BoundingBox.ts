import { Dimensions2D, Vector2D } from '../../../types';

interface BoundingBoxOptions {
  location: Vector2D;
  dimensions: Dimensions2D;
}

export class BoundingBox {
  location: Vector2D;
  dimensions: Dimensions2D;

  constructor(BoundingBoxOptions: BoundingBoxOptions) {
    const { location, dimensions } = BoundingBoxOptions || {};
    this.location = location;
    this.dimensions = dimensions;
  }

  getCenter() {
    return {
      x: this.location.x + this.dimensions.width / 2,
      y: this.location.y + this.dimensions.height / 2,
    };
  }

  getRadius() {
    return (
      Math.sqrt(
        Math.pow(this.dimensions.width, 2) + Math.pow(this.dimensions.height, 2)
      ) / 2
    );
  }
}
