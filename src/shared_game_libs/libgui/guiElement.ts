export interface GuiElementOptions {
    type: "text" | "button" | "image" | "box",
    style: {},
    textContent: string
}

export default class GuiElement {
    options: GuiElementOptions

    constructor() {
        return this;
    }

    render(): this {
        return this
    }
}