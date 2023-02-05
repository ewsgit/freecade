import Engine from "../../shared_game_libs/engine/engine";
import Entity from "../../shared_game_libs/engine/entity";
import { context } from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

const engine = new Engine()

engine.enableDeveloperMode()

let a = 0

let mainMenu = engine.createScene()
engine.loadScene(mainMenu)

class Ball extends Entity {
  index: number
  constructor() {
    super(engine.context);

    this.velocity.y.maximum.set(10)
    this.velocity.x.maximum.set(10)
    this.velocity.x.set(2.5)
    this.position.x.set(a * 55)
    this.position.y.set(1)
    this.index = a
    a++
  }

  beforeRender() {
    super.beforeRender()
    if (this.position.y.get() + this.size.height.get() < engine.screen.getHeight()) {
      this.velocity.y.changeBy(0.01)
    } else {
      this.position.y.set(engine.screen.getHeight() - this.size.height.get())
      this.velocity.y.set(this.velocity.y.get() * -(this.index * 0.25))
    }
    if (this.position.x.get() <= 0) {
      this.position.x.set(0)
      this.velocity.x.set(this.velocity.x.get() * -1)
    }
    if (this.position.y.get() <= 0) {
      this.position.y.set(0)
      this.velocity.y.set(this.velocity.y.get() * -1)
    }
    if (this.position.x.get() + this.size.width.get() >= engine.screen.getWidth()) {
      this.position.x.set(engine.screen.getWidth() - this.size.width.get())
      this.velocity.x.set(this.velocity.x.get() * -(this.index * 0.25))
    }
  }

  render() {
    const image = new Image()
    image.src =  "/assets/freecade.svg"

    this.context.drawImage(
        image,
        this.position.x.get(),
        this.position.y.get(),
        this.size.width.get(),
        this.size.height.get()
    )
  }
}

mainMenu.addEntity(new Ball())
mainMenu.addEntity(new Ball())
mainMenu.addEntity(new Ball())
mainMenu.addEntity(new Ball())
mainMenu.addEntity(new Ball())
mainMenu.addEntity(new Ball())
mainMenu.addEntity(new Ball())