export let width = 20
export let direction = { snakeOne: 1, snakeTwo: 1}

export function controlOne(e) {
	switch (e.keyCode) {
        case 39:
            direction.snakeOne = 1
            break;
        case 37:
            direction.snakeOne = -1
            break;
        case 38:
            direction.snakeOne = -width
            break;
        case 40:
            direction.snakeOne = width
            break;
    }
}

export function controlTwo(e) {
	switch (e.key) {
        case "d":
            direction.snakeTwo = 1
            break;
        case "a":
            direction.snakeTwo = -1
            break;
        case "w":
            direction.snakeTwo = -width
            break;
        case "s":
            direction.snakeTwo = width
            break;
    }
}


