export class Render {
  constructor(matrix, matrixRow, matrixHarry, matrixUtils, loader, enemy) {
    this.matrix = matrix;
    this.matrixRow = matrixRow;
    this.matrixHarry = matrixHarry;
    this.matrixUtils = matrixUtils;
    this.loader = loader;
    this.enemy = enemy;
  }

  renderAll() {
    const app = document.querySelector('#app');
    const gameField = document.createElement('div');

    gameField.classList.add('game-field');

    this.renderMatrixCells(gameField, this.matrix, 'renderAll');

    app.append(gameField);

    this.renderUtils();
    this.renderHarryField();
  }

  uploadApp() {
    const app = document.querySelector('#app');
    let gameField = document.querySelector('.game-field')
    
    gameField = this.renderMatrixCells(gameField, this.matrix, 'uploadEnemyField');
    app.append(gameField);
  }

  renderUtils() {
    const app = document.querySelector('#app');

    const gameUtils = `
      <div class="utils">
        <div class="bomb">
          <p>bomb</p>
          <div class="loader">
            <div class="loading"></div>
          </div>
        </div>
        <div class="score">score: 0</div>
      </div>
    `;

    app.innerHTML += gameUtils;
  }

  renderEnemyField() {
    const app = document.querySelector('#app');
    let gameField = document.querySelector('.game-field');
    gameField.innerHTML = '';

    this.enemy.moveEnemy();

    gameField = this.renderMatrixCells(gameField, this.matrix, 'uploadEnemyField');
    app.append(gameField);
  }

  renderHarryField() {
    const app = document.querySelector('#app');
    const harryField = document.createElement('div');
    harryField.classList.add('harry');

    this.renderMatrixCells(harryField, this.matrixHarry, 'renderHarryField');

    app.append(harryField);
  }

  uploadHarryField() {
    const app = document.querySelector('#app');
    const harryField = document.querySelector('.harry');
    harryField.innerHTML = '';

    this.renderMatrixCells(harryField, this.matrixHarry, 'uploadHarryField');

    app.append(harryField);
  }

  renderMatrixCells(field, matrix, state) {
    if (state === 'renderAll') {
      const indexes = this.matrixUtils.getEnemyIndexes();

      indexes.forEach((index) => {
        matrix[0][index].isVolan = true;
      });
    }

    for (let y = 0; y < matrix.length; y++) {
      const rowElement = document.createElement('div');

      for (let x = 0; x < matrix[y].length; x++) {
        const cell = matrix[y][x];
        const imgElement = document.createElement('img');
        imgElement.draggable = false;
        imgElement.oncontextmenu = () => false;

        rowElement.append(imgElement);

        if (state === 'renderHarryField') {
          matrix[0][3].isHarry = true;
        }

        if (cell.isHarry) {
          imgElement.src = './assets/harry.png';
        }

        if (cell.isVolan) {
          imgElement.src = './assets/volan.png';
        }
      }

      field.append(rowElement);
    }

    if (state === 'uploadEnemyField') {
      return field;
    }
  }

  renderBomb() {
    const loading = document.querySelector('.loading');
    const bomb = document.querySelector('.bomb');

    this.loader.increaseLoadingWidth(loading, bomb);
  }

  renderScore(score) {
    const gameUtils = document.querySelector('.utils');
    const gameScore = document.querySelector('.score');

    gameScore.innerHtml = '';
    gameScore.textContent = `score: ${score}`;
    gameUtils.append(gameScore);
  }

  clearGameField() {
    let gameField = document.querySelector('.game-field');
    gameField.innerHTML = '';
  }
}
