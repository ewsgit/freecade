export default class Entity {
  private x: number = 0
  private y: number = 0
  private width: number = 0
  private height: number = 0
  constructor() {
    return this
  }

  position = {
    x: {
      set: (x: number) => {
        this.x = x
        return this
      },
      get: () => {
        return this.x
      },
      changeBy: (x: number) => {
        this.x += x
        return this
      }
    },
    y: {
      set: (y: number) => {
        this.y = y
        return this
      },
      get: () => {
        return this.y
      },
      changeBy: (x: number) => {
        this.y += y
        return this
      }
    },
  }
}