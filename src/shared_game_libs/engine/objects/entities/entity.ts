import RenderableObject from "../../renderableObject";

export default class Entity extends RenderableObject {
  private xVelocity: number = 0
  private xVelocityMaximum: number = 0
  private yVelocity: number = 0
  private yVelocityMaximum: number = 0

  constructor(context: CanvasRenderingContext2D) {
    super(context)

    this.context = context
    return this
  }

  velocity = {
    x: {
      set: (velocity: number): this => {
        if (velocity > this.xVelocityMaximum) {
          this.xVelocity = this.xVelocityMaximum
        } else {
          this.xVelocity = velocity
        }
        return this
      },
      get: (): number => {
        return this.xVelocity
      },
      changeBy: (velocity: number): this => {
        if ((velocity + this.xVelocity) > this.xVelocityMaximum) {
          this.xVelocity = this.xVelocityMaximum
        } else if ((velocity + this.xVelocity) < this.xVelocityMaximum * -1) {
          this.xVelocity = this.xVelocityMaximum * -1
        } else {
          this.xVelocity += velocity
        }
        return this
      },
      maximum: {
        set: (maximumVelocity: number): this => {
          this.xVelocityMaximum = maximumVelocity
          return this
        },
        get: (): number => {
          return this.xVelocityMaximum
        }
      }
    },
    y: {
      set: (velocity: number): this => {
        if (velocity > this.yVelocityMaximum) {
          this.yVelocity = this.yVelocityMaximum
        } else {
          this.yVelocity = velocity
        }
        return this
      },
      get: (): number => {
        return this.yVelocity
      },
      changeBy: (velocity: number): this => {
        if ((velocity + this.yVelocity) > this.yVelocityMaximum) {
          this.yVelocity = this.yVelocityMaximum
        } else if ((velocity + this.yVelocity) < this.yVelocityMaximum * -1) {
          this.yVelocity = this.yVelocityMaximum * -1
        } else {
          this.yVelocity += velocity
        }
        return this
      },
      maximum: {
        set: (maximumVelocity: number): this => {
          this.yVelocityMaximum = maximumVelocity
          return this
        },
        get: (): number => {
          return this.yVelocityMaximum
        }
      }
    }
  }

  beforeRender() {
    this.position.x.changeBy(this.xVelocity)
    this.position.y.changeBy(this.yVelocity)

    this.render()
  }

  render() {
    this.context.fillStyle = "#ff0000"
    this.context.fillRect(this.position.x.get(), this.position.y.get(), this.size.width.get(), this.size.height.get())
  }
}

class state<T> {
  private value: T
  private readonly onChange: (newValue: T) => void
  constructor(defaultValue: T, onChange: (newValue: T) => void) {
    this.value = defaultValue
    this.onChange = onChange
    return this
  }

  set(value: T) {
    this.value = value
    this.onChange(this.value)
  }

  get(): T {
    return this.value
  }
}
