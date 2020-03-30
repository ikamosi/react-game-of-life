export function makeEmptyGrid(width, height) {
    return Array(height).fill(Array(width).fill(false));
}

export function isEmpty(data) {
    return data.find(row => row.find(cell => cell)) === undefined;
}

export function generateNext(data) {
    let nextRows = data.map(row => row.slice());
    for (var y = 0; y < data.length - 1; y++) {
        for (var x = 0; x < data[y].length - 1; x++) {
            nextRows[y][x] = generateCell(data, x, y);
        }
    }
    return nextRows;
}

function generateCell(data, x, y) {
    let count = getSurroundingCount(data, x, y);    
    if (data[y][x] && (count < 2 || count > 3)) {
        return false;
    } else if (count=== 3) {
         return true;
    }
    return data[y][x];
}

function getSurroundingCount(data, xPos, yPos) {
    let count = 0;
    for (var y = Math.max(0, yPos - 1); y <= Math.min(data.length - 1, yPos + 1); y++) {
        for (var x = Math.max(0, xPos - 1); x <= Math.min(data[y].length - 1, xPos + 1); x++) {
            if (data[y][x] && (x !== xPos || y !== yPos)) {
                count++;
            }
        }
    }
    return count;
}

