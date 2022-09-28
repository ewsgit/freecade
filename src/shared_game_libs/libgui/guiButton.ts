import GuiElement, {GuiElementOptions} from "./guiElement";
import color from "../color";

interface GuiButtonOptions extends GuiElementOptions {
    style: {
        bgColor?: color,
        border?: {
            color: color,
            size: number
        }
    }
}

export default class GuiButton extends GuiElement {
    options: GuiButtonOptions

    constructor() {
        super();
        return this
    }

    setBgColor(color: color): this {
        this.options.style.bgColor = color
        return this
    }

    render(): this {
        return this
    }
}