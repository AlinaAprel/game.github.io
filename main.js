import { Enemy } from "./scripts/Enemy.js";
import { Game } from "./scripts/Game.js";
import { Harry } from "./scripts/Harry.js";
import { Loader } from "./scripts/Loader.js";
import { Matrix } from "./scripts/Matrix.js";
import { Popup } from "./scripts/Popup.js";
import { Render } from "./scripts/Render.js";
import { Shoots } from "./scripts/Shoots.js";

const matrixColumn = 7;
const matrixRow = 10;
const matrixHarryColumn = 7;
const matrixHarryRow = 1;
const maxEnemyAmount = 6;
const minEnemyAmount = 2;
let delay = 4000;
let loadingWidth = 0;
let score = 0;
let isReadyToShoot = false;
let isPlaying = true;

const matrixUtils = new Matrix(maxEnemyAmount, minEnemyAmount, matrixColumn);

const matrix = matrixUtils.getMatrix(matrixColumn, matrixRow);
const matrixHarry = matrixUtils.getMatrix(matrixHarryColumn, matrixHarryRow);

const loader = new Loader(loadingWidth, isReadyToShoot);
const popup = new Popup();

const renderFieldInterval = setInterval(() => {
	render.renderEnemyField();
}, delay);

const renderBombInterval = setInterval(() => {
	render.renderBomb();
}, 1000);

const game = new Game(score, delay, isPlaying, popup, renderFieldInterval, renderBombInterval);
const enemy = new Enemy(matrix, matrixRow, matrixUtils, game);
const render = new Render(matrix, matrixRow, matrixHarry, matrixUtils, loader, enemy);
const harry = new Harry(matrixHarry, matrixHarryColumn, render);
const shoots = new Shoots(matrix, matrixRow, render, harry, game, matrixUtils);

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowLeft') {
		harry.moveHarry(event.key);
	}

	if (event.key === 'ArrowRight') {
		harry.moveHarry(event.key);
	}

	if (event.code === 'Space') {
		shoots.shoot();
	}

	if (event.code === 'Enter' && loader.getIsReadyToShoot() && game.getIsPlaying()) {
		shoots.shootMine();
		loader.resetLoadingWidth();
	}

	if (event.code === 'Enter' && !game.getIsPlaying()) {
		game.startGame();
	}
});

render.renderAll();
