export class Harry {
  constructor(matrixHarry, matrixHarryColumn, render) {
    this.matrixHarry = matrixHarry;
    this.matrixHarryColumn = matrixHarryColumn;
    this.render = render;
    this.harryLine = this.matrixHarry[0];
  }
  
  positionHarry() {
    let harryCell = null;

    for (let x = 0; x < this.matrixHarryColumn; x++) {
      if (this.harryLine[x].isHarry) {
        harryCell = this.harryLine[x];
      }
    }

    return harryCell;
  }

  moveHarry(key) {
    const harryCell = this.positionHarry();

    if (key === 'ArrowLeft' && harryCell.x !== 0) {
      harryCell.isHarry = false;
      this.matrixHarry[harryCell.y][harryCell.x - 1].isHarry = true;
    }

    if (key === 'ArrowRight' && harryCell.x !== 6) {
      harryCell.isHarry = false;
      this.matrixHarry[harryCell.y][harryCell.x + 1].isHarry = true;
    }

    this.render.uploadHarryField();
  }
}
