//Seleçãos dos objetos html para uso no js
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

//Definição cobra
const size = 30

//Criando Cobra
const snake = [
    { x: 0, y: 0 },
]

//Definição de direção da cobra
let direction, loopid = ""


//Função Desenho da cobra
const drawSnake = () => {
    ctx.fillStyle = '#ddd'
    snake.forEach((position, index) => {

        if (index == snake.length - 1) {
            ctx.fillStyle = "white"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

//Função movimento da cobra
const moveSnake = () => {
    if (!direction) return

    const headSnake = snake[snake.length - 1]

    snake.shift()

    if (direction == 'right') {
        snake.push({ x: headSnake.x + size, y: headSnake.y })
    }

    if (direction == 'left') {
        snake.push({ x: headSnake.x - size, y: headSnake.y })
    }

    if (direction == 'down') {
        snake.push({ x: headSnake.x, y: headSnake.y + size })
    }

    if (direction == 'up') {
        snake.push({ x: headSnake.x, y: headSnake.y - size })
    }

}
//Desenhando grade no jogo
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 30; i < canvas.width; i += 30) {

        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600,i)
        ctx.stroke()

    }
}
//Logica de funcionamento - game
const gameLoop = () => {
    clearInterval(loopid)

    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    moveSnake()
    drawSnake()

    loopid = setTimeout(() => {
        gameLoop()
    }, 300);

}

//gameLoop()

//Lendo eventos de teclado
document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }

})

gameLoop()