import Entity from "./entity";

export default class Scene {
  entities = []

  constructor() {
    return this
  }

  addEntity() {
    let entity = new Entity()
    this.entities.push(entity)
  }
}