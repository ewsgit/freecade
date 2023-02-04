import Scene from "./scene";

export default class Engine {
  currentScene: {
    entities: {
      position
    }[]
  }
  constructor() {
    return this
  }

  createScene() {
    return new Scene()
  }
}