export class Shoots {
  constructor(matrix, matrixRow, render, harry, game, matrixUtils) {
    this.matrix = matrix;
    this.matrixRow = matrixRow;
    this.render = render;
    this.harry = harry;
    this.game = game;
    this.matrixUtils = matrixUtils;
    this.isKill = false;
    this.volanCell = null;
  }
  
  shoot() {
    this.render.clearGameField();
    this.isKill = false;

    this.changeVolanProperty('shoot');

    if (this.isKill) {
      this.render.uploadApp();
    } else {
      this.render.renderEnemyField();
    }
  }

  changeVolanProperty(state) {
    const harryCell = this.harry.positionHarry();

    for (let y = this.matrixRow - 1; y >= 0; y--) {
      if (this.matrix[y][harryCell.x].isVolan) {
        this.isKill = true;

        if (state === 'shootMine') {
          this.volanCell = this.matrix[y][harryCell.x];
          this.volanCell.isVolan = false;
        }

        if (state === 'shoot') {
          this.matrix[y][harryCell.x].isVolan = false;
          this.score = this.game.updateScore();
          this.render.renderScore(this.score);
        }

        break;
      }
    }
  }

  shootMine() {
    let aroundCells = null;
    this.isKill = false;
    this.volanCell = null;

    this.changeVolanProperty('shootMine');

    if (this.isKill) {
      this.render.clearGameField();
      aroundCells = this.matrixUtils.getAroundCells(
        this.matrix,
        this.volanCell.y,
        this.volanCell.x
      );

      aroundCells.forEach((cell) => {
        if (cell.isVolan) {
          cell.isVolan = false;
          this.score = this.game.updateScore();
          this.render.renderScore(this.score);
        }
      });

      this.render.uploadApp();
    }
  }
}
