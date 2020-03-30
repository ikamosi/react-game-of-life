export function makeGrid(width, height) {
    let grid = [];
    for (var y = 0; y < height; y++) {
        grid.push([]);
        for (var x = 0; x < width; x++) {
            grid[y].push(false);
        }
    }
    return grid;
}

export function getCount(data, xPos, yPos) {
    let count = 0;

    for (var y = Math.max(0, yPos - 1); y <= Math.min(data.length - 1, yPos + 1); y++) {
        for (var x = Math.max(0, xPos - 1); x <= Math.min(data[y].length - 1, xPos + 1); x++) {
            if ((x !== xPos || y !== yPos) && data[y][x]) {
                count++;
            }
        }
    }
    return count;
}

export function generateNext(data) {
    let nextRows = data.map(row => row.slice());
    for (var y = 0; y < data.length - 1; y++) {
        for (var x = 0; x < data[y].length - 1; x++) {
            if (data[y][x]) {
                if (getCount(data, x, y) < 2) {
                    nextRows[y][x] = false;
                }
                if (getCount(data, x, y) > 3) {
                    nextRows[y][x] = false;
                }
            }
            else {
                if (getCount(data, x, y) === 3) {
                    nextRows[y][x] = true;
                }
            }
        }
    }
    return nextRows;
}

export function isEmpty(data) {
    return data.find(row => row.find(cell => cell)) === undefined;
}