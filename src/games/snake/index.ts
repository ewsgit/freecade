import Engine from "../../shared_game_libs/engine/engine";
import Entity from "../../shared_game_libs/engine/objects/entities/entity";
import { context } from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

const engine = new Engine()

engine.enableDeveloperMode()

let mainMenu = engine.createScene()
engine.loadScene(mainMenu)

mainMenu.addEntity()

let game = engine.createScene()
engine.loadScene(game)

const SEGMENT_SIZE = engine.screen.getWidth() / 32

class SnakeSegment extends Entity {
  proceedingEntity: Entity

  constructor(proceedingEntity: Entity) {
    super(engine.context);

    this.size.width.set(SEGMENT_SIZE)
    this.size.height.set(SEGMENT_SIZE)
    this.proceedingEntity = proceedingEntity
  }

  beforeRender() {
    super.beforeRender();


  }

  render() {
    this.context.fillStyle = "green"
    this.context.fillRect(this.position.x.get(), this.position.y.get(), SEGMENT_SIZE, SEGMENT_SIZE)
  }
}

class SnakeHead extends Entity {
  direction: "right" | "left" | "up" | "down"
  constructor() {
    super(engine.context);

    this.size.width.set(SEGMENT_SIZE)
    this.size.height.set(SEGMENT_SIZE)
    this.direction = "right"
  }

  render() {
    this.context.fillStyle = "green"
    this.context.fillRect(this.position.x.get(), this.position.y.get(), SEGMENT_SIZE, SEGMENT_SIZE)
  }

  beforeRender() {
    super.beforeRender();

    switch (this.direction) {
      case "down":
        if (this.position.y.get() + this.size.height.get() >= engine.screen.getHeight()) return engine.loadScene(mainMenu)
        this.position.y.changeBy(SEGMENT_SIZE)
        break;
      case "up":
        if (this.position.y.get() + this.size.height.get() <= 0) return engine.loadScene(mainMenu)
        this.position.y.changeBy(-SEGMENT_SIZE)
        break;
      case "left":
        if (this.position.x.get() + this.size.width.get() <= 0) return engine.loadScene(mainMenu)
        this.position.x.changeBy(-SEGMENT_SIZE)
        break;
      case "right":
        if (this.position.x.get() + this.size.width.get() >= engine.screen.getWidth()) return engine.loadScene(mainMenu)
        this.position.x.changeBy(SEGMENT_SIZE)
        break;
    }
  }
}

let head = new SnakeHead()
game.addEntity(head)
game.addEntity(new SnakeSegment(head))
