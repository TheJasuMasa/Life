type GraphRow = boolean[];
type Graph = GraphRow[];
type Coordinates = [number, number];

export class Generation {
	size: number;
	generationCount: number;
	current: Graph;
	next: Graph | null;

	constructor(graphSize: number) {
		this.size = graphSize;
		this.generationCount = 0;
		this.current = this.initializeGraph(graphSize);
		this.next = null;
	}

	initializeGraph(graphSize: number) {
		const graph: Graph = [];

		for (let i = 0; i < graphSize; i++) {
			graph.push(this.fillGraphRow(this.size));
		}

		return graph;
	}

	fillGraphRow(length: number) {
		const row: GraphRow = [];

		for (let i = 0; i < length; i++) {
			row.push(false);
		}

		return row;
	}

	checkStatus(neighborValueCount: number) {
		if (neighborValueCount > 2 && neighborValueCount <= 3) {
			return true;
		} else {
			return false;
		}
	}

	getNeighborValues(graph: Graph, coords: Coordinates) {
		let liveNeighbors = 0;

		if (coords[0] > 1 && coords[1] > 1) {
			//TopLeft
			if (graph[coords[0] - 1][coords[1] - 1]) {
				liveNeighbors++;
			}
		}

		if (coords[0] > 1) {
			//Top
			if (graph[coords[0] - 1][coords[1]]) {
				liveNeighbors++;
			}

			//TopRight
			if (graph[coords[0] - 1][coords[1] + 1]) {
				liveNeighbors++;
			}
		}

		if (coords[1] > 0) {
			//Left
			if (graph[coords[0]][coords[1] - 1]) {
				liveNeighbors++;
			}

			if (coords[0] < this.size - 1)
				if (graph[coords[0] + 1][coords[1] - 1]) {
					//BottomLeft
					liveNeighbors++;
				}
		}

		//Right
		if (graph[coords[0]][coords[1] + 1]) {
			liveNeighbors++;
		}

		//Bottom
		if (coords[0] < this.size - 1) {
			if (graph[coords[0] + 1][coords[1]]) {
				liveNeighbors++;
			}
		}

		//BottomRight
		if (coords[0] < this.size - 1) {
			if (graph[coords[0] + 1][coords[1] + 1]) {
				liveNeighbors++;
			}
		}

		return liveNeighbors;
	}

	setNext(graph: Graph) {
		this.next = graph;
	}

	setCurrent(graph: Graph) {
		this.current = graph;
	}

	generateNext() {
		const next: Graph = this.initializeGraph(this.size);

		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				const values = this.getNeighborValues(this.current, [i, j]);
				next[i][j] = this.checkStatus(values);
			}
		}

		this.next = next;
	}

	generateRandom() {
		const next: Graph = this.initializeGraph(this.size);

		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				const number = Math.random();
				if (number < 0.5) {
					next[i][j] = true;
				}
			}
		}
		this.current = next;
	}

	iterateGeneration() {
		this.generationCount += 1;
		this.generateNext();
		this.setCurrent(this.next!);
	}
}
