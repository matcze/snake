import { width, direction, controlOne, controlTwo } from "./control.js"

const squares = document.querySelectorAll(".game-board div")
const scoreDisplayOne = document.querySelector("#score-one")
const scoreDisplayTwo = document.querySelector("#score-two")
const startBtn = document.querySelector(".start-btn")
const pauseBtn = document.querySelector(".pause-btn")
const fillSpeedOne = document.getElementById("fill-speed-one")
const fillCellOne = document.getElementById("fill-cell-one")
const fillSpeedTwo = document.getElementById("fill-speed-two")
const fillCellTwo = document.getElementById("fill-cell-two")
const recYear = document.getElementById("rec-year")

let currentIndex = 0

let pause = false
let appleIndex = 0

// Player one controls snake one - uses arrows

let currentSnakeOne = [2, 1, 0]
let scoreSnakeOne = 0
let speedSnakeOne = 0.9
let intervalTimeSnakeOne = 0
let intervalSnakeOne = 0
let speedFillOne = 0
let cellFillOne = 0

// Player two controls snake two - uses letters w,a,s,d

let currentSnakeTwo = [382, 381, 380]
let scoreSnakeTwo = 0
let speedSnakeTwo = 0.9
let intervalTimeSnakeTwo = 0
let intervalSnakeTwo = 0
let speedFillTwo = 0
let cellFillTwo = 0

function startGame() {
	currentSnakeOne.forEach(index => squares[index].classList.remove("snake"))
	currentSnakeTwo.forEach(index => squares[index].classList.remove("snake"))
	squares[appleIndex].classList.remove("apple")
	pause = false
	clearInterval(intervalSnakeOne)
	clearInterval(intervalSnakeTwo)
	scoreSnakeOne = 0
	scoreSnakeTwo = 0
	speedFillOne = 0
	fillSpeedOne.style.width = `${speedFillOne}%`
	cellFillOne = 0
	fillCellOne.style.width = `${cellFillOne}%`
	speedFillTwo = 0
	fillSpeedTwo.style.width = `${speedFillTwo}%`
	cellFillTwo = 0
	fillCellTwo.style.width = `${cellFillTwo}%`
	randomApple()
	direction.snakeOne = 1
	direction.snakeTwo = 1
	scoreDisplayOne.innerText = scoreSnakeOne
	scoreDisplayTwo.innerText = scoreSnakeTwo
	intervalTimeSnakeOne = 1000
	intervalTimeSnakeTwo = 1000
	currentSnakeOne = [2, 1, 0]
	currentSnakeTwo = [382, 381, 380]
	currentIndex = 0
	currentSnakeOne.forEach(index => squares[index].classList.add("snake"))
	currentSnakeTwo.forEach(index => squares[index].classList.add("snake"))
	intervalSnakeOne = setInterval(moveOutcomesSnakeOne, intervalTimeSnakeOne)
	intervalSnakeTwo = setInterval(moveOutcomesSnakeTwo, intervalTimeSnakeTwo)
	startBtn.textContent = "Restart"
}

function pauseGame() {
	pause = !pause
	if (pause) {
		clearInterval(intervalSnakeOne)
		clearInterval(intervalSnakeTwo)
		pauseBtn.textContent = "Resume"
	} else {
		intervalSnakeOne = setInterval(moveOutcomesSnakeOne, intervalTimeSnakeOne)
		intervalSnakeTwo = setInterval(moveOutcomesSnakeTwo, intervalTimeSnakeTwo)
		pauseBtn.textContent = "Pause"
	}
}

function moveOutcomesSnakeOne() {
	if (
		(currentSnakeOne[0] + width >= width * width &&
			direction.snakeOne === width) ||
		(currentSnakeOne[0] % width === width - 1 && direction.snakeOne === 1) ||
		(currentSnakeOne[0] % width === 0 && direction.snakeOne === -1) ||
		(currentSnakeOne[0] - width < 0 && direction.snakeOne === -width) ||
		squares[currentSnakeOne[0] + direction.snakeOne].classList.contains("snake")
	) {
		return clearInterval(intervalSnakeOne)
	}

	const tailOne = currentSnakeOne.pop()
	squares[tailOne].classList.remove("snake")
	currentSnakeOne.unshift(currentSnakeOne[0] + direction.snakeOne)

	if (squares[currentSnakeOne[0]].classList.contains("apple")) {
		squares[currentSnakeOne[0]].classList.remove("apple")
		squares[tailOne].classList.add("snake")
		currentSnakeOne.push(tailOne)
		randomApple()
		scoreSnakeOne++
		scoreDisplayOne.textContent = scoreSnakeOne
		clearInterval(intervalSnakeOne)
		intervalTimeSnakeOne = intervalTimeSnakeOne * speedSnakeOne
		intervalSnakeOne = setInterval(moveOutcomesSnakeOne, intervalTimeSnakeOne)
		speedFillOne += 4
		fillSpeedOne.style.width = `${speedFillOne}%`
		cellFillOne += 4
		fillCellOne.style.width = `${cellFillOne}%`
	}

	if (scoreSnakeOne >= 25) {
		clearInterval(intervalSnakeOne)
		clearInterval(intervalSnakeTwo)
		scoreDisplayOne.textContent = "Player one win!"
	}

	squares[currentSnakeOne[0]].classList.add("snake")
}

function moveOutcomesSnakeTwo() {
	if (
		(currentSnakeTwo[0] + width >= width * width &&
			direction.snakeTwo === width) ||
		(currentSnakeTwo[0] % width === width - 1 && direction.snakeTwo === 1) ||
		(currentSnakeTwo[0] % width === 0 && direction.snakeTwo === -1) ||
		(currentSnakeTwo[0] - width < 0 && direction.snakeTwo === -width) ||
		squares[currentSnakeTwo[0] + direction.snakeTwo].classList.contains("snake")
	) {
		return clearInterval(intervalSnakeTwo)
	}

	const tailTwo = currentSnakeTwo.pop()
	squares[tailTwo].classList.remove("snake")
	currentSnakeTwo.unshift(currentSnakeTwo[0] + direction.snakeTwo)

	if (squares[currentSnakeTwo[0]].classList.contains("apple")) {
		squares[currentSnakeTwo[0]].classList.remove("apple")
		squares[tailTwo].classList.add("snake")
		currentSnakeTwo.push(tailTwo)
		randomApple()
		scoreSnakeTwo++
		scoreDisplayTwo.textContent = scoreSnakeTwo
		clearInterval(intervalSnakeTwo)
		intervalTimeSnakeTwo = intervalTimeSnakeTwo * speedSnakeTwo
		intervalSnakeTwo = setInterval(moveOutcomesSnakeTwo, intervalTimeSnakeTwo)
		speedFillTwo += 4
		fillSpeedTwo.style.width = `${speedFillTwo}%`
		cellFillTwo += 4
		fillCellTwo.style.width = `${cellFillTwo}%`
	}

	if (scoreSnakeTwo >= 25) {
		clearInterval(intervalSnakeOne)
		clearInterval(intervalSnakeTwo)
		scoreDisplayTwo.textContent = "Player two win!"
	}

	squares[currentSnakeTwo[0]].classList.add("snake")
}

function randomApple() {
	do {
		appleIndex = Math.floor(Math.random() * squares.length)
	} while (squares[appleIndex].classList.contains("snake"))
	squares[appleIndex].classList.add("apple")
}

document.addEventListener("keyup", controlOne)
document.addEventListener("keyup", controlTwo)
startBtn.addEventListener("click", startGame)
pauseBtn.addEventListener("click", pauseGame)

const Year = new Date().getFullYear()
recYear.textContent = Year

