import Entity from "./entity";

export default class Scene {
  entities = []
  context: CanvasRenderingContext2D

  constructor(context: CanvasRenderingContext2D) {
    this.context = context
    return this
  }

  addEntity(entityTemplate?: Entity): Entity {
    if (entityTemplate) {
      this.entities.push(entityTemplate)
      return entityTemplate
    } else {
      let entity = new Entity(this.context)
      this.entities.push(entity)
      return entity
    }
  }
}