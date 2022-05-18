export class Enemy {
  constructor(matrix, matrixRow, matrixUtils, game) {
    this.matrix = matrix;
    this.matrixRow = matrixRow;
    this.matrixUtils = matrixUtils;
    this.game = game;
  }

  moveEnemy() {
    const arrayOfCells = [];
    const arrayOfindexes = this.matrixUtils.getEnemyIndexes();

    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        if (this.matrix[y][x].isVolan) {
          arrayOfCells.push(this.matrix[y][x]);
        }
      }
    }

    for (let i = arrayOfCells.length - 1; i >= 0; i--) {
      let y = arrayOfCells[i].y;
      let x = arrayOfCells[i].x;
      
      arrayOfCells[i].isVolan = false;

      if (arrayOfCells[i].y === this.matrixRow - 1) {
        this.game.gameOver();
      } else {
        this.matrix[y + 1][x].isVolan = true;
      }
    }

    arrayOfindexes.forEach((index) => {
      this.matrix[0][index].isVolan = true;
    });
  }
}
