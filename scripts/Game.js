export class Game {
  constructor(score, delay, isPlaying, popup, renderFieldInterval, renderBombInterval) { 
    this.score = score;
    this.delay = delay;
    this.isPlaying = isPlaying;
    this.popup = popup;
    this.renderFieldInterval = renderFieldInterval;
    this.renderBombInterval = renderBombInterval;
  }
  startGame() {
    location.reload();
  }

  gameOver() {
    this.popup.renderPopup(this.score);
    this.clearIntervals();
    this.isPlaying = false;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  updateScore() {
    this.score += 10;

    if (this.score % 200 === 0 && this.delay > 1000) {
      this.delay -= this.delay * 0.1;
    }

    return this.score;
  }

  clearIntervals() {
    clearInterval(this.renderFieldInterval);
    clearInterval(this.renderBombInterval);
  }
}
