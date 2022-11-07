const directions = [
	[-2, -1],
	[-2, 1],
	[-1, 2],
	[1, 2],
	[2, 1],
	[2, -1],
	[1, -2],
	[-1, -2],
];

class Node {
	constructor(row, col, distanceFromStart) {
		this.row = row;
		this.col = col;
		this.distanceFromStart = distanceFromStart;
	}

	getPositionString() {
		return `${this.row}, ${this.col}`;
	}
}

const getNeighbors = (row, col) => {
	const neighbors = [];

	for (const direction of directions) {
		const [rowChange, colChange] = direction;

		const neighborRow = row + rowChange;
		const neighborCol = col + colChange;

		neighbors.push[[neighborRow, neighborCol]];
	}
	return neighbors;
};

function getShortestPath(targetRow, targetCol) {
	const queue = [];
	const startNode = new Node(0, 0, 0);

	queue.push(startNode);

	const visited = new Set();

	while (queue.length > 0) {
		// remove node
		// in practice: use a real queue class to dequeue in 0(1) instead 0(n) time
		const node = queue.shift();
		const { row, col, distanceFromStart } = node;

		console.log(row === targetRow);
		// process node
		if (row === targetRow && col === targetCol) return distanceFromStart;
		visited.add(node.getPositionString());
		console.log(visited);

		// add neighbors
		for (const neighbor of getNeighbors(row, col)) {
			const [neigborRow, neighborCol] = neighbor;
			const neigborNode = new Node(
				neigborRow,
				neighborCol,
				distanceFromStart + 1
			);

			if (visited.has(neigborNode.getPositionString())) continue;

			queue.push(neigborNode);
		}
	}
}

console.log(getShortestPath(2, 1));
