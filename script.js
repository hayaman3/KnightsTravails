const knightTravails = (start, end) => {
	const board = Board();
	if (
		!board.isValidCoord(start[0], start[1]) ||
		!board.isValidCoord(end[0], end[1])
	) {
		throw new Error("Invalid start/end coord");
	}

	// find path
	let queue = [start];
	while (queue.length !== 0) {
		// remove node
		// in practice: use a real queue class to dequeue in 0(1) instead 0(n) time
		const curCoord = queue.shift();

		if (curCoord[0] === end[0] && curCoord[1] === end[1]) {
			break;
		}

		const nextCoords = board.getPossiblePath(curCoord[0], curCoord[1]);
		nextCoords.forEach((coord) => {
			if (board.visited[coord[0]][coord[1]]) {
				return;
			}
			queue.push(coord);
			board.visited[coord[0]][coord[1]] = true;
			board.lastCoord[coord[0]][coord[1]] = [curCoord[0], curCoord[1]];
		});
	}

	// backtrace path
	const path = [];
	let curCoord = end;
	while (curCoord[0] !== start[0] || curCoord[1] !== start[1]) {
		path.unshift(curCoord);
		curCoord = board.lastCoord[curCoord[0]][curCoord[1]];
	}
	path.unshift(start);

	// output
	console.log(` => You made it in ${path.length} moves!  Here's your path:`);
	path.forEach((coord) => console.log(coord));
	return path;
};

const Board = (size = 8) => {
	// 2d array to
	let visited = [];
	for (let i = 0; i < size; i++) {
		let row = [];
		for (let j = 0; j < size; j++) {
			row.push(false);
		}
		visited.push(row);
	}

	let lastCoord = [];
	for (let i = 0; i < size; i++) {
		let row = [];
		for (let j = 0; j < size; j++) {
			row.push(false);
		}
		lastCoord.push(row);
	}

	const isValidCoord = (row, col) => {
		return row >= 0 && row < size && col >= 0 && col < size;
	};

	const getPossiblePath = (row, col) => {
		const directions = [
			[2, 1],
			[2, -1],
			[-2, 1],
			[-2, -1],
			[1, 2],
			[1, -2],
			[-1, 2],
			[-1, -2],
		];
		return directions
			.map((coord) => [row + coord[0], col + coord[1]])
			.filter((coord) => isValidCoord(coord[0], coord[1]));
	};

	return { visited, lastCoord, isValidCoord, getPossiblePath };
};

console.log(knightTravails([0, 0], [1, 1]));
