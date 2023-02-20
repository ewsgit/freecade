import RenderableObject from "../../renderableObject";

export default class Button extends RenderableObject {
  private textContent: string = ""

  constructor(props) {
    super(props);
  }

  text = {
    get: (): string => {
      return this.textContent
    },
    set: (text: string): this => {
      this.textContent = text
      return this
    }
  }
}
