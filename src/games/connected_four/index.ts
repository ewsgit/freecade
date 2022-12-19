import useResize from "./../../lib/useResize"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

type GAMESCENE = "mainmenu" | "game"

let current_scene: GAMESCENE = "mainmenu"

useResize(canvas, () => {renderScene()})

function renderScene() {
  switch(current_scene) {
    case "mainmenu":
      ctx.fillStyle = "#ff0000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#000000"
      ctx.fillText("Some test text", 50, 40)
      break;
  }
}
