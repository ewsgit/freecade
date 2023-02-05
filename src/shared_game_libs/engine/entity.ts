export default class Entity {
  private x: number = 0
  private y: number = 0
  private width: number = 50
  private height: number = 50
  private xVelocity: number = 0
  private xVelocityMaximum: number = 0
  private yVelocity: number = 0
  private yVelocityMaximum: number = 0
  private state = {}
  protected context: CanvasRenderingContext2D
  constructor(context: CanvasRenderingContext2D) {
    this.context = context
    return this
  }

  position = {
    x: {
      set: (x: number): this => {
        this.x = x
        return this
      },
      get: (): number => {
        return this.x
      },
      changeBy: (x: number): this => {
        this.x += x
        return this
      }
    },
    y: {
      set: (y: number): this => {
        this.y = y
        return this
      },
      get: (): number => {
        return this.y
      },
      changeBy: (y: number): this => {
        this.y += y
        return this
      }
    },
  }

  size = {
    width: {
      set: (width: number): this => {
        this.width = width
        return this
      },
      get: (): number => {
        return this.width
      },
      changeBy: (width: number): this => {
        this.width += width
        return this
      }
    },
    height: {
      set: (height: number): this => {
        this.height = height
        return this
      },
      get: (): number => {
        return this.height
      },
      changeBy: (height: number): this => {
        this.height += height
        return this
      }
    },
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

  createState<T>(defaultValue: T, onChange: (value: T) => void): state<T> {
    return new state(defaultValue, onChange)
  }

  beforeRender() {
    this.x += this.xVelocity
    this.y += this.yVelocity

    this.render()
  }

  render() {
    this.context.fillStyle = "#ff0000"
    this.context.fillRect(this.x, this.y, this.width, this.height)
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