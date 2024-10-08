export default {
	reachableKeys,
	countPaths,
	listAcyclicPaths
};


// ****************************

var nearbyKeys = [
	[4, 6],
	[6, 8],
	[7, 9],
	[4, 8],
	[3, 9, 0],
	[],
	[1, 7, 0],
	[2, 6],
	[1, 3],
	[2, 4]
];

function reachableKeys(startingDigit) {
	return nearbyKeys[startingDigit];
}

function countPaths(startingDigit,hopCount) {
	if (hopCount == 0) return 1;
	var priorPathCounts = Array(10).fill(1);
	for (let hops = 0; hops < hopCount; hops++) {
		let pathCounts = Array(10).fill(0);
		for (let digit = 0; digit <= 9; digit++) {
			for (let n of nearbyKeys[digit]) {
				pathCounts[digit] += priorPathCounts[n];
			}
		}
		priorPathCounts = pathCounts;
	}
	return priorPathCounts[startingDigit];
}

function listAcyclicPaths(startingDigit) {
	var paths = [];
	var nextHops = nearbyKeys[startingDigit];
	for (let nextHop of nextHops) {
		let path = [startingDigit, nextHop];
		followPath(path, paths);
	}

	return paths;
}

function followPath(path, paths) {
	var nextHops = nearbyKeys[path[path.length - 1]];
	var pathFowardFound = false;

	for (let nextHop of nextHops) {
		if (!path.includes(nextHop)) {
			pathFowardFound = true;
			let nextPath = [...path, nextHop];
			followPath(nextPath, paths);
		}
	}

	if (!pathFowardFound) {
		paths.push(path);
	}
}