export default function useResize(canvas: HTMLCanvasElement, cb: () => void) {
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    cb()
  })
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  cb()
}
