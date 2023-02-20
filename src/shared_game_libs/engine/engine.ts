import Scene from "./scene";
import Entity from "./objects/entities/entity";

export default class Engine {
  private currentScene: Scene
  readonly context: CanvasRenderingContext2D
  protected developerMode: boolean
  private mouseX: number = 0
  private mouseY: number = 0
  private unit
  private developerModeHoveredEntity: Entity
  constructor() {
    const doc = document
    doc.body.innerHTML = `<canvas id="fc_engine_screen"></canvas>`
    doc.body.style.width = "100vw"
    doc.body.style.height = "100vh"
    doc.body.style.padding = "0"
    doc.body.style.margin = "0"
    const screen = doc.getElementById("fc_engine_screen") as HTMLCanvasElement
    screen.style.width = "100vw"
    screen.style.height = "100vh"
    screen.style.backgroundColor = "#000000"
    screen.height = window.innerHeight
    screen.width = window.innerWidth
    this.context = screen.getContext("2d")
    this.currentScene = new Scene(this.context)
    console.log("FreeCade Game Engine initialized")
    this.renderLoop()

    window.addEventListener("resize", () => {
      screen.width = window.innerWidth
      screen.height = window.innerHeight
    })

    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.x
      this.mouseY = e.y
    })

    return this
  }

  screen = {
    getWidth: (): number => {
      const screen = document.getElementById("fc_engine_screen") as HTMLCanvasElement
      return screen.width
    },
    getHeight: (): number => {
      const screen = document.getElementById("fc_engine_screen") as HTMLCanvasElement
      return screen.height
    },
    getMouseX: (): number => {
      return this.mouseX
    },
    getMouseY: (): number => {
      return this.mouseY
    }
  }

  createScene(): Scene {
    return new Scene(this.context)
  }

  loadScene(scene: Scene): this {
    this.currentScene = scene
    return this
  }

  private onRenderCallbacks = []

  onRender(callback: () => void): this {
    this.onRenderCallbacks.push(callback)
    return this
  }

  enableDeveloperMode() {
    this.developerMode = true
    return this
  }

  private renderLoop() {
    this.context.clearRect(0, 0, this.screen.getWidth(), this.screen.getHeight())
    this.onRenderCallbacks.forEach(cb => cb.bind(this)())
    this?.currentScene?.entities.forEach((entity: Entity) => {
      entity.beforeRender()
      if (this.developerMode) {
        if (entity !== this.developerModeHoveredEntity) {
          if (this.mouseX < entity.position.x.get()) return
          if (this.mouseX > entity.position.x.get() + entity.size.width.get()) return
          if (this.mouseY < entity.position.y.get()) return
          if (this.mouseY > entity.position.y.get() + entity.size.height.get()) return
        }
        this.developerModeHoveredEntity = entity
        this.context.strokeStyle = "#f00"
        this.context.lineWidth = 4
        this.context.setLineDash([6])
        this.context.strokeRect(entity.position.x.get(), entity.position.y.get(), entity.size.width.get(), entity.size.height.get())
      }
    })
    if (this.developerModeHoveredEntity) {
      let entity = this.developerModeHoveredEntity

      const fontSize = 25
      const topMargin = 5 + fontSize
      const leftMargin = 5

      this.context.fillStyle = "#f86"
      this.context.font = `${fontSize}px Jetbrains Mono`
      this.context.fillText(`x: ${entity.position.x.get()}`, leftMargin, topMargin)
      this.context.fillText(`y: ${entity.position.y.get()}`, leftMargin, topMargin + fontSize)
      this.context.fillText(`width: ${entity.size.width.get()}`, leftMargin, topMargin + (fontSize * 2))
      this.context.fillText(`height: ${entity.size.height.get()}`, leftMargin, topMargin + (fontSize * 3))
      this.context.fillText(`velocityX: ${entity.velocity.x.get()}`, leftMargin, topMargin + (fontSize * 4))
      this.context.fillText(`velocityY: ${entity.velocity.y.get()}`, leftMargin, topMargin + (fontSize * 5))
    }
    requestAnimationFrame(this.renderLoop.bind(this))
  }
}
