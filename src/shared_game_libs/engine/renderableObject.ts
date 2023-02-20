export default class RenderableObject {
  private x: number = 0
  private y: number = 0
  private width: number = 50
  private height: number = 50

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

  createState<T>(defaultValue: T, onChange: (value: T) => void): state<T> {
    return new state(defaultValue, onChange)
  }

  beforeRender() {
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
