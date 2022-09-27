const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d")

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    render()
})

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let player = {
    x: 0, y: 0, width: 10, height: 10,
}

let worldOffset = 0
let gapX = Math.random() * window.innerWidth - 100

function render() {
    ctx.fillStyle = "red"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    renderPlayer()
    worldOffset++
    ctx.fillRect(0, worldOffset, gapX, 10)
    ctx.fillRect(gapX + 50, worldOffset, window.innerWidth, 10)
}

function renderPlayer() {
    ctx.fillStyle = "white"
    ctx.fillRect(player.x, player.y, player.width, player.height)
}

window.addEventListener("mousemove", (e) => {
    player.x = e.clientX
    player.y = e.clientY
    render()
})
render()
