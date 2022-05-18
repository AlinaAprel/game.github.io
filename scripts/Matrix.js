export class Matrix {
  constructor(max, min, column) {
    this.max = max;
    this.min = min;
    this.column = column;
  }
  getEnemyIndexes() {
    const array = [];
    const amount = Math.floor(Math.random() * (this.max - this.min) + this.min);

    for (let i = 0; array.length < amount; i++) {
      const index = Math.floor(Math.random() * this.column);

      if (!array.includes(index)) {
        array.push(index);
      }
    }

    return array;
  }

  getMatrix(columns, rows) {
    const matrix = [];

    for (let y = 0; y < rows; y++) {
      const row = [];
      
      for (let x = 0; x < columns; x++) {
        row.push({
          x,
          y,
          isVolan: false,
          isHarry: false,
        });
      }

      matrix.push(row);
    }

    return matrix;
  }

  getCell(matrix, y, x) {
    if (!matrix?.[y] || !matrix?.[y][x]) return false;

    return matrix[y][x];
  }

  getAroundCells(matrix, y, x) {
    const cells = [];

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (!(dx === 0 && dy === 0)) {
          const cell = this.getCell(matrix, y + dy, x + dx);

          if (cell) {
            cells.push(cell);
          }
        }
      }
    }

    return cells;
  }
}
